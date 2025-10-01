import NavigationMinimal from '@/components/NavigationMinimal'
import { getPitchBySlug, getAllPitches } from '@/lib/utils/pitches'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import type { Metadata } from 'next'
import PitchPricing from '@/components/pitch/PitchPricing'
import SectionHeader from '@/components/SectionHeader'
import Hero from '@/components/Hero'
import ROICalculator from '@/components/pitch/ROICalculator'
import PitchCTA from '@/components/pitch/PitchCTA'

// Configure marked to handle relative image paths
async function processContent(content: string, slug: string): Promise<string> {
  // Replace relative image paths with absolute paths to public directory
  const processedContent = content.replace(
    /!\[([^\]]*)\]\(\.\/assets\/([^)]+)\)/g,
    `![$1](/images/pitches/${slug}/$2)`
  )

  // Configure marked with custom renderer for images and headings
  const renderer = new marked.Renderer()

  // Custom image renderer
  renderer.image = function(token) {
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

  return await marked(processedContent, {
    renderer,
    breaks: false,
    gfm: true
  })
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const pitches = await getAllPitches()
  return pitches.map((pitch) => ({
    slug: pitch.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const pitch = await getPitchBySlug(resolvedParams.slug)

  if (!pitch) {
    return {
      title: 'Pitch Not Found',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://the-fold.vercel.app'
  const pageUrl = `${siteUrl}/mdx-pitches/${pitch.meta.slug}`

  return {
    title: `${pitch.meta.title} | The Fold`,
    description: pitch.meta.excerpt,
    keywords: [
      ...pitch.meta.tags,
      'pitch',
      'web development',
      'design',
      'The Fold'
    ],
    authors: [{ name: 'The Fold' }],
    creator: 'The Fold',
    publisher: 'The Fold',

    // Open Graph
    openGraph: {
      title: pitch.meta.title,
      description: pitch.meta.excerpt,
      url: pageUrl,
      siteName: 'The Fold',
      locale: 'en_US',
      type: 'article',
      publishedTime: pitch.meta.publishedAt,
      authors: ['The Fold'],
      section: 'Pitches',
      tags: pitch.meta.tags,
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: pitch.meta.title,
      description: pitch.meta.excerpt,
      creator: '@thefoldstudio',
      site: '@thefoldstudio',
    },

    // Additional SEO
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
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
  }
}

export default async function PitchPage({ params }: PageProps) {
  const resolvedParams = await params
  const pitch = await getPitchBySlug(resolvedParams.slug)

  if (!pitch) {
    notFound()
  }

  const processedContent = await processContent(pitch.content, pitch.meta.slug)

  // Load pricing data if available for this slug
  let pricingData = null
  let pricingHeader = null
  let heroData = null
  let roiCalculators = null
  try {
    const pricingModule = await import(`../content/${pitch.meta.slug}/pricing-data`)
    pricingData = pricingModule.pricingOptions
    pricingHeader = pricingModule.pricingHeader
    heroData = pricingModule.heroData
    roiCalculators = pricingModule.roiCalculators
  } catch (e) {
    // No pricing data for this pitch
  }

  return (
    <div className="min-h-screen bg-black">
      <NavigationMinimal />

      {/* Hero Section */}
      {heroData && <Hero data={heroData} />}

      {!heroData && (
        <main className="pt-24">
          <section className="py-12">
            <div className="mx-auto max-w-[800px] px-6">
              <div className="mb-6">
                <span className="badge-text px-3 py-1.5 rounded-full border" style={{
                  background: 'var(--gradient-subtle)',
                  borderColor: 'var(--color-grey-700)'
                }}>
                  {pitch.meta.category.toUpperCase()}
                </span>
              </div>
              <h1 className="h1 mb-6">
                {pitch.meta.title}
              </h1>
            </div>
          </section>
        </main>
      )}

      <main className={heroData ? '' : 'pt-24'}>

        <div className="w-full">

          {/* Inject pricing component if pricing data exists */}
          {pricingData && (
            <section id="pricing" className="py-20">
              <div className="mx-auto max-w-[800px] px-6">
                <div className="mb-16">
                  {pricingHeader && (
                    <SectionHeader
                      eyebrowText={pricingHeader.eyebrowText}
                      title={pricingHeader.title}
                      paragraphs={pricingHeader.paragraphs}
                      alignment="center"
                    />
                  )}
                </div>
                <PitchPricing
                  options={pricingData}
                  previewImage="/images/pitches/credentialing-automation/preview.avif"
                />
              </div>
            </section>
          )}

          {/* Content Section */}
          <section className="pb-20">
            <div className="mx-auto max-w-[800px] px-6">
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </div>
          </section>

          {/* ROI Calculators */}
          {roiCalculators && roiCalculators.length > 0 && (
            <section className="pb-20">
              <div className="mx-auto max-w-[1200px] px-6">
                <ROICalculator calculators={roiCalculators} />
              </div>
            </section>
          )}

          {/* CTA Section */}
          <PitchCTA />
        </div>
      </main>
    </div>
  )
}
