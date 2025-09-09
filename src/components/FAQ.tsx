'use client'

import SectionHeader from './SectionHeader'
import FAQCard from './FAQCard'
import type { FAQData } from '@/lib/data/types'

interface FAQProps {
  data: FAQData
}

export default function FAQ({ data }: FAQProps) {
  return (
    <section className='bg-black py-20'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16'>
          <SectionHeader
            eyebrowText={data.eyebrowText}
            title={data.title}
            paragraphs={data.paragraphs}
            alignment="center"
            maxWidth="max-w-2xl"
          />
        </div>

        <div className='mb-12'>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {data.faqs.map((faq, index) => (
              <div key={index} className="break-inside-avoid mb-6">
                <FAQCard
                  question={faq.question}
                  answer={faq.answer}
                />
              </div>
            ))}
          </div>
        </div>

        <div className='text-center'>
          <a 
            href="https://app.usemotion.com/meet/david-de-jong/discovery"
            className='btn-base btn-outline btn-md'
          >
            Ask Something Else
          </a>
        </div>
      </div>
    </section>
  )
}
