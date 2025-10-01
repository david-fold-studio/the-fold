import Link from 'next/link'

export default function PitchCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[800px] px-6">
        <div className="bg-[#0d0d0d] rounded-2xl border border-white/5 p-8 md:p-12 text-center">
          <h2 className="h2 mb-4">Ready to Get Started?</h2>
          <p className="body-md mb-8" style={{ color: 'var(--color-grey-400)' }}>
            Let's eliminate credentialing chaos and give you your time back.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:david@thefold.studio"
              className="btn-base btn-primary btn-md"
            >
              Get Started
            </a>
            <a
              href="https://tidycal.com/daviddejong/the-fold-discovery-mpoxpll"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-secondary btn-md"
            >
              Book Review Call
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
