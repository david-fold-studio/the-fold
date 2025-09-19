'use client'

import { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import ContentCard from './ContentCard'
import { Button } from './ui/button'
import { builder } from '@/lib/builder'
import type { CaseStudiesData } from '@/lib/data/types'


interface CaseStudy {
  id: string
  title: string
  slug: string
  excerpt: string
  image: string
  thumbnailFocal: string
}

interface CaseStudiesProps {
  data?: CaseStudiesData
  eyebrowText?: string
  title?: string
  paragraphs?: string[]
  limit?: number
  excludeSlug?: string // Add option to exclude current case study
}

export default function CaseStudies({ 
  data,
  eyebrowText,
  title, 
  paragraphs,
  limit = 4,
  excludeSlug
}: CaseStudiesProps) {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCaseStudies() {
      if (typeof window === 'undefined' || (typeof navigator !== 'undefined' && !navigator.onLine)) {
        setLoading(false)
        return
      }

      try {
        // Fetch case studies from Builder.io (guarded)
        const studies = await builder.getAll('case-studies', {
          limit: 100
        })

        if (studies && studies.length > 0) {
          const transformedStudies: CaseStudy[] = studies
            .filter(study => study.published === 'published')
            .filter(study => !excludeSlug || (study.data?.urlSlug !== excludeSlug && study.data?.slug !== excludeSlug))
            .map(study => ({
              id: study.id || study.data?.urlSlug || '',
              title: study.data?.title || study.name || '',
              slug: study.data?.urlSlug || study.data?.slug || '',
              excerpt: study.data?.description || study.data?.excerpt || '',
              image: study.data?.thumbnail || study.data?.cover || '',
              thumbnailFocal: study.data?.thumbnailFocal || 'center',
            }))
            .slice(0, limit)

          setCaseStudies(transformedStudies)
        }
      } catch (error) {
        console.error('Error loading case studies:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCaseStudies()
  }, [limit, excludeSlug])

  // Use individual props if provided, fall back to data object, then defaults
  const finalEyebrowText = eyebrowText || data?.eyebrowText || "Work"
  const finalTitle = title || data?.title || "Actual Case Studies"
  const finalParagraphs = paragraphs || data?.paragraphs || [
    "Don't take our word for it, see it for yourself.",
    "Here are some of the biggest projects we delivered this year."
  ]
  return (
    <section
      id='showreel'
      className='py-20'
      style={{
        backgroundColor:
          'var(--color-black-solid)',
      }}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16'>
          <SectionHeader
            eyebrowText={finalEyebrowText}
            title={finalTitle}
            paragraphs={finalParagraphs}
            alignment="center"
            maxWidth="max-w-[664px]"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <div
            className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-2'
            style={{
              maxWidth: '880px',
              margin: '0 auto 48px auto',
            }}
          >
            {caseStudies.map((study) => (
              <ContentCard
                key={study.id}
                title={study.title}
                description={study.excerpt}
                image={study.image}
                imageFocal={study.thumbnailFocal}
                alt={study.title}
                buttonText="Read Case Study"
                buttonVariant="outline"
                buttonSize="md"
                href={`/case-studies/${study.slug}`}
                internalLink={true}
              />
            ))}
          </div>
        )}

        <div className='text-center invisible'>
          <Button variant='outline' size='sm'>
            Show More Case Studies
          </Button>
        </div>
      </div>
    </section>
  )
}
