import { NextRequest, NextResponse } from 'next/server'
import { getServicesData, updateServices } from '@/lib/builder'
import type { ServicesData } from '@/lib/data/types'

// GET /api/builder/services - Fetch services from Builder.io
export async function GET() {
  try {
    const data = await getServicesData()
    
    if (!data) {
      return NextResponse.json({ error: 'No services data found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

// POST /api/builder/services - Create/update services in Builder.io
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ServicesData
    
    // Validate required fields
    if (!body.title || !body.eyebrowText || !body.services) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await updateServices(body)
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error updating services:', error)
    return NextResponse.json({ error: 'Failed to update services' }, { status: 500 })
  }
}

// PUT /api/builder/services - Add a new service to existing data
export async function PUT(request: NextRequest) {
  try {
    const { service } = await request.json()
    
    if (!service || !service.title || !service.description) {
      return NextResponse.json({ error: 'Invalid service data' }, { status: 400 })
    }

    // Get current data
    const currentData = await getServicesData()
    
    if (!currentData) {
      return NextResponse.json({ error: 'No existing services data found' }, { status: 404 })
    }

    // Add new service
    const updatedData: ServicesData = {
      ...currentData,
      services: [...currentData.services, service]
    }

    const result = await updateServices(updatedData)
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error adding service:', error)
    return NextResponse.json({ error: 'Failed to add service' }, { status: 500 })
  }
}