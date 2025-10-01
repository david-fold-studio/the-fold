import Head from 'next/head'
import { SEOData, OpenGraphData, TwitterData, JSONLDData } from '@/lib/builder'

interface SEOHeadProps {
  title: string
  seo: SEOData
  openGraph?: OpenGraphData
  twitter?: TwitterData
  jsonLd?: JSONLDData
  children?: React.ReactNode
}

export default function SEOHead({ 
  title, 
  seo, 
  openGraph, 
  twitter, 
  jsonLd, 
  children 
}: SEOHeadProps) {
  // Generate JSON-LD structured data
  const generateJSONLD = () => {
    if (!jsonLd) return null

    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': jsonLd.type,
      name: title,
      description: seo.metaDescription,
      url: typeof window !== 'undefined' ? window.location.href : ''
    }

    // Add organization data if provided
    if (jsonLd.organization) {
      Object.assign(baseSchema, {
        publisher: {
          '@type': 'Organization',
          name: jsonLd.organization.name,
          url: jsonLd.organization.url,
          ...(jsonLd.organization.logo && { logo: jsonLd.organization.logo }),
          ...(jsonLd.organization.contactPoint && {
            contactPoint: {
              '@type': 'ContactPoint',
              ...jsonLd.organization.contactPoint
            }
          })
        }
      })
    }

    return JSON.stringify(baseSchema)
  }

  // Get fallback values for social media
  const getOGTitle = () => openGraph?.title || seo.metaTitle
  const getOGDescription = () => openGraph?.description || seo.metaDescription
  const getTwitterTitle = () => twitter?.title || getOGTitle()
  const getTwitterDescription = () => twitter?.description || getOGDescription()

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={seo.metaTitle} />
      <meta name="description" content={seo.metaDescription} />
      
      {/* Keywords */}
      {seo.keywords.length > 0 && (
        <meta 
          name="keywords" 
          content={seo.keywords.map(k => k.keyword).join(', ')} 
        />
      )}
      
      {/* Robots */}
      <meta name="robots" content={seo.robots} />
      
      {/* Canonical URL */}
      {seo.canonicalUrl && (
        <link rel="canonical" href={seo.canonicalUrl} />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={openGraph?.type || 'website'} />
      <meta property="og:title" content={getOGTitle()} />
      <meta property="og:description" content={getOGDescription()} />
      {typeof window !== 'undefined' && (
        <meta property="og:url" content={window.location.href} />
      )}
      {openGraph?.image && (
        <>
          <meta property="og:image" content={openGraph.image} />
          {openGraph.imageAlt && (
            <meta property="og:image:alt" content={openGraph.imageAlt} />
          )}
        </>
      )}
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitter?.card || 'summary_large_image'} />
      {twitter?.site && (
        <meta property="twitter:site" content={twitter.site} />
      )}
      {twitter?.creator && (
        <meta property="twitter:creator" content={twitter.creator} />
      )}
      <meta property="twitter:title" content={getTwitterTitle()} />
      <meta property="twitter:description" content={getTwitterDescription()} />
      {(twitter?.image || openGraph?.image) && (
        <meta property="twitter:image" content={twitter?.image || openGraph?.image} />
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#000000" />
      
      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateJSONLD() || ''
          }}
        />
      )}
      
      {/* Additional Schemas */}
      {jsonLd?.additionalSchemas?.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema.schema }}
        />
      ))}
      
      {/* Additional custom head elements */}
      {children}
    </Head>
  )
}

// Higher-order component to wrap pages with SEO
export function withSEO<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  defaultSEO?: Partial<SEOHeadProps>
) {
  return function SEOWrappedComponent(props: P & { seoData?: Partial<SEOHeadProps> }) {
    const { seoData, ...componentProps } = props
    
    const seoProps = {
      ...defaultSEO,
      ...seoData
    }
    
    return (
      <>
        {seoProps.title && seoProps.seo && (
          <SEOHead {...seoProps as SEOHeadProps} />
        )}
        <WrappedComponent {...componentProps as P} />
      </>
    )
  }
}