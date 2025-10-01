import { builder } from '@/lib/builder'
import { notFound } from 'next/navigation'
import BuilderComponentClient from '@/components/BuilderComponentClient'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

// Generate static paths for all service pages
export async function generateStaticParams() {
  // Get all service pages from Builder.io
  const pages = await builder.getAll('service-pages', {
    options: { noTargeting: true },
    omit: 'data.blocks'
  })

  return pages.map((page) => {
    // Extract slug from urlPath (e.g., "/services/ux-design" -> "ux-design")
    const urlPath = page.data?.urlPath || `/services/${page.name?.toLowerCase().replace(/\s+/g, '-')}`
    const slug = urlPath.replace('/services/', '')
    
    return { slug }
  })
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params
  const page = await builder
    .get('service-pages', {
      userAttributes: { urlPath: `/services/${slug}` },
      options: { noTargeting: true }
    })
    .toPromise()

  if (!page) {
    return {
      title: 'Service Not Found',
      description: 'The requested service page could not be found.'
    }
  }

  return {
    title: page.data?.seoTitle || `${page.data?.service} - The Fold Studio`,
    description: page.data?.seoDescription || 'Professional services by The Fold Studio',
    openGraph: {
      title: page.data?.seoTitle || `${page.data?.service} - The Fold Studio`,
      description: page.data?.seoDescription || 'Professional services by The Fold Studio',
      images: page.data?.ogImage ? [{ url: page.data.ogImage }] : []
    }
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  // Get the service page content from Builder.io
  const page = await builder
    .get('service-pages', {
      userAttributes: { urlPath: `/services/${slug}` },
      options: { includeRefs: true }
    })
    .toPromise()

  // Show 404 if page not found
  if (!page) {
    notFound()
  }

  // Get the referenced service data
  let serviceData = null
  if (page.data?.service) {
    try {
      const service = await builder
        .get('services', {
          query: {
            id: page.data.service
          }
        })
        .toPromise()
      
      serviceData = service?.data
    } catch (error) {
      console.warn('Could not fetch service data:', error)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Render the Builder.io page content */}
      <BuilderComponentClient 
        model="service-pages" 
        content={page}
        context={{
          serviceData,
          slug: slug
        }}
      />
      
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs max-w-xs">
          <div>Page: {page.name}</div>
          <div>Slug: {slug}</div>
          <div>Service: {serviceData?.title || 'Not loaded'}</div>
          <div>Blocks: {page.data?.blocks?.length || 0}</div>
        </div>
      )}
    </div>
  )
}

// Enable ISR (Incremental Static Regeneration) for performance
export const revalidate = 300 // Revalidate every 5 minutes