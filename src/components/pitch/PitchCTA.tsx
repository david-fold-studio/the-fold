import Link from 'next/link'

interface PitchCTAProps {
  title?: string
  description?: string
  primaryButtonText?: string
  primaryButtonUrl?: string
  secondaryButtonText?: string
  secondaryButtonUrl?: string
}

export default function PitchCTA({
  title = 'Ready to Get Started?',
  description = "Let's eliminate credentialing chaos and give you your time back.",
  primaryButtonText = 'Get Started',
  primaryButtonUrl = 'mailto:david@thefold.studio',
  secondaryButtonText = 'Book Review Call',
  secondaryButtonUrl = 'https://tidycal.com/daviddejong/the-fold-discovery-mpoxpll'
}: PitchCTAProps = {}) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[800px] px-6">
        <div className="bg-[#0d0d0d] rounded-2xl border border-white/5 p-8 md:p-12 text-center">
          <h2 className="h2 mb-4">{title}</h2>
          <p className="body-md mb-8" style={{ color: 'var(--color-grey-400)' }}>
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={primaryButtonUrl}
              className="btn-base btn-primary btn-md"
            >
              {primaryButtonText}
            </a>
            <a
              href={secondaryButtonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-secondary btn-md"
            >
              {secondaryButtonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
