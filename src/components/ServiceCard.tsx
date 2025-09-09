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
      {/* Checkmark in Circle */}
      <div className="mb-6 flex items-start justify-start">
        <div 
          className="w-8 h-8 rounded-full border flex items-center justify-center"
          style={{
            background: 'var(--gradient-subtle)',
            borderColor: 'var(--color-grey-700)'
          }}
        >
          <Check className="w-4 h-4 text-white" />
        </div>
      </div>

      <h3 className="h3 mb-4" style={{ color: 'var(--color-body-strong)' }}>
        {title}
      </h3>

      <div className="space-y-3">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="body-md" style={{ color: 'var(--color-body-strong)' }}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}