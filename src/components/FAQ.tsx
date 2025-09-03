'use client'

import { useState } from 'react'
import SectionHeader from './SectionHeader'
import AccordionItem from './AccordionItem'
import type { FAQData } from '@/lib/data/types'
import { faqData } from '@/app/(pages)/homepage/faq/data'

interface FAQProps {
  data?: FAQData
}

export default function FAQ({ data = faqData }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(
      openIndex === index ? null : index
    )
  }

  return (
    <section className='bg-black py-20'>
      <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16'>
          <SectionHeader
            eyebrowText={data.eyebrowText}
            title={data.title}
            paragraphs={data.paragraphs}
            alignment="center"
            maxWidth="max-w-2xl"
          />
        </div>

        <div className='mb-12 space-y-4'>
          {data.faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>

        <div className='text-center'>
          <button className='inline-flex items-center rounded-full border border-gray-600 bg-gray-800/50 px-8 py-3 text-gray-300 transition-colors hover:bg-gray-700/50 hover:text-white'>
            Ask Something Else
          </button>
        </div>
      </div>
    </section>
  )
}
