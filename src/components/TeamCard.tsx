'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface TeamCardProps {
  name: string
  title: string
  description: string
  avatar: string
  className?: string
  isSpecialCard?: boolean
}

export default function TeamCard({
  name,
  title,
  description,
  avatar,
  className,
  isSpecialCard = false
}: TeamCardProps) {
  return (
    <div
      className={cn(
        'group overflow-hidden transition-colors border hover:bg-[var(--gradient-subtle-hover)]',
        className
      )}
      style={{
        background: isSpecialCard ? 'var(--gradient-subtle)' : 'var(--color-grey-850)',
        borderColor: 'var(--color-grey-750)',
        borderRadius: 'var(--br-1)',
      }}
    >
      {/* Avatar */}
      <div className="flex justify-center mb-4 pt-6">
        <div
          className="relative w-20 h-20 overflow-hidden flex items-center justify-center"
          style={{
            borderRadius: '50%',
            border: '1px solid var(--color-grey-750)',
            background: isSpecialCard ? 'var(--color-grey-700)' : 'transparent',
          }}
        >
          {avatar === 'users-icon' ? (
            <svg
              className="w-10 h-10 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
            </svg>
          ) : (
            <Image
              src={avatar}
              alt={`${name} headshot`}
              fill
              className="object-cover"
              sizes="80px"
            />
          )}
        </div>
      </div>

      {/* Content container */}
      <div className="p-6 pt-0">
        {/* Name and Title */}
        <div className="text-center mb-4">
          <h3 className="h4 mb-1" style={{ color: 'var(--color-grey-200)' }}>
            {name}
          </h3>
          <p className="text-sm text-grey-400 font-medium">
            {title}
          </p>
        </div>

        {/* Description */}
        <p className="body-sm text-center leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}