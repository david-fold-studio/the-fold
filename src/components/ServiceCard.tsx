'use client'
import { useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  eyebrowText?: string
  className?: string
}

export default function ServiceCard({
  title,
  description,
  eyebrowText = 'View Examples',
  className = ''
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Split the description into paragraphs based on sentence breaks
  const paragraphs = description.split('. ').filter(p => p.trim()).map((p, index, arr) => {
    // Add period back to all but the last paragraph (unless it already ends with one)
    return index === arr.length - 1 ? p : (p.endsWith('.') ? p : p + '.')
  })
  
  return (
    <div
      className={`group rounded-2xl transition-all duration-300 border p-8 relative ${className}`}
      style={{
        background: 'var(--gradient-subtle)',
        borderColor: 'var(--color-grey-800)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fixed Eyebrow Header with Content Transition */}
      <div className="mb-6 flex items-start justify-start">
        <div 
          className={`rounded-full border px-3 py-1.5 flex items-center gap-2 transition-all duration-400 ease-out overflow-hidden ${
            isHovered ? 'min-w-[140px]' : 'w-8 h-8 p-0 justify-center'
          }`}
          style={{
            background: 'var(--gradient-subtle)',
            borderColor: 'var(--color-grey-700)'
          }}
        >
          {/* Checkmark Icon - Default State */}
          <Check 
            className={`text-white transition-all duration-300 flex-shrink-0 ${
              isHovered 
                ? 'w-0 h-0 opacity-0 scale-0' 
                : 'w-4 h-4 opacity-100 scale-100'
            }`}
          />
          
          {/* Text - Hover State */}
          <span 
            className={`badge-text whitespace-nowrap transition-all duration-300 ${
              isHovered 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95 w-0'
            }`}
            style={{
              transitionDelay: isHovered ? '150ms' : '0ms'
            }}
          >
            {eyebrowText.toUpperCase()}
          </span>
          
          {/* Arrow Icon - Hover State */}
          <ArrowRight 
            className={`text-[var(--color-grey-200)] transition-all duration-300 flex-shrink-0 ${
              isHovered 
                ? 'w-4 h-4 opacity-100 scale-100' 
                : 'w-0 h-0 opacity-0 scale-0'
            }`}
            style={{
              transitionDelay: isHovered ? '250ms' : '0ms'
            }}
          />
        </div>
      </div>

      <h3 className="h3 mb-4">
        {title}
      </h3>

      <div className="space-y-3">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="body-md">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}