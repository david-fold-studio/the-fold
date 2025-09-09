import Navigation from '@/components/Navigation'
import { getCaseStudyBySlug, getAllCaseStudies, getRelatedCaseStudies } from '@/lib/utils/case-studies'
import { notFound } from 'next/navigation'
import { marked } from 'marked'

// Configure marked to handle relative image paths
async function processContent(content: string, slug: string): Promise<string> {
  // Replace relative image paths with absolute paths to public directory
  const processedContent = content.replace(
    /!\[([^\]]*)\]\(\.\/assets\/([^)]+)\)/g,
    `![$1](/images/case-studies/${slug}/$2)`
  )
  
  // Configure marked with custom renderer for images and headings
  const renderer = new marked.Renderer()
  
  // Custom image renderer
  renderer.image = function(token) {
    // Modern marked.js passes a token object, not separate parameters
    const imageUrl = token.href
    const imageTitle = token.title
    const imageText = token.text
    
    return `
      <figure class="article-image">
        <img src="${imageUrl}" alt="${imageText || ''}" title="${imageTitle || ''}" />
        ${imageText ? `<figcaption>${imageText}</figcaption>` : ''}
      </figure>
    `
  }
  
  // Custom heading renderers to apply design system classes
  renderer.heading = function(token) {
    const level = token.depth
    const text = token.text
    const className = level <= 3 ? `h${level}` : ''
    
    return `<h${level} class="${className}">${text}</h${level}>`
  }
  
  return await marked(processedContent, { renderer })
}
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const studies = await getAllCaseStudies()
  return studies.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const study = await getCaseStudyBySlug(resolvedParams.slug)
  
  if (!study) {
    return {
      title: 'Case Study Not Found',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://the-fold.vercel.app'
  const pageUrl = `${siteUrl}/case-studies/${study.meta.slug}`
  const imageUrl = study.meta.image.startsWith('/') 
    ? `${siteUrl}${study.meta.image}` 
    : study.meta.image

  return {
    title: `${study.meta.title} - Case Study | The Fold`,
    description: study.meta.excerpt,
    keywords: [
      ...study.meta.tags,
      ...study.meta.services,
      'case study',
      'web development',
      'design',
      'The Fold'
    ],
    authors: [{ name: 'The Fold' }],
    creator: 'The Fold',
    publisher: 'The Fold',
    
    // Open Graph
    openGraph: {
      title: study.meta.title,
      description: study.meta.excerpt,
      url: pageUrl,
      siteName: 'The Fold',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 450,
          alt: study.meta.title,
        }
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: study.meta.publishedAt,
      authors: ['The Fold'],
      section: 'Case Studies',
      tags: study.meta.tags,
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: study.meta.title,
      description: study.meta.excerpt,
      images: [imageUrl],
      creator: '@thefoldstudio',
      site: '@thefoldstudio',
    },
    
    // Additional SEO
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Canonical URL
    alternates: {
      canonical: pageUrl,
    },
    
    // Schema.org structured data
    other: {
      'article:author': 'The Fold',
      'article:published_time': study.meta.publishedAt,
      'article:section': study.meta.category,
      'article:tag': study.meta.tags.join(', '),
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const resolvedParams = await params
  const study = await getCaseStudyBySlug(resolvedParams.slug)
  
  if (!study) {
    notFound()
  }

  const relatedStudies = await getRelatedCaseStudies(resolvedParams.slug, 2)
  const processedContent = await processContent(study.content, study.meta.slug)

  // JSON-LD structured data for SEO
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://the-fold.vercel.app'
  const pageUrl = `${siteUrl}/case-studies/${study.meta.slug}`
  const imageUrl = study.meta.image.startsWith('/') 
    ? `${siteUrl}${study.meta.image}` 
    : study.meta.image

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.meta.title,
    description: study.meta.excerpt,
    image: imageUrl,
    author: {
      '@type': 'Organization',
      name: 'The Fold',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Fold',
      url: siteUrl,
    },
    datePublished: study.meta.publishedAt,
    dateModified: study.meta.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    articleSection: study.meta.category,
    keywords: study.meta.tags.join(', '),
    about: {
      '@type': 'Thing',
      name: study.meta.client,
    },
    mentions: study.meta.services.map(service => ({
      '@type': 'Service',
      name: service,
    })),
  }

  return (
    <div className="min-h-screen bg-black">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      
      <Navigation />
      
      <main className="pt-24">
        {/* Header Section */}
        <section className="py-12">
          <div className="mx-auto max-w-[800px] px-6">
            {/* Back Link */}
            <Link 
              href="/case-studies"
              className="inline-flex items-center gap-2 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" style={{ color: 'var(--color-grey-400)' }} />
              <span className="body-md transition-colors group-hover:text-white" style={{ color: 'var(--color-grey-400)' }}>
                Back to Case Studies
              </span>
            </Link>

            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-6">
              <span className="badge-text px-3 py-1.5 rounded-full border" style={{
                background: 'var(--gradient-subtle)',
                borderColor: 'var(--color-grey-700)'
              }}>
                {study.meta.category.toUpperCase()}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" style={{ color: 'var(--color-grey-400)' }} />
                <span className="body-xs" style={{ color: 'var(--color-grey-400)' }}>
                  {new Date(study.meta.publishedAt).getFullYear()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" style={{ color: 'var(--color-grey-400)' }} />
                <span className="body-xs" style={{ color: 'var(--color-grey-400)' }}>
                  {study.meta.readTime}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="h1 mb-6">
              {study.meta.title}
            </h1>

            {/* Client & Services */}
            <div className="grid md:grid-cols-2 gap-8 mb-12 p-6 rounded-xl border" style={{
              background: 'var(--gradient-subtle)',
              borderColor: 'var(--color-grey-800)'
            }}>
              <div>
                <h3 className="h3 mb-2">Client</h3>
                <p className="body-md">{study.meta.client}</p>
              </div>
              <div>
                <h3 className="h3 mb-2">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {study.meta.services.map((service) => (
                    <span key={service} className="badge-text px-2 py-1 rounded-md" style={{
                      backgroundColor: 'var(--color-grey-850)',
                      color: 'var(--color-grey-200)'
                    }}>
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="pb-20">
          <div className="mx-auto max-w-[800px] px-6">
            <div 
              className="prose prose-invert max-w-none article-body"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          </div>
        </section>

        {/* Related Case Studies */}
        {relatedStudies.length > 0 && (
          <section className="py-20 border-t" style={{ borderColor: 'var(--color-grey-800)' }}>
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center mb-12">
                <h2 className="h2 mb-4">Related Case Studies</h2>
                <p className="body-md">Explore more of our work</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {relatedStudies.map((relatedStudy) => (
                  <Link 
                    key={relatedStudy.slug} 
                    href={`/case-studies/${relatedStudy.slug}`}
                    className="group block"
                  >
                    <article className="rounded-2xl p-6 border transition-all duration-300 hover:border-[var(--color-grey-600)]" style={{
                      background: 'var(--gradient-subtle)',
                      borderColor: 'var(--color-grey-800)'
                    }}>
                      <div className="relative mb-4 rounded-xl overflow-hidden aspect-video" style={{
                        backgroundColor: 'var(--color-grey-800)'
                      }}>
                        <Image
                          src={relatedStudy.image}
                          alt={relatedStudy.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="space-y-3">
                        <h3 className="h3 group-hover:text-white transition-colors">
                          {relatedStudy.title}
                        </h3>
                        <p className="body-md line-clamp-2">
                          {relatedStudy.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="badge-text" style={{ color: 'var(--color-grey-400)' }}>
                            {relatedStudy.category.toUpperCase()}
                          </span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: 'var(--color-grey-400)' }} />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}