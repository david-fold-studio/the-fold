'use client'

interface PricingTier {
  amount: string
  period: string
  description?: string
}

interface Feature {
  text: string
}

interface AddOn {
  title: string
  amount: string
  description?: string
}

interface PricingCardProps {
  title: string
  subtitle?: string
  pricing: PricingTier[]
  features: Feature[]
  addOn?: AddOn
  className?: string
}

export default function PricingCard({
  title,
  subtitle,
  pricing,
  features,
  addOn,
  className = ''
}: PricingCardProps) {
  return (
    <div
      className={`not-prose my-12 rounded-2xl border p-8 ${className}`}
      style={{
        background: 'var(--gradient-subtle)',
        borderColor: 'var(--color-grey-800)',
        maxWidth: '800px',
        margin: '3rem auto'
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="h3 mb-2">{title}</h3>
        {subtitle && (
          <p className="body-md" style={{ color: 'var(--color-grey-300)' }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Pricing */}
      <div className="mb-8">
        {pricing.map((tier, index) => (
          <div key={index} className={index > 0 ? 'mt-2' : ''}>
            <div className="flex items-baseline gap-2 mb-2">
              <span className={index === 0 ? 'text-4xl font-bold' : 'text-2xl font-semibold'}>
                {tier.amount}
              </span>
              <span className="body-md" style={{ color: 'var(--color-grey-400)' }}>
                {tier.period}
              </span>
            </div>
            {tier.description && (
              <p className="body-sm" style={{ color: 'var(--color-grey-400)' }}>
                {tier.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <span style={{ color: 'var(--color-accent-primary)' }}>✓</span>
              <span className="body-md">{feature.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Add-on */}
      {addOn && (
        <div className="pt-6 border-t" style={{ borderColor: 'var(--color-grey-700)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="body-sm font-semibold" style={{ color: 'var(--color-grey-300)' }}>
              {addOn.title}
            </span>
            <span className="body-md font-bold">{addOn.amount}</span>
          </div>
          {addOn.description && (
            <p className="body-xs mt-2" style={{ color: 'var(--color-grey-400)' }}>
              {addOn.description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
