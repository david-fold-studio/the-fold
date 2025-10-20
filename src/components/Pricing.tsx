'use client'

import SectionHeader from './SectionHeader'
import { Button } from './ui/button'

interface PricingProps {
  eyebrowText?: string
  title?: string
  paragraphs?: string[]
  primaryButtonText?: string
  primaryButtonUrl?: string
  secondaryButtonText?: string
  secondaryButtonUrl?: string
}

const defaultData = {
  eyebrowText: "Get Started",
  title: "Ready to Build Something Amazing?",
  paragraphs: [
    "Let's discuss your project and see how we can bring your vision to life.",
    "Everything starts with a quick intro call."
  ],
  primaryButtonText: "Schedule a Call",
  primaryButtonUrl: "https://tidycal.com/daviddejong/the-fold-discovery-mpoxpll",
  secondaryButtonText: "View Our Work",
  secondaryButtonUrl: "/case-studies"
}

export default function Pricing({
  eyebrowText = defaultData.eyebrowText,
  title = defaultData.title,
  paragraphs = defaultData.paragraphs,
  primaryButtonText = defaultData.primaryButtonText,
  primaryButtonUrl = defaultData.primaryButtonUrl,
  secondaryButtonText = defaultData.secondaryButtonText,
  secondaryButtonUrl = defaultData.secondaryButtonUrl
}: PricingProps = {}) {
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
            eyebrowText={eyebrowText}
            title={title}
            paragraphs={paragraphs}
            alignment="center"
            maxWidth="max-w-[600px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="md" className="min-w-[160px]" asChild>
            <a href={primaryButtonUrl}>{primaryButtonText}</a>
          </Button>
          <Button variant="outline" size="md" className="min-w-[160px]" asChild>
            <a href={secondaryButtonUrl}>{secondaryButtonText}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
