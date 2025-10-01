"use client"

import { BuilderComponent, builder } from '@builder.io/react'
import { useEffect, useState } from 'react'
import SEOHead from './SEOHead'
import { SEOData, OpenGraphData, TwitterData, JSONLDData } from '@/lib/builder'

interface BuilderPageProps {
  url: string
  apiKey?: string
  preview?: boolean
}

interface PageData {
  title: string
  url: string
  seo: SEOData
  openGraph?: OpenGraphData
  twitter?: TwitterData
  jsonLd?: JSONLDData
  sections: any[]
}

export default function BuilderPage({ url, apiKey, preview = false }: BuilderPageProps) {
  const [pageData, setPageData] = useState<PageData | null>(null)
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Ensure Builder.io is properly initialized with correct API key
    const BUILDER_API_KEY = apiKey || process.env.NEXT_PUBLIC_BUILDER_API_KEY || '4a242b8010c048df9c06392f47457ba0'
    if (!builder.apiKey || builder.apiKey !== BUILDER_API_KEY) {
      builder.init(BUILDER_API_KEY)
    }

    // Fetch page data
    const fetchPage = async () => {
      try {
        setLoading(true)
        
        const content = await builder
          .get('page', {
            url,
            preview: preview || undefined,
            options: {
              includeRefs: true
            }
          })
          .promise()

        if (content) {
          setContent(content)
          setPageData(content.data as PageData)
        } else {
          setError('Page not found')
        }
      } catch (err) {
        console.error('Error fetching page:', err)
        setError('Failed to load page')
      } finally {
        setLoading(false)
      }
    }

    fetchPage()
  }, [url, apiKey, preview])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error || !pageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Page not found'}
          </h1>
          <p className="text-gray-600">
            The requested page could not be loaded.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* SEO Head */}
      <SEOHead
        title={pageData.title}
        seo={pageData.seo}
        openGraph={pageData.openGraph}
        twitter={pageData.twitter}
        jsonLd={pageData.jsonLd}
      />
      
      {/* Page Content */}
      <BuilderComponent 
        model="page" 
        content={content}
        options={{
          includeRefs: true
        }}
      />
    </>
  )
}

// Hook for accessing page data in child components
export function usePageData() {
  const [pageData, setPageData] = useState<PageData | null>(null)
  
  useEffect(() => {
    // Get page data from context or URL
    const getCurrentPageData = async () => {
      const currentUrl = window.location.pathname
      
      try {
        const content = await builder
          .get('page', { url: currentUrl })
          .promise()
          
        if (content) {
          setPageData(content.data as PageData)
        }
      } catch (error) {
        console.error('Error fetching current page data:', error)
      }
    }
    
    getCurrentPageData()
  }, [])
  
  return pageData
}

// Component for dynamic SEO updates (useful for client-side navigation)
export function DynamicSEO({ url }: { url: string }) {
  const [seoData, setSeoData] = useState<{
    title: string
    seo: SEOData
    openGraph?: OpenGraphData
    twitter?: TwitterData
    jsonLd?: JSONLDData
  } | null>(null)

  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const content = await builder
          .get('page', { 
            url,
            fields: 'data.title,data.seo,data.openGraph,data.twitter,data.jsonLd'
          })
          .promise()

        if (content?.data) {
          setSeoData({
            title: content.data.title,
            seo: content.data.seo,
            openGraph: content.data.openGraph,
            twitter: content.data.twitter,
            jsonLd: content.data.jsonLd
          })
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error)
      }
    }

    fetchSEOData()
  }, [url])

  if (!seoData) return null

  return (
    <SEOHead
      title={seoData.title}
      seo={seoData.seo}
      openGraph={seoData.openGraph}
      twitter={seoData.twitter}
      jsonLd={seoData.jsonLd}
    />
  )
}