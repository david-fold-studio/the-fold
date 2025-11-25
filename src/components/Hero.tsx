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

export default function Hero(props: any) {
  // Builder passes props with dot notation as flat keys like "data.title"
  // Reconstruct nested data object, merging with heroData defaults
  // Check if fields were explicitly set (even to empty string)
  const hasSubtitle = 'data.subtitle' in props ? props['data.subtitle'] : heroData.subtitle
  const hasSecondaryButtonText = 'data.secondaryButton.text' in props
    ? props['data.secondaryButton.text']
    : heroData.secondaryButton?.text

  const mergedData: HeroData = {
    eyebrowText: props['data.eyebrowText'] || undefined,
    title: props['data.title'] || heroData.title,
    subtitle: hasSubtitle || '',
    videoSrc: props['data.videoSrc'] || heroData.videoSrc,
    backgroundImage: props['data.backgroundImage'] || undefined,
    lineBreaks: props['data.lineBreaks'] || heroData.lineBreaks || [],
    subtitleLineBreaks: props['data.subtitleLineBreaks'] || heroData.subtitleLineBreaks || [],
    primaryButton: {
      text: props['data.primaryButton.text'] || heroData.primaryButton.text,
      variant: props['data.primaryButton.variant'] || heroData.primaryButton.variant || 'primary',
      size: props['data.primaryButton.size'] || heroData.primaryButton.size || 'md',
      href: props['data.primaryButton.href'] || heroData.primaryButton.href,
      icon: props['data.primaryButton.icon'] || heroData.primaryButton.icon,
      iconPosition: props['data.primaryButton.iconPosition'] || heroData.primaryButton.iconPosition || 'right',
    },
    secondaryButton: hasSecondaryButtonText ? {
      text: hasSecondaryButtonText,
      variant: props['data.secondaryButton.variant'] || heroData.secondaryButton?.variant || 'secondary',
      size: props['data.secondaryButton.size'] || heroData.secondaryButton?.size || 'md',
      href: props['data.secondaryButton.href'] || heroData.secondaryButton?.href,
      icon: props['data.secondaryButton.icon'] || heroData.secondaryButton?.icon,
      iconPosition: props['data.secondaryButton.iconPosition'] || heroData.secondaryButton?.iconPosition || 'right',
    } : undefined,
  }

  // Debug log
  console.log('Merged data:', { title: mergedData.title, subtitle: mergedData.subtitle })

  // Simple fallback rendering if animations fail
  const isBuilder = typeof window !== 'undefined' && window.location.search.includes('builder.')

  return (
    <section
      id="hero"
      className={clsx(
        'relative flex w-full',
        'items-end justify-center',
        'overflow-hidden'
      )}
      style={{
        backgroundColor:
          'var(--color-black-solid)',
        color: 'var(--color-white-solid)',
        minHeight: isBuilder ? '600px' : '800px',
        height: isBuilder ? 'auto' : '100vh',
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
            src={mergedData.videoSrc || '/video-background.mp4'}
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
          zIndex: 10,
          paddingTop: isBuilder ? '2rem' : undefined,
          paddingBottom: isBuilder ? '2rem' : undefined,
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
          {/* Optional Eyebrow Text */}
          {mergedData.eyebrowText && (
            <div className='relative flex shrink-0 flex-col justify-center'>
              <SplitText
                text={mergedData.eyebrowText}
                className="label"
                delay={0}
                duration={0.5}
                ease="power2.out"
                splitType="chars"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.5}
                rootMargin="-20px"
              />
            </div>
          )}

          {/* Main Title */}
          <div
            className='relative flex shrink-0 flex-col justify-center'
            style={{
              maxWidth: '640px',
              width: '100%',
            }}
          >
            {isBuilder ? (
              <h1 className="h1">{mergedData.title}</h1>
            ) : (
              <div>
                <SplitText
                  text={mergedData.title}
                  className="h1"
                  delay={30}
                  duration={0.7}
                  ease="power2.out"
                  splitType="words"
                  from={{ opacity: 0, y: 50 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.5}
                  rootMargin="-20px"
                  lineBreaks={mergedData.lineBreaks || []}
                />
              </div>
            )}
          </div>

          {/* Subtitle */}
          {mergedData.subtitle && (
            <div
              className='relative flex shrink-0 flex-col content-fill items-start justify-start'
              style={{
                maxWidth: '520px',
                width: 'auto',
              }}
            >
              {isBuilder ? (
                <p className="body-md">{mergedData.subtitle}</p>
              ) : (
                <div className='relative flex w-full shrink-0 flex-col justify-center'>
                  <SplitText
                    text={mergedData.subtitle}
                    className="body-md"
                    delay={30}
                    duration={0.9}
                    ease="power2.out"
                    splitType="words"
                    from={{ opacity: 0, y: 50 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-80px"
                    lineBreaks={mergedData.subtitleLineBreaks || []}
                  />
                </div>
              )}
            </div>
          )}
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
              variant={mergedData.primaryButton.variant || 'primary'}
              size={mergedData.primaryButton.size || 'md'}
              asChild={!!mergedData.primaryButton.href}
              className={mergedData.primaryButton.icon && mergedData.primaryButton.iconPosition === 'right' ? '!pr-3 !pl-4' : mergedData.primaryButton.icon && mergedData.primaryButton.iconPosition === 'left' ? '!pl-3 !pr-4' : ''}
            >
              {mergedData.primaryButton.href ? (
                <a href={mergedData.primaryButton.href} className="flex items-center gap-2">
                  {mergedData.primaryButton.icon && mergedData.primaryButton.iconPosition === 'left' && (() => {
                    const IconComponent = (LucideIcons as any)[mergedData.primaryButton.icon]
                    return IconComponent ? <IconComponent size={18} /> : null
                  })()}
                  {mergedData.primaryButton.text}
                  {mergedData.primaryButton.icon && mergedData.primaryButton.iconPosition !== 'left' && (() => {
                    const IconComponent = (LucideIcons as any)[mergedData.primaryButton.icon]
                    return IconComponent ? <IconComponent size={18} /> : null
                  })()}
                </a>
              ) : (
                <span className="flex items-center gap-2">
                  {mergedData.primaryButton.icon && mergedData.primaryButton.iconPosition === 'left' && (() => {
                    const IconComponent = (LucideIcons as any)[mergedData.primaryButton.icon]
                    return IconComponent ? <IconComponent size={18} /> : null
                  })()}
                  {mergedData.primaryButton.text}
                  {mergedData.primaryButton.icon && mergedData.primaryButton.iconPosition !== 'left' && (() => {
                    const IconComponent = (LucideIcons as any)[mergedData.primaryButton.icon]
                    return IconComponent ? <IconComponent size={18} /> : null
                  })()}
                </span>
              )}
            </Button>
          </AnimatedElement>

          {/* Secondary Button */}
          {mergedData.secondaryButton?.text && (
            <AnimatedElement
              delay={2500}
              duration={1.8}
              ease="power3.out"
              from={{ opacity: 0, y: 40, scale: 0.8 }}
              to={{ opacity: 1, y: 0, scale: 1 }}
              threshold={0.1}
              rootMargin="-50px"
            >
              <Button
                variant={mergedData.secondaryButton.variant || 'secondary'}
                size={mergedData.secondaryButton.size || 'md'}
                asChild={!!mergedData.secondaryButton.href}
                className={mergedData.secondaryButton.icon && mergedData.secondaryButton.iconPosition === 'right' ? '!pr-3 !pl-4' : mergedData.secondaryButton.icon && mergedData.secondaryButton.iconPosition === 'left' ? '!pl-3 !pr-4' : ''}
              >
                {mergedData.secondaryButton.href ? (
                  <a href={mergedData.secondaryButton.href} className="flex items-center gap-2">
                    {mergedData.secondaryButton.icon && mergedData.secondaryButton.iconPosition === 'left' && (() => {
                      const IconComponent = (LucideIcons as any)[mergedData.secondaryButton.icon]
                      return IconComponent ? <IconComponent size={18} /> : null
                    })()}
                    {mergedData.secondaryButton.text}
                    {mergedData.secondaryButton.icon && mergedData.secondaryButton.iconPosition !== 'left' && (() => {
                      const IconComponent = (LucideIcons as any)[mergedData.secondaryButton.icon]
                      return IconComponent ? <IconComponent size={18} /> : null
                    })()}
                  </a>
                ) : mergedData.secondaryButton.onClick ? (
                  <button onClick={mergedData.secondaryButton.onClick} className="flex items-center gap-2">
                    {mergedData.secondaryButton.icon && mergedData.secondaryButton.iconPosition === 'left' && (() => {
                      const IconComponent = (LucideIcons as any)[mergedData.secondaryButton.icon]
                      return IconComponent ? <IconComponent size={18} /> : null
                    })()}
                    {mergedData.secondaryButton.text}
                    {mergedData.secondaryButton.icon && mergedData.secondaryButton.iconPosition !== 'left' && (() => {
                      const IconComponent = (LucideIcons as any)[mergedData.secondaryButton.icon]
                      return IconComponent ? <IconComponent size={18} /> : null
                    })()}
                  </button>
                ) : (
                  <span className="flex items-center gap-2">
                    {mergedData.secondaryButton.icon && mergedData.secondaryButton.iconPosition === 'left' && (() => {
                      const IconComponent = (LucideIcons as any)[mergedData.secondaryButton.icon]
                      return IconComponent ? <IconComponent size={18} /> : null
                    })()}
                    {mergedData.secondaryButton.text}
                    {mergedData.secondaryButton.icon && mergedData.secondaryButton.iconPosition !== 'left' && (() => {
                      const IconComponent = (LucideIcons as any)[mergedData.secondaryButton.icon]
                      return IconComponent ? <IconComponent size={18} /> : null
                    })()}
                  </span>
                )}
              </Button>
            </AnimatedElement>
          )}
        </div>
      </div>
    </section>
  )
}
