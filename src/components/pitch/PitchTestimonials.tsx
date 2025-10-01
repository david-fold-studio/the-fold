'use client'

import PitchSection from './PitchSection'

export default function PitchTestimonials() {
  const testimonials = [
    {
      quote: "We've partnered with The Fold Studio for over a year, and they've been an integral part of our team. Their expertise in design and user experience optimization has significantly enhanced our site's flow, leading to a huge increase in user engagement.",
      author: "Ryan Shelby",
      title: "CEO & Founder at RespSafety",
      company: "RespSafety"
    },
    {
      quote: "David is an instrumental part of my team and has helped bolster our digital strategy. He is not only an incredible UX designer, he is a well-rounded strategist that I lean on constantly for sound advice and the most current trends and best practices.",
      author: "Drew Sherman",
      title: "SVP Brand Strategy at RPM",
      company: "RPM"
    },
    {
      quote: "David showed great understanding and insight into the brand, enhancing it with his thoughtful UX design. His ability to create customized solutions adds significant value to any web project.",
      author: "Chase Binnie",
      title: "CEO at RetailWire",
      company: "RetailWire"
    }
  ]

  return (
    <PitchSection
      id="testimonials"
      eyebrowText="CLIENT SUCCESS & TESTIMONIALS"
      title="What Our Clients Say"
      className="py-20"
      backgroundColor="var(--color-grey-900)"
    >
      {/* Our Client Testimonials */}
      <div className="mb-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl p-8 border group hover:animate-pulse-border"
              style={{
                backgroundColor: 'var(--color-grey-850)',
                borderColor: 'var(--color-grey-800)'
              }}
            >
              <div className="flex flex-col space-y-6 h-full">
                <div className="flex-1">
                  <p className="body-md leading-relaxed" style={{ color: 'var(--color-body-strong)' }}>
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="border-t pt-6" style={{ borderColor: 'var(--color-grey-800)' }}>
                  <h4 className="h4" style={{ color: 'var(--color-body-strong)' }}>
                    {testimonial.author}
                  </h4>
                  <p className="body-sm uppercase" style={{
                    color: 'var(--color-body-base)',
                    letterSpacing: '1.8px'
                  }}>
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </PitchSection>
  )
}