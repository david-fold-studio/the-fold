import Navigation from '@/components/Navigation'
import { getCaseStudyBySlug, getAllCaseStudies, getRelatedCaseStudies } from '@/lib/utils/case-studies'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const studies = await getAllCaseStudies()
  return studies.map((study) => ({
    slug: study.slug,
  }))
}

export default async function CaseStudyPage({ params }: PageProps) {
  const resolvedParams = await params
  const study = await getCaseStudyBySlug(resolvedParams.slug)
  
  if (!study) {
    notFound()
  }

  const relatedStudies = await getRelatedCaseStudies(resolvedParams.slug, 2)

  return (
    <div className="min-h-screen bg-black">
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
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(study.content) }}
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