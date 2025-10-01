'use client'

import SectionHeader from '../SectionHeader'

interface PitchSectionProps {
  id?: string
  eyebrowText?: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  backgroundColor?: string
  maxWidth?: string
  alignment?: 'left' | 'center'
}

export default function PitchSection({
  id,
  eyebrowText,
  title,
  subtitle,
  children,
  className = '',
  backgroundColor,
  maxWidth = 'max-w-7xl',
  alignment = 'center'
}: PitchSectionProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        backgroundColor: backgroundColor || 'var(--color-black-solid)'
      }}
    >
      <div className={`mx-auto ${maxWidth} px-4 sm:px-6 lg:px-8`}>
        {(eyebrowText || title || subtitle) && (
          <div className="mb-16">
            <SectionHeader
              eyebrowText={eyebrowText}
              title={title}
              paragraphs={subtitle ? [subtitle] : undefined}
              alignment={alignment}
              maxWidth="max-w-[800px]"
            />
          </div>
        )}

        {children}
      </div>
    </section>
  )
}