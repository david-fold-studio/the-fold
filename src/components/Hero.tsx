'use client'

import { clsx } from 'clsx'
import SplitText from './SplitText'
import AnimatedElement from './AnimatedElement'
import { Button } from './ui/button'
import type { HeroData } from '@/lib/data/types'
import { heroData } from '@/app/(pages)/homepage/hero/data'
import * as LucideIcons from 'lucide-react'

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
          'px-6 md:px-[var(--space-8)] pb-[var(--space-4)]'
        )}
        style={{
          height: '90vh',
          zIndex: 10,
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
                delay={30}
                duration={0.7}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.5}
                rootMargin="-20px"
                charOverrides={data.charOverrides || []}
                lineBreaks={data.lineBreaks || []}
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
                delay={30}
                duration={0.9}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-80px"
                lineBreaks={data.subtitleLineBreaks || []}
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
            <Button
              variant={data.primaryButton.variant || 'primary'}
              size={data.primaryButton.size || 'md'}
              asChild={!!data.primaryButton.href}
              className={data.primaryButton.icon && data.primaryButton.iconPosition === 'right' ? '!pr-3 !pl-4' : data.primaryButton.icon && data.primaryButton.iconPosition === 'left' ? '!pl-3 !pr-4' : ''}
            >
              {data.primaryButton.href ? (
                <a href={data.primaryButton.href} className="flex items-center gap-2">
                  {data.primaryButton.icon && data.primaryButton.iconPosition === 'left' && (() => {
                    const IconComponent = (LucideIcons as any)[data.primaryButton.icon]
                    return IconComponent ? <IconComponent size={18} /> : null
                  })()}
                  {data.primaryButton.text}
                  {data.primaryButton.icon && data.primaryButton.iconPosition !== 'left' && (() => {
                    const IconComponent = (LucideIcons as any)[data.primaryButton.icon]
                    return IconComponent ? <IconComponent size={18} /> : null
                  })()}
                </a>
              ) : (
                <span className="flex items-center gap-2">
                  {data.primaryButton.icon && data.primaryButton.iconPosition === 'left' && (() => {
                    const IconComponent = (LucideIcons as any)[data.primaryButton.icon]
                    return IconComponent ? <IconComponent size={18} /> : null
                  })()}
                  {data.primaryButton.text}
                  {data.primaryButton.icon && data.primaryButton.iconPosition !== 'left' && (() => {
                    const IconComponent = (LucideIcons as any)[data.primaryButton.icon]
                    return IconComponent ? <IconComponent size={18} /> : null
                  })()}
                </span>
              )}
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
              asChild={!!data.secondaryButton.href}
              className={data.secondaryButton.icon && data.secondaryButton.iconPosition === 'right' ? '!pr-3 !pl-4' : data.secondaryButton.icon && data.secondaryButton.iconPosition === 'left' ? '!pl-3 !pr-4' : ''}
            >
              {data.secondaryButton.href ? (
                <a href={data.secondaryButton.href} className="flex items-center gap-2">
                  {data.secondaryButton.icon && data.secondaryButton.iconPosition === 'left' && (() => {
                    const IconComponent = (LucideIcons as any)[data.secondaryButton.icon]
                    return IconComponent ? <IconComponent size={18} /> : null
                  })()}
                  {data.secondaryButton.text}
                  {data.secondaryButton.icon && data.secondaryButton.iconPosition !== 'left' && (() => {
                    const IconComponent = (LucideIcons as any)[data.secondaryButton.icon]
                    return IconComponent ? <IconComponent size={18} /> : null
                  })()}
                </a>
              ) : data.secondaryButton.onClick ? (
                <button onClick={data.secondaryButton.onClick} className="flex items-center gap-2">
                  {data.secondaryButton.icon && data.secondaryButton.iconPosition === 'left' && (() => {
                    const IconComponent = (LucideIcons as any)[data.secondaryButton.icon]
                    return IconComponent ? <IconComponent size={18} /> : null
                  })()}
                  {data.secondaryButton.text}
                  {data.secondaryButton.icon && data.secondaryButton.iconPosition !== 'left' && (() => {
                    const IconComponent = (LucideIcons as any)[data.secondaryButton.icon]
                    return IconComponent ? <IconComponent size={18} /> : null
                  })()}
                </button>
              ) : (
                <span className="flex items-center gap-2">
                  {data.secondaryButton.icon && data.secondaryButton.iconPosition === 'left' && (() => {
                    const IconComponent = (LucideIcons as any)[data.secondaryButton.icon]
                    return IconComponent ? <IconComponent size={18} /> : null
                  })()}
                  {data.secondaryButton.text}
                  {data.secondaryButton.icon && data.secondaryButton.iconPosition !== 'left' && (() => {
                    const IconComponent = (LucideIcons as any)[data.secondaryButton.icon]
                    return IconComponent ? <IconComponent size={18} /> : null
                  })()}
                </span>
              )}
            </Button>
          )}
          </AnimatedElement>
        </div>
      </div>
    </section>
  )
}
