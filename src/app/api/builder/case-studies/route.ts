import { NextRequest, NextResponse } from 'next/server'
import { getCaseStudiesData, updateCaseStudies } from '@/lib/builder'
import type { CaseStudiesData, CaseStudyData } from '@/lib/data/types'

// GET /api/builder/case-studies - Fetch case studies from Builder.io
export async function GET() {
  try {
    const data = await getCaseStudiesData()
    
    if (!data) {
      return NextResponse.json({ error: 'No case studies data found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching case studies:', error)
    return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 })
  }
}

// POST /api/builder/case-studies - Create/update case studies in Builder.io
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CaseStudiesData
    
    // Validate required fields
    if (!body.title || !body.eyebrowText || !body.studies) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await updateCaseStudies(body)
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error updating case studies:', error)
    return NextResponse.json({ error: 'Failed to update case studies' }, { status: 500 })
  }
}

// PUT /api/builder/case-studies - Add a new case study to existing data
export async function PUT(request: NextRequest) {
  try {
    const { caseStudy } = await request.json()
    
    if (!caseStudy || !caseStudy.title || !caseStudy.description) {
      return NextResponse.json({ error: 'Invalid case study data' }, { status: 400 })
    }

    // Get current data
    const currentData = await getCaseStudiesData()
    
    if (!currentData) {
      // If no existing data, create initial structure
      const initialData: CaseStudiesData = {
        eyebrowText: "Case Studies",
        title: "Our Work",
        paragraphs: ["Explore our portfolio of successful projects."],
        studies: [caseStudy]
      }
      
      const result = await updateCaseStudies(initialData)
      return NextResponse.json({ success: true, data: result })
    }

    // Add new case study
    const updatedData: CaseStudiesData = {
      ...currentData,
      studies: [...currentData.studies, caseStudy]
    }

    const result = await updateCaseStudies(updatedData)
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error adding case study:', error)
    return NextResponse.json({ error: 'Failed to add case study' }, { status: 500 })
  }
}