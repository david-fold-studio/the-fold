'use client'

interface PricingOption {
  badge: string
  title: string
  description: string
  timeline?: string
  price: string
  period: string
  features: string[]
}

interface PitchPricingProps {
  options: PricingOption[]
  previewImage?: string
}

export default function PitchPricing({ options, previewImage }: PitchPricingProps) {
  return (
    <div className="mx-auto max-w-[720px] px-6">
      <div className="bg-[#0d0d0d] rounded-2xl border border-white/5 p-2 flex flex-col gap-3">
        {/* Visual Preview */}
        <div className="w-full overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-black/20 to-black/10 flex items-center justify-center min-h-[200px]">
          {previewImage ? (
            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center p-8">
              <p className="body-sm opacity-30">Visual Preview</p>
            </div>
          )}
        </div>

        {/* Pricing Options Grid */}
        <div className="grid md:grid-cols-2 gap-3">
          {options.map((option, index) => (
            <div key={index} className="bg-[#0d0d0d] rounded-lg p-3 flex flex-col gap-6">
              {/* Info Stack */}
              <div className="flex flex-col gap-6">
                {/* Badge */}
                <div className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-full border border-[#3a3a3a] self-start">
                  <span className="badge-text">{option.badge}</span>
                </div>

                {/* Title & Description */}
                <div className="flex flex-col gap-4">
                  <h3 className="h3 text-xl leading-7">{option.title}</h3>
                  <div className="flex flex-col gap-2">
                    <p className="body-md text-sm">{option.description}</p>
                    {option.timeline && (
                      <p
                        className="text-sm font-semibold"
                        style={{
                          letterSpacing: '-0.56px',
                          lineHeight: '26px',
                          color: 'var(--color-white)'
                        }}
                      >
                        {option.timeline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="flex gap-1 items-end">
                  <span className="h2">{option.price}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-col gap-3 px-1">
                {option.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className={`flex gap-1 ${featureIndex === 0 ? 'items-start' : 'items-center'}`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 shrink-0 ${featureIndex === 0 ? 'mt-1' : ''}`}
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M2 7L6 11L12 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="body-sm text-xs opacity-50">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a href="mailto:david@thefold.studio" className="btn-base btn-secondary btn-md w-full text-center">
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
