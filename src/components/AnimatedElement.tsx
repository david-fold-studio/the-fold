'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface AnimatedElementProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  ease?: string
  from?: Record<string, any>
  to?: Record<string, any>
  threshold?: number
  rootMargin?: string
  className?: string
}

export default function AnimatedElement({
  children,
  delay = 0,
  duration = 0.6,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  className = '',
}: AnimatedElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!elementRef.current) return

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

    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, isVisible])

  useEffect(() => {
    if (!isVisible || !elementRef.current) return

    const element = elementRef.current

    // Set initial state
    gsap.set(element, from)

    // Animate element
    gsap.to(element, {
      ...to,
      duration,
      ease,
      delay: delay / 1000,
    })
  }, [isVisible, delay, duration, ease, from, to])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}