"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
const logoFull = "/logo-full.svg"

export default function Navigation() {
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
      <div className="flex items-center justify-start px-[120px] py-3">
        <nav className={`
          flex items-center transition-all duration-300 ease-out rounded-full
          ${isScrolled 
            ? 'bg-gradient-to-b from-[#3b3b3b80] to-[#1a1a1acc] backdrop-blur-md border border-[rgba(102,102,102,0.09)] px-0 py-0' 
            : 'bg-transparent border border-transparent px-0 py-0'
          }
        `}>
          
          {/* Logo Section */}
          <div className="flex items-center px-2 py-0 w-[180px]">
            <a href="/" className="flex items-center h-14 w-full">
              <img 
                src={logoFull} 
                alt="The Fold" 
                className="w-full h-14 object-contain"
              />
            </a>
          </div>

          {/* Divider - only show when scrolled */}
          {isScrolled && (
            <div className="w-px h-4 bg-[rgba(102,102,102,0.3)]" />
          )}

          {/* Menu Links */}
          <div className={`
            flex items-center gap-4 transition-all duration-300
            ${isScrolled ? 'px-5 py-0' : 'px-0 py-0'}
          `}>
            <a 
              href="#projects" 
              className="px-2 py-1 text-[#cccccc] text-[14px] font-medium tracking-[0.28px] hover:text-white transition-colors cursor-pointer"
            >
              Projects
            </a>
            <a 
              href="mailto:hello@thefold.studio" 
              className="px-2 py-1 text-[#cccccc] text-[14px] font-medium tracking-[0.28px] hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </a>
          </div>

          {/* Divider - only show when scrolled */}
          {isScrolled && (
            <div className="w-px h-4 bg-[rgba(102,102,102,0.3)]" />
          )}

          {/* CTA Section */}
          <div className={`
            flex items-center justify-center transition-all duration-300
            ${isScrolled ? 'w-[180px] h-14 px-[9px] py-0' : 'w-[45px] h-16 px-0 py-0 justify-end'}
          `}>
            {isScrolled ? (
              <Button 
                variant="primary" 
                size="md"
                className="flex-grow text-[13.016px] font-medium leading-[16.8px]"
              >
                Book a call
              </Button>
            ) : (
              <a 
                href="https://app.usemotion.com/meet/david-de-jong/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center cursor-pointer ml-6"
              >
                <Calendar 
                  className="w-4 h-4 text-[#cccccc] hover:text-white transition-colors"
                  fill="currentColor"
                />
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}