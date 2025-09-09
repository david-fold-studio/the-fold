import Navigation from '@/components/Navigation'
import { getAllCaseStudies } from '@/lib/utils/case-studies'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies - The Fold | Web Development & Design Portfolio',
  description: 'Explore our latest web development and design case studies. See how The Fold has helped clients achieve their digital goals with modern React applications, mobile apps, and e-commerce platforms.',
  keywords: [
    'case studies',
    'web development portfolio',
    'design portfolio', 
    'React development',
    'Next.js projects',
    'mobile app development',
    'e-commerce development',
    'UI/UX design',
    'The Fold'
  ],
  openGraph: {
    title: 'Case Studies - The Fold Portfolio',
    description: 'Explore our latest web development and design case studies showcasing modern React applications, mobile apps, and e-commerce platforms.',
    type: 'website',
    url: '/case-studies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies - The Fold Portfolio',
    description: 'Explore our latest web development and design case studies.',
  },
}

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies()

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main className="pt-24">
        {/* Header Section */}
        <section className="py-20">
          <div className="mx-auto max-w-[800px] px-6 text-center">
            <div className="mb-6">
              <span className="badge-text rounded-full px-3 py-1.5 border" style={{
                background: 'var(--gradient-subtle)',
                borderColor: 'var(--color-grey-700)'
              }}>
                CASE STUDIES
              </span>
            </div>
            
            <h1 className="h1 mb-6">
              Our Work in Action
            </h1>
            
            <p className="body-md">
              Explore our latest projects and see how we've helped businesses transform their digital presence with cutting-edge solutions.
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <Link 
                  key={study.slug} 
                  href={`/case-studies/${study.slug}`}
                  className="group block"
                >
                  <article className="rounded-2xl p-6 border transition-all duration-300 hover:border-[var(--color-grey-600)]" style={{
                    background: 'var(--gradient-subtle)',
                    borderColor: 'var(--color-grey-800)'
                  }}>
                    {/* Image */}
                    <div className="relative mb-6 rounded-xl overflow-hidden aspect-video" style={{
                      backgroundColor: 'var(--color-grey-800)'
                    }}>
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      {/* Category & Featured Badge */}
                      <div className="flex items-center gap-2">
                        <span className="badge-text px-2 py-1 rounded-md" style={{
                          backgroundColor: 'var(--color-grey-850)',
                          color: 'var(--color-grey-200)'
                        }}>
                          {study.category.toUpperCase()}
                        </span>
                        {study.featured && (
                          <span className="badge-text px-2 py-1 rounded-md" style={{
                            backgroundColor: 'var(--color-azure-37)',
                            color: 'white'
                          }}>
                            FEATURED
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="h3 group-hover:text-white transition-colors">
                        {study.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="body-md line-clamp-3">
                        {study.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between pt-4 border-t" style={{
                        borderColor: 'var(--color-grey-800)'
                      }}>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" style={{ color: 'var(--color-grey-400)' }} />
                            <span className="body-xs" style={{ color: 'var(--color-grey-400)' }}>
                              {new Date(study.publishedAt).getFullYear()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" style={{ color: 'var(--color-grey-400)' }} />
                            <span className="body-xs" style={{ color: 'var(--color-grey-400)' }}>
                              {study.readTime}
                            </span>
                          </div>
                        </div>
                        
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: 'var(--color-grey-400)' }} />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}