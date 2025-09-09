'use client'

import SectionHeader from './SectionHeader'
import TestimonialCard from './TestimonialCard'
import type { TestimonialsData } from '@/lib/data/types'
import { testimonialsData } from '@/app/(pages)/homepage/testimonials/data'

interface TestimonialsProps {
  data?: TestimonialsData
}

export default function Testimonials({ data = testimonialsData }: TestimonialsProps) {
  return (
    <section
      id='testimonials'
      className='bg-black py-20'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16'>
          <SectionHeader
            eyebrowText={data.eyebrowText}
            title={data.title}
            paragraphs={data.paragraphs}
            alignment="center"
            maxWidth="max-w-[600px]"
          />
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {data.testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              title={testimonial.title}
              quote={testimonial.quote}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
