import { NextRequest, NextResponse } from 'next/server'
import { 
  updatePageSEO,
  updatePageOpenGraph,
  updatePageTwitter, 
  updatePageJSONLD,
  updatePageMeta,
  validateSEO,
  bulkUpdateSEO
} from '@/lib/builder'

// PUT /api/builder/seo - Update SEO settings for a page
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, type, data } = body
    
    if (!url || !type || !data) {
      return NextResponse.json({ 
        error: 'Missing required fields: url, type, data' 
      }, { status: 400 })
    }

    let result
    
    switch (type) {
      case 'seo':
        // Validate SEO data before updating
        const validation = validateSEO({
          metaTitle: data.metaTitle || '',
          metaDescription: data.metaDescription || '',
          keywords: data.keywords || [],
          robots: data.robots || 'index,follow'
        })
        
        if (!validation.valid) {
          return NextResponse.json({ 
            success: false,
            warnings: validation.warnings,
            data: null
          })
        }
        
        result = await updatePageSEO(url, data)
        break
        
      case 'openGraph':
        result = await updatePageOpenGraph(url, data)
        break
        
      case 'twitter':
        result = await updatePageTwitter(url, data)
        break
        
      case 'jsonLd':
        result = await updatePageJSONLD(url, data)
        break
        
      case 'all':
        result = await updatePageMeta(url, data)
        break
        
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error updating SEO:', error)
    return NextResponse.json({ error: 'Failed to update SEO' }, { status: 500 })
  }
}

// POST /api/builder/seo/bulk - Bulk update SEO for multiple pages
export async function POST(request: NextRequest) {
  try {
    const { updates } = await request.json()
    
    if (!Array.isArray(updates)) {
      return NextResponse.json({ 
        error: 'Updates must be an array' 
      }, { status: 400 })
    }

    const results = await bulkUpdateSEO(updates)
    
    return NextResponse.json({ 
      success: true, 
      results,
      summary: {
        total: results.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length
      }
    })
  } catch (error) {
    console.error('Error bulk updating SEO:', error)
    return NextResponse.json({ error: 'Failed to bulk update SEO' }, { status: 500 })
  }
}