import { NextRequest, NextResponse } from 'next/server'
import { validateSEO, generateMetaDescription } from '@/lib/builder'

// POST /api/builder/seo/validate - Validate SEO data
export async function POST(request: NextRequest) {
  try {
    const seoData = await request.json()
    
    if (!seoData.metaTitle || !seoData.metaDescription) {
      return NextResponse.json({ 
        error: 'Meta title and description are required' 
      }, { status: 400 })
    }

    const validation = validateSEO({
      metaTitle: seoData.metaTitle,
      metaDescription: seoData.metaDescription,
      keywords: seoData.keywords || [],
      robots: seoData.robots || 'index,follow'
    })
    
    return NextResponse.json(validation)
  } catch (error) {
    console.error('Error validating SEO:', error)
    return NextResponse.json({ error: 'Failed to validate SEO' }, { status: 500 })
  }
}

// PUT /api/builder/seo/validate - Generate meta description from content
export async function PUT(request: NextRequest) {
  try {
    const { content, maxLength } = await request.json()
    
    if (!content) {
      return NextResponse.json({ 
        error: 'Content is required' 
      }, { status: 400 })
    }

    const metaDescription = generateMetaDescription(content, maxLength)
    
    return NextResponse.json({ 
      success: true, 
      metaDescription,
      length: metaDescription.length
    })
  } catch (error) {
    console.error('Error generating meta description:', error)
    return NextResponse.json({ error: 'Failed to generate meta description' }, { status: 500 })
  }
}