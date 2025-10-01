"use client"

import { useState, useEffect } from 'react'
import { builder, BuilderComponent } from '@builder.io/react'

interface CaseStudyDetailProps {
  slug?: string
  id?: string
  className?: string
  style?: React.CSSProperties
}

export default function CaseStudyDetail({ 
  slug, 
  id, 
  className,
  style 
}: CaseStudyDetailProps) {
  const [caseStudy, setCaseStudy] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setLoading(true)
        
        let query: any = {}
        
        // Query by slug or ID
        if (slug) {
          query = { 'data.slug': slug }
        } else if (id) {
          query = { id }
        } else {
          setError('No slug or ID provided')
          return
        }

        const content = await builder
          .get('case-study', {
            query,
            options: {
              includeRefs: true
            }
          })
          .promise()

        if (content) {
          setCaseStudy(content)
        } else {
          setError('Case study not found')
        }
      } catch (err) {
        console.error('Error fetching case study:', err)
        setError('Failed to load case study')
      } finally {
        setLoading(false)
      }
    }

    fetchCaseStudy()
  }, [slug, id])

  if (loading) {
    return (
      <div className="w-full py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !caseStudy) {
    return (
      <div className="w-full py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Case Study Not Found
            </h1>
            <p className="text-gray-600">
              {error || 'The requested case study could not be found.'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <article className={className} style={style}>
      {/* Hero Section with Case Study Title */}
      <div className="w-full py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            {caseStudy.data?.tags && caseStudy.data.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {caseStudy.data.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {caseStudy.data?.title || caseStudy.name}
            </h1>
            
            {caseStudy.data?.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {caseStudy.data.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {caseStudy.data?.image && (
        <div className="w-full">
          <div className="mx-auto max-w-6xl px-6">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={caseStudy.data.image} 
                alt={caseStudy.data?.title || caseStudy.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Case Study Content - Builder.io Visual Editor */}
      <div className="w-full py-20">
        <div className="mx-auto max-w-4xl px-6">
          <BuilderComponent 
            model="case-study" 
            content={caseStudy}
            options={{
              includeRefs: true
            }}
          />
        </div>
      </div>

      {/* Back to Case Studies Link */}
      <div className="w-full pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="border-t pt-8">
            <a 
              href="/case-studies" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Case Studies
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}