'use client'

import { clsx } from 'clsx'
import SplitText from './SplitText'
import AnimatedElement from './AnimatedElement'
import { Button } from './ui/button'
import type { HeroData } from '@/lib/data/types'
import { heroData } from '@/app/(pages)/homepage/hero/data'

interface HeroProps {
  data?: HeroData
}

export default function Hero({ data = heroData }: HeroProps) {
  return (
    <section
      id="hero"
      className={clsx(
        'relative flex min-h-screen w-full',
        'items-center justify-center',
        'overflow-hidden'
      )}
      style={{
        backgroundColor:
          'var(--color-black-solid)',
        color: 'var(--color-white-solid)',
      }}
    >
      {/* Video Background */}
      <div className='absolute inset-0'>
        <video
          autoPlay
          muted
          loop
          playsInline
          className='h-full w-full object-cover'
        >
          <source
            src={data.videoSrc || '/video-background.mp4'}
            type='video/mp4'
          />
        </video>
      </div>

      {/* Content Container - matching Figma structure */}
      <div
        className={clsx(
          'items-left flex w-full flex-col justify-end',
          'content-stretch gap-2.5',
        )}
        style={{
          height: '90vh',
          zIndex: 10,
          paddingLeft: 'var(--space-8)',
          paddingRight: 'var(--space-8)',
          paddingBottom: 'var(--space-4)',
        }}
      >
        {/* Heading Section */}
        <div
          className={clsx(
            'relative flex w-full shrink-0',
            'flex-col content-stretch',
            'items-start justify-start gap-4'
          )}
        >
          {/* Main Title */}
          <div
            className='relative flex shrink-0 flex-col justify-center'
            style={{
              width: 'min-content',
              minWidth: '100%',
            }}
          >
            <div>
              <SplitText
                text={data.title}
                className="h1"
                delay={20}
                duration={0.7}
                ease="power2.out"
                splitType="chars"
                from={{ opacity: 0, y: 50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.5}
                rootMargin="-20px"
                charOverrides={[
                  {
                    start: 14, 
                    end:26,   
                    style: { fontStyle: 'italic' }
                  },
                ]}
                lineBreaks={[26]} // Add line break before "now" (character index 26)
              />
            </div>
          </div>

          {/* Subtitle */}
          <div
            className='relative flex shrink-0 flex-col content-fill items-start justify-start'
            style={{
              maxWidth: '600px',
              width: 'auto',
            }}
          >
            <div className='relative flex w-full shrink-0 flex-col justify-center'>
              <SplitText
                text={data.subtitle}
                className="body-md"
                delay={20}
                duration={0.9}
                ease="power2.out"
                splitType="chars"
                from={{ opacity: 0, y: 50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-80px"
                lineBreaks={[85]} // Break before "than" to prevent word splitting
              />
            </div>
          </div>
        </div>

        {/* CTA Buttons Section */}
        <div
          className={clsx(
            'flex w-full shrink-0',
            'items-left content-stretch justify-start',
            'mt-2 gap-4 p-2 -ml-2'
          )}
        >
          {/* Primary Button - Schedule a Call */}
          <AnimatedElement
            delay={1400}
            duration={0.8}
            ease="power3.out"
            from={{ opacity: 0, y: 40, }}
            to={{ opacity: 1, y: 0, }}
            threshold={0.5}
            rootMargin="-50px"
          >
            <Button variant={data.primaryButton.variant || 'primary'} size={data.primaryButton.size || 'md'}>
              {data.primaryButton.text}
            </Button>
          </AnimatedElement>

          {/* Secondary Button */}
          <AnimatedElement
            delay={2500}
            duration={1.8}
            ease="power3.out"
            from={{ opacity: 0, y: 40, scale: 0.8 }}
            to={{ opacity: 1, y: 0, scale: 1 }}
            threshold={0.1}
            rootMargin="-50px"
          >
{data.secondaryButton && (
            <Button
              variant={data.secondaryButton.variant || 'secondary'}
              size={data.secondaryButton.size || 'md'}
              onClick={data.secondaryButton.onClick || (data.secondaryButton?.href ? () => window.open(data.secondaryButton!.href, '_blank') : undefined)}
            >
              {data.secondaryButton.text}
            </Button>
          )}
          </AnimatedElement>
        </div>
      </div>
    </section>
  )
}
