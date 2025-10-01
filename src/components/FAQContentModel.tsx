"use client"

import { useState, useEffect } from 'react'
import { builder } from '@builder.io/react'
import FAQ from './FAQ'
import type { FAQData } from '@/lib/data/types'

interface FAQContentModelProps {
  contentId?: string
  className?: string
  style?: React.CSSProperties
}

export default function FAQContentModel({ 
  contentId = 'faq-section', 
  className,
  style 
}: FAQContentModelProps) {
  const [data, setData] = useState<FAQData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        const content = await builder
          .get('faq-content', {
            query: {
              'data.contentId': contentId
            }
          })
          .promise()

        if (content?.data) {
          setData(content.data as FAQData)
        } else {
          setError('No content found for this section')
        }
      } catch (err) {
        console.error('Error fetching FAQ content:', err)
        setError('Failed to load FAQ content')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [contentId])

  if (loading) {
    return (
      <div className="w-full py-20">
        <div className="mx-auto max-w-6xl px-6">
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
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center text-gray-500">
            {error || 'No FAQ content available'}
          </div>
        </div>
      </div>
    )
  }

  return <FAQ data={data} />
}