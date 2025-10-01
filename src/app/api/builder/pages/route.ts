import { NextRequest, NextResponse } from 'next/server'
import { 
  getPage, 
  createOrUpdatePage, 
  addSectionToPage, 
  removeSectionFromPage,
  reorderPageSections,
  moveSectionOnPage,
  replacePageSections,
  duplicatePage
} from '@/lib/builder'

// GET /api/builder/pages?url=/homepage - Get page by URL
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    
    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
    }

    const page = await getPage(url)
    
    if (!page) {
      return NextResponse.json({ error: `Page not found: ${url}` }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: page })
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 })
  }
}

// POST /api/builder/pages - Create or update a page
export async function POST(request: NextRequest) {
  try {
    const { pageData, pageId } = await request.json()
    
    if (!pageData || !pageData.title || !pageData.url) {
      return NextResponse.json({ error: 'Missing required page data' }, { status: 400 })
    }

    const result = await createOrUpdatePage(pageData, pageId)
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error creating/updating page:', error)
    return NextResponse.json({ error: 'Failed to create/update page' }, { status: 500 })
  }
}