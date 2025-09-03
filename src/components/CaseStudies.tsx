'use client'

import SectionHeader from './SectionHeader'
import ContentCard from './ContentCard'
import { Button } from './ui/button'
import type { CaseStudiesData } from '@/lib/data/types'
import { caseStudiesData } from '@/app/(pages)/homepage/case-studies/data'

interface CaseStudiesProps {
  data?: CaseStudiesData
}

export default function CaseStudies({ data = caseStudiesData }: CaseStudiesProps) {
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
            eyebrowText={data.eyebrowText}
            title={data.title}
            paragraphs={data.paragraphs}
            alignment="center"
            maxWidth="max-w-[664px]"
          />
        </div>

        <div
          className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-2'
          style={{
            maxWidth: '880px',
            margin: '0 auto 48px auto',
          }}
        >
          {data.studies.map((study, index) => (
            <ContentCard
              key={index}
              title={study.title}
              description={study.description}
              image={study.image}
              alt={study.alt}
              buttonText="Read Case Study"
              buttonVariant="outline"
              buttonSize="md"
              href={study.link}
            />
          ))}
        </div>

        <div className='text-center invisible'>
          <Button variant='outline' size='sm'>
            Show More Case Studies
          </Button>
        </div>
      </div>
    </section>
  )
}
