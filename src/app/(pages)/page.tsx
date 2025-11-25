"use client"
import { builder, BuilderComponent } from '@builder.io/react'
import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'

export default function Home() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function fetchBuilderContent() {
      try {
        // Fetch Builder content for the homepage (/)
        if (process.env.NEXT_PUBLIC_BUILDER_API_KEY) {
          const content = await builder
            .get('page', {
              url: '/',
              prerender: false,
            })
            .toPromise()

          if (!isMounted) return

          setContent(content)
        }
      } catch (error) {
        console.error('Error fetching Builder content:', error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchBuilderContent()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!content) {
    notFound()
  }

  return (
    <BuilderComponent
      model="page"
      content={content}
      enableEditingUrl={true}
    />
  )
}
