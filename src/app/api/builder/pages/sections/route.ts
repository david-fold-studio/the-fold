import { NextRequest, NextResponse } from 'next/server'
import { 
  addSectionToPage, 
  removeSectionFromPage,
  reorderPageSections,
  moveSectionOnPage,
  replacePageSections
} from '@/lib/builder'

// POST /api/builder/pages/sections - Add a section to a page
export async function POST(request: NextRequest) {
  try {
    const { url, sectionComponent, contentId, position } = await request.json()
    
    if (!url || !sectionComponent || !contentId) {
      return NextResponse.json({ 
        error: 'Missing required fields: url, sectionComponent, contentId' 
      }, { status: 400 })
    }

    const result = await addSectionToPage(url, sectionComponent, contentId, position)
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error adding section to page:', error)
    return NextResponse.json({ error: 'Failed to add section to page' }, { status: 500 })
  }
}

// DELETE /api/builder/pages/sections - Remove a section from a page
export async function DELETE(request: NextRequest) {
  try {
    const { url, sectionIndex } = await request.json()
    
    if (!url || sectionIndex === undefined) {
      return NextResponse.json({ 
        error: 'Missing required fields: url, sectionIndex' 
      }, { status: 400 })
    }

    const result = await removeSectionFromPage(url, sectionIndex)
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error removing section from page:', error)
    return NextResponse.json({ error: 'Failed to remove section from page' }, { status: 500 })
  }
}

// PUT /api/builder/pages/sections/reorder - Reorder all sections on a page
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (body.action === 'reorder') {
      const { url, newOrder } = body
      
      if (!url || !Array.isArray(newOrder)) {
        return NextResponse.json({ 
          error: 'Missing required fields: url, newOrder (array)' 
        }, { status: 400 })
      }

      const result = await reorderPageSections(url, newOrder)
      return NextResponse.json({ success: true, data: result })
    }
    
    if (body.action === 'move') {
      const { url, fromIndex, toIndex } = body
      
      if (!url || fromIndex === undefined || toIndex === undefined) {
        return NextResponse.json({ 
          error: 'Missing required fields: url, fromIndex, toIndex' 
        }, { status: 400 })
      }

      const result = await moveSectionOnPage(url, fromIndex, toIndex)
      return NextResponse.json({ success: true, data: result })
    }
    
    if (body.action === 'replace') {
      const { url, newSections } = body
      
      if (!url || !Array.isArray(newSections)) {
        return NextResponse.json({ 
          error: 'Missing required fields: url, newSections (array)' 
        }, { status: 400 })
      }

      const result = await replacePageSections(url, newSections)
      return NextResponse.json({ success: true, data: result })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error modifying page sections:', error)
    return NextResponse.json({ error: 'Failed to modify page sections' }, { status: 500 })
  }
}