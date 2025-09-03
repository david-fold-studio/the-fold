"use client"
import { builder, Builder } from '@builder.io/react'
import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import BuilderRegistry from '@/lib/builder-registry'

// Initialize Builder
Builder.registerComponent(BuilderRegistry, {
  name: 'BuilderRegistry',
  hideFromInsertMenu: true,
})

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
    async function initializeAndFetch() {
      try {
        // Await params to get the page path
        const resolvedParams = await params
        const path = '/' + (resolvedParams.page?.join('/') || '')
        setUrlPath(path)

        // Fetch Builder content
        if (process.env.NEXT_PUBLIC_BUILDER_API_KEY) {
          const content = await builder
            .get('page', {
              url: path,
              prerender: false,
            })
            .toPromise()

          setContent(content)
        }
      } catch (error) {
        console.error('Error fetching Builder content:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAndFetch()
  }, [params])

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
    <>
      <BuilderRegistry />
      <Builder model="page" content={content} />
    </>
  )
}