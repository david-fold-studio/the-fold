'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface CharStyleOverride {
  start: number
  end: number
  className?: string
  style?: React.CSSProperties
}

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: 'chars' | 'words' | 'lines'
  from?: Record<string, any>
  to?: Record<string, any>
  threshold?: number
  rootMargin?: string
  textAlign?: string
  charOverrides?: CharStyleOverride[]
  lineBreaks?: number[]
  onLetterAnimationComplete?: () => void
}

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'left',
  charOverrides = [],
  lineBreaks = [],
  onLetterAnimationComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, isVisible])

  useEffect(() => {
    if (!isVisible || !containerRef.current) return

    const container = containerRef.current
    const elements = container.querySelectorAll(
      splitType === 'chars' ? '.char' : splitType === 'words' ? '.word' : '.line'
    )

    if (elements.length === 0) return

    // Set initial state
    gsap.set(elements, from)

    // Animate elements
    gsap.to(elements, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      onComplete: () => {
        if (onLetterAnimationComplete) {
          onLetterAnimationComplete()
        }
      },
    })
  }, [isVisible, delay, duration, ease, from, to, splitType, onLetterAnimationComplete])

  const getCharOverride = (index: number) => {
    return charOverrides.find(override => 
      index >= override.start && index <= override.end
    )
  }

  const splitText = (text: string) => {
    if (splitType === 'chars') {
      const chars = text.split('')
      const elements: JSX.Element[] = []
      
      chars.forEach((char, index) => {
        // Add line break if this index is in the lineBreaks array
        if (lineBreaks.includes(index)) {
          elements.push(<br key={`br-${index}`} />)
        }
        
        // Skip spaces that immediately follow a line break
        if (char === ' ' && lineBreaks.includes(index)) {
          return
        }
        
        const override = getCharOverride(index)
        const combinedClassName = override?.className ? `char inline-block ${override.className}` : "char inline-block"
        const combinedStyle = { 
          fontStyle: 'inherit', 
          ...override?.style 
        }
        
        elements.push(
          <span key={index} className={combinedClassName} style={combinedStyle}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        )
      })
      
      return elements
    } else if (splitType === 'words') {
      const words = text.split(' ')
      const elements: JSX.Element[] = []
      
      words.forEach((word, index) => {
        // Add line break if this index is in the lineBreaks array
        if (lineBreaks.includes(index)) {
          elements.push(<br key={`br-${index}`} />)
        }
        
        const override = getCharOverride(index)
        const combinedClassName = override?.className ? `word inline-block ${override.className}` : "word inline-block"
        const combinedStyle = { 
          fontStyle: 'inherit', 
          ...override?.style 
        }
        
        elements.push(
          <span key={index} className={combinedClassName} style={combinedStyle}>
            {word}
            {/* Add space after each word except when followed by a line break or if it's the last word */}
            {index < words.length - 1 && !lineBreaks.includes(index + 1) && '\u00A0'}
          </span>
        )
      })
      
      return elements
    } else {
      return text.split('\n').map((line, index) => {
        const override = getCharOverride(index)
        const combinedClassName = override?.className ? `line block ${override.className}` : "line block"
        const combinedStyle = { 
          fontStyle: 'inherit', 
          ...override?.style 
        }
        
        return (
          <span key={index} className={combinedClassName} style={combinedStyle}>
            {line}
          </span>
        )
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ textAlign: textAlign as any }}
    >
      {splitText(text)}
    </div>
  )
}