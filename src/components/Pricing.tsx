'use client'

import SectionHeader from './SectionHeader'
import { Button } from './ui/button'

const ctaData = {
  eyebrowText: "Get Started",
  title: "Ready to Build Something Amazing?",
  paragraphs: [
    "Let's discuss your project and see how we can bring your vision to life.",
    "Everything starts with a quick intro call."
  ]
}

export default function Pricing() {
  return (
    <section
      id='pricing'
      style={{
        backgroundColor: 'var(--color-black-solid)',
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
            eyebrowText={ctaData.eyebrowText}
            title={ctaData.title}
            paragraphs={ctaData.paragraphs}
            alignment="center"
            maxWidth="max-w-[600px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="md" className="min-w-[160px]">
            Schedule a Call
          </Button>
          <Button variant="outline" size="md" className="min-w-[160px]">
            View Our Work
          </Button>
        </div>
      </div>
    </section>
  )
}
