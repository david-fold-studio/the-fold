import { NextRequest, NextResponse } from 'next/server'
import { getTestimonialsData, updateTestimonials } from '@/lib/builder'
import type { TestimonialsData } from '@/lib/data/types'

// GET /api/builder/testimonials - Fetch testimonials from Builder.io
export async function GET() {
  try {
    const data = await getTestimonialsData()
    
    if (!data) {
      return NextResponse.json({ error: 'No testimonials data found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

// POST /api/builder/testimonials - Create/update testimonials in Builder.io
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as TestimonialsData
    
    // Validate required fields
    if (!body.title || !body.eyebrowText || !body.testimonials) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await updateTestimonials(body)
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error updating testimonials:', error)
    return NextResponse.json({ error: 'Failed to update testimonials' }, { status: 500 })
  }
}

// PUT /api/builder/testimonials - Add a new testimonial to existing data
export async function PUT(request: NextRequest) {
  try {
    const { testimonial } = await request.json()
    
    if (!testimonial || !testimonial.name || !testimonial.title || !testimonial.quote) {
      return NextResponse.json({ error: 'Invalid testimonial data' }, { status: 400 })
    }

    // Get current data
    const currentData = await getTestimonialsData()
    
    if (!currentData) {
      return NextResponse.json({ error: 'No existing testimonials data found' }, { status: 404 })
    }

    // Add new testimonial
    const updatedData: TestimonialsData = {
      ...currentData,
      testimonials: [...currentData.testimonials, testimonial]
    }

    const result = await updateTestimonials(updatedData)
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error adding testimonial:', error)
    return NextResponse.json({ error: 'Failed to add testimonial' }, { status: 500 })
  }
}