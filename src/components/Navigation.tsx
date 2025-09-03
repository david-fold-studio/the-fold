"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

const logoIcon = "http://localhost:3845/assets/2167948ec12bedeac37af8ce3bca359ea557f114.svg"
const logoText = "http://localhost:3845/assets/0dbf8a332e546c9c2650c3736e7ecaef62e27989.svg"
const portfolioIcon = "http://localhost:3845/assets/4b3143bde9c2a74b4d52f1a0e51c640ce077ad7d.svg"

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
          <div className={`
            flex items-center transition-all duration-300
            ${isScrolled ? 'w-[180px] px-0 py-0' : 'w-[41px] px-0 py-0 mr-2.5'}
          `}>
            <div className="flex items-center gap-2 h-14 px-2">
              <div className="w-9 h-9 flex items-center justify-center">
                <img 
                  src={logoIcon} 
                  alt="Logo" 
                  className="w-[21.477px] h-[21.477px]"
                />
              </div>
              
              {isScrolled && (
                <div className={`
                  transition-all duration-300 overflow-hidden
                  ${isScrolled ? 'w-[99.373px] opacity-100' : 'w-0 opacity-0'}
                `}>
                  <img 
                    src={logoText} 
                    alt="The Fold" 
                    className="w-[99.373px] h-[9.523px]"
                  />
                </div>
              )}
            </div>
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
              href="#articles" 
              className="px-2 py-1 text-[#cccccc] text-[14px] font-medium tracking-[0.28px] hover:text-white transition-colors cursor-pointer"
            >
              Articles
            </a>
            <a 
              href="#contact" 
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
              <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
                <img 
                  src={portfolioIcon} 
                  alt="Portfolio" 
                  className="w-4 h-4"
                />
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}