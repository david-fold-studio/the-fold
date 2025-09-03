'use client'

import SectionHeader from './SectionHeader'
import ServiceCard from './ServiceCard'
import type { ServicesData } from '@/lib/data/types'
import { servicesData } from '@/app/(pages)/homepage/services/data'

interface ServicesProps {
  data?: ServicesData
}

export default function Services({ data = servicesData }: ServicesProps) {

  return (
    <section
      id='services'
      style={{
        backgroundColor:
          'var(--color-black-solid)',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        <div className='mb-16'>
          <SectionHeader
            eyebrowText={data.eyebrowText}
            title={data.title}
            paragraphs={data.paragraphs}
            alignment="center"
            maxWidth="max-w-[600px]"
          />
        </div>

        <div
          className='grid grid-cols-1 gap-8 md:grid-cols-2'
          style={{
            marginTop: '64px',
          }}
        >
          {data.services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              eyebrowText="View Examples"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
