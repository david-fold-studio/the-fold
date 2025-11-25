'use client'

import { clsx } from 'clsx'
import SplitText from './SplitText'
import AnimatedElement from './AnimatedElement'
import { Button } from './ui/button'
import type { HeroData } from '@/lib/data/types'
import * as LucideIcons from 'lucide-react'

interface HeroProps {
  data?: HeroData
}

export default function Hero(props: any) {
  // Builder.io is the ONLY source of truth for ALL pages
  // No hardcoded defaults - only use what Builder provides

  // Helper to extract line breaks from Builder list format
  const extractLineBreaks = (lineBreaksData: any): number[] | undefined => {
    if (!lineBreaksData) return undefined

    // If it's already an array of numbers, return it
    if (Array.isArray(lineBreaksData)) {
      if (lineBreaksData.length === 0) return undefined

      // Try to extract values - Builder might use different formats
      const numbers = lineBreaksData
        .map((item: any) => {
          // Direct number
          if (typeof item === 'number') return item
          // Object with value property
          if (item && typeof item === 'object' && typeof item.value === 'number') return item.value
          // Try parsing as number
          const num = Number(item)
          return isNaN(num) ? null : num
        })
        .filter((v: any) => v !== null && typeof v === 'number')

      return numbers.length > 0 ? numbers : undefined
    }

    return undefined
  }

  const mergedData: HeroData = {
    eyebrowText: props['data.eyebrowText'] || undefined,
    title: props['data.title'] || '',
    subtitle: props['data.subtitle'] || '',
    videoSrc: props['data.videoSrc'] || '/video-background.mp4',
    backgroundImage: props['data.backgroundImage'] || undefined,
    // Line breaks: ONLY use what Builder provides, no defaults
    titleLineBreaks: extractLineBreaks(props['data.titleLineBreaks']),
    subtitleLineBreaks: extractLineBreaks(props['data.subtitleLineBreaks']),
    titleMaxWidth: props['data.titleMaxWidth'] || '640px',
    subtitleMaxWidth: props['data.subtitleMaxWidth'] || '640px',
    // Italics: ONLY use what Builder provides, no defaults
    italicsStart: props['data.italicsStart'],
    italicsEnd: props['data.italicsEnd'],
    primaryButton: {
      text: props['data.primaryButton.text'] || 'Schedule a Call',
      variant: props['data.primaryButton.variant'] || 'primary',
      size: props['data.primaryButton.size'] || 'md',
      href: props['data.primaryButton.href'] || undefined,
      icon: props['data.primaryButton.icon'] || undefined,
      iconPosition: props['data.primaryButton.iconPosition'] || 'right',
    },
    secondaryButton: props['data.secondaryButton.text'] ? {
      text: props['data.secondaryButton.text'],
      variant: props['data.secondaryButton.variant'] || 'secondary',
      size: props['data.secondaryButton.size'] || 'md',
      href: props['data.secondaryButton.href'] || undefined,
      icon: props['data.secondaryButton.icon'] || undefined,
      iconPosition: props['data.secondaryButton.iconPosition'] || 'right',
    } : undefined,
  }

  // Build charOverrides from italicsStart/End if BOTH are provided and valid
  // Only apply if both values exist, are numbers, and end > start
  const charOverrides = (
    typeof mergedData.italicsStart === 'number' &&
    typeof mergedData.italicsEnd === 'number' &&
    mergedData.italicsEnd > mergedData.italicsStart
  )
    ? [{ start: mergedData.italicsStart, end: mergedData.italicsEnd, style: { fontStyle: 'italic' } }]
    : []

  // Debug: log final values
  if (process.env.NODE_ENV === 'development') {
    console.log('Hero render DEBUG:', {
      propsKeys: Object.keys(props),
      allPropsStringified: JSON.stringify(props, null, 2),

      // Processed values
      titleLineBreaks: mergedData.titleLineBreaks,
      subtitleLineBreaks: mergedData.subtitleLineBreaks,
      italicsStart: mergedData.italicsStart,
      italicsEnd: mergedData.italicsEnd,
      hasCharOverrides: charOverrides.length > 0,

      // Raw values with different access patterns
      'props[data.titleLineBreaks]': props['data.titleLineBreaks'],
      'props[data.subtitleLineBreaks]': props['data.subtitleLineBreaks'],
      'props[data.italicsStart]': props['data.italicsStart'],
      'props[data.italicsEnd]': props['data.italicsEnd'],

      // Try alternative access patterns
      'props.data?.titleLineBreaks': props.data?.titleLineBreaks,
      'props.data?.italicsStart': props.data?.italicsStart,
    })
  }

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
              maxWidth: mergedData.titleMaxWidth || '640px',
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
                  charOverrides={charOverrides}
                  lineBreaks={mergedData.titleLineBreaks || []}
                />
              </div>
            )}
          </div>

          {/* Subtitle */}
          {mergedData.subtitle && (
            <div
              className='relative flex shrink-0 flex-col content-fill items-start justify-start'
              style={{
                maxWidth: mergedData.subtitleMaxWidth || '640px',
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
