"use client"
import { builder, BuilderComponent } from '@builder.io/react'
import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    page: string[]
  }>
}

export default function Page({ params }: PageProps) {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [urlPath, setUrlPath] = useState<string>('')

  useEffect(() => {
    let isMounted = true

    async function initializeAndFetch() {
      try {
        // Await params to get the page path
        const resolvedParams = await params
        const path = '/' + (resolvedParams.page?.join('/') || '')

        if (!isMounted) return

        setUrlPath(path)

        // Fetch Builder content
        if (process.env.NEXT_PUBLIC_BUILDER_API_KEY) {
          const content = await builder
            .get('page', {
              url: path,
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

    initializeAndFetch()

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