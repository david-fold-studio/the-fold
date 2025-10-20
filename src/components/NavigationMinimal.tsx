"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface NavigationMinimalProps {
  logoUrl?: string
  logoAlt?: string
  buttonText?: string
  buttonUrl?: string
  buttonVariant?: 'primary' | 'secondary' | 'outline'
}

const defaultProps = {
  logoUrl: "/logo-full.svg",
  logoAlt: "The Fold",
  buttonText: "Get Started",
  buttonUrl: "mailto:david@thefold.studio",
  buttonVariant: "primary" as const
}

export default function NavigationMinimal({
  logoUrl = defaultProps.logoUrl,
  logoAlt = defaultProps.logoAlt,
  buttonText = defaultProps.buttonText,
  buttonUrl = defaultProps.buttonUrl,
  buttonVariant = defaultProps.buttonVariant
}: NavigationMinimalProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.5
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed left-0 right-0 top-0 z-50 transition-all duration-300">
      <div className="flex items-center px-6 md:px-[120px] py-3">
        <nav className="flex items-center justify-between w-full bg-transparent">

          {/* Logo Section - No Link */}
          <div className="flex items-center px-2 py-0">
            <div className="flex items-center h-14">
              <img
                src={logoUrl}
                alt={logoAlt}
                className="h-14 w-auto object-contain"
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex items-center justify-center h-14 px-[9px] py-0">
            <Button
              variant={buttonVariant}
              size="md"
              className="text-[13.016px] font-medium leading-[16.8px]"
              asChild
            >
              <a href={buttonUrl}>
                {buttonText}
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
