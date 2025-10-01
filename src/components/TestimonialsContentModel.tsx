"use client"

import { useState, useEffect } from 'react'
import { builder } from '@builder.io/react'
import Testimonials from './Testimonials'
import type { TestimonialsData } from '@/lib/data/types'

interface TestimonialsContentModelProps {
  contentId?: string
  className?: string
  style?: React.CSSProperties
}

export default function TestimonialsContentModel({ 
  contentId = 'testimonials-section', 
  className,
  style 
}: TestimonialsContentModelProps) {
  const [data, setData] = useState<TestimonialsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        const content = await builder
          .get('testimonials-content', {
            query: {
              'data.contentId': contentId
            }
          })
          .promise()

        if (content?.data) {
          setData(content.data as TestimonialsData)
        } else {
          setError('No content found for this section')
        }
      } catch (err) {
        console.error('Error fetching testimonials content:', err)
        setError('Failed to load testimonials content')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [contentId])

  if (loading) {
    return (
      <div className="w-full py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="w-full py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center text-gray-500">
            {error || 'No testimonials content available'}
          </div>
        </div>
      </div>
    )
  }

  return <Testimonials data={data} />
}