// Builder.io CMS Management API - Server-side only for security
// Handles all content creation, updates, and management operations

import { NextRequest, NextResponse } from 'next/server'

const BUILDER_PRIVATE_KEY = process.env.BUILDER_PRIVATE_KEY || 'bpk-5fb282d3b27447389012cc30a1f21838'

// =======================
// CORE CMS OPERATIONS
// =======================

async function createOrUpdateContent(modelName: string, data: any, name?: string, id?: string) {
  try {
    if (!BUILDER_PRIVATE_KEY) {
      throw new Error('BUILDER_PRIVATE_KEY environment variable is required for write operations')
    }

    const url = id 
      ? `https://builder.io/api/v1/write/${modelName}/${id}`
      : `https://builder.io/api/v1/write/${modelName}`
    
    const method = id ? 'PUT' : 'POST'

    console.log(`🔗 ${method} ${url}`)
    console.log(`📋 Model: ${modelName}`)
    console.log(`📝 Name: ${name}`)
    console.log(`🆔 ID: ${id || 'none (creating new)'}`)

    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name || `${modelName}-${Date.now()}`,
        data,
        published: 'published' // Auto-publish the content
      })
    })

    console.log(`📡 Status: ${response.status}`)
    console.log(`📄 Content-Type: ${response.headers.get('content-type')}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.log(`❌ Error response: ${errorText}`)
      throw new Error(`Builder.io API error: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    console.log('✅ Success!')
    return result
  } catch (error) {
    console.error(`Error creating/updating ${modelName}:`, error)
    throw error
  }
}

async function deleteContent(modelName: string, id: string) {
  try {
    if (!BUILDER_PRIVATE_KEY) {
      throw new Error('BUILDER_PRIVATE_KEY environment variable is required for write operations')
    }

    const url = `https://builder.io/api/v1/write/${modelName}/${id}`
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Builder.io API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    return { success: true, message: `Deleted ${modelName} entry ${id}` }
  } catch (error) {
    console.error(`Error deleting ${modelName}:`, error)
    throw error
  }
}

async function getContent(modelName: string, query?: any) {
  try {
    const BUILDER_PUBLIC_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY || '4a242b8010c048df9c06392f47457ba0'
    
    let url = `https://builder.io/api/v1/content/${modelName}`
    if (query) {
      const params = new URLSearchParams()
      Object.keys(query).forEach(key => {
        if (query[key] !== undefined) {
          params.append(key, query[key].toString())
        }
      })
      url += `?${params.toString()}`
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${BUILDER_PUBLIC_KEY}`,
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`Builder.io API error: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error(`Error getting ${modelName} content:`, error)
    throw error
  }
}

// =======================
// CASE STUDY OPERATIONS
// =======================

async function createCaseStudy(caseStudyData: {
  title: string
  description: string
  urlSlug: string
  client: string[]
  services: string[]
  tags: string[]
  seoTitle: string
  seoDescription: string
  seoTags: string[]
  cover?: string
  thumbnail?: string
  content: string
}) {
  // Validate required fields
  if (!caseStudyData.title || !caseStudyData.description || !caseStudyData.urlSlug) {
    throw new Error('Missing required fields: title, description, or urlSlug')
  }

  // Validate SEO description length
  if (caseStudyData.seoDescription.length > 160) {
    throw new Error(`SEO description too long: ${caseStudyData.seoDescription.length} characters (max 160)`)
  }

  return await createOrUpdateContent(
    'case-studies',
    caseStudyData,
    `${caseStudyData.title} - Case Study`
  )
}

async function updateCaseStudy(entryId: string, updates: any) {
  // Validate SEO description if provided
  if (updates.seoDescription && updates.seoDescription.length > 160) {
    throw new Error(`SEO description too long: ${updates.seoDescription.length} characters (max 160)`)
  }

  return await createOrUpdateContent(
    'case-studies',
    updates,
    updates.title ? `${updates.title} - Case Study` : undefined,
    entryId
  )
}

// =======================
// TESTIMONIAL OPERATIONS
// =======================

async function createTestimonial(testimonialData: {
  author: string
  company: string
  role: string
  content: string
  rating?: number
  project?: string
  tags?: string[]
}) {
  return await createOrUpdateContent(
    'testimonials',
    testimonialData,
    `${testimonialData.author} - ${testimonialData.company} Testimonial`
  )
}

// =======================
// SERVICE PAGE OPERATIONS  
// =======================

async function createServicePage(serviceData: {
  service: string
  slug: string
  seoTitle?: string
  seoDescription?: string
  blocks?: any[]
}) {
  return await createOrUpdateContent(
    'service-pages',
    serviceData,
    `${serviceData.service} Service Page`
  )
}

// =======================
// BATCH OPERATIONS
// =======================

async function batchOperation(operations: Array<{
  action: 'create' | 'update' | 'delete'
  modelName: string
  data?: any
  entryId?: string
  name?: string
}>) {
  const results = []
  
  for (const op of operations) {
    try {
      let result
      switch (op.action) {
        case 'create':
          result = await createOrUpdateContent(op.modelName, op.data, op.name)
          break
        case 'update':
          result = await createOrUpdateContent(op.modelName, op.data, op.name, op.entryId)
          break
        case 'delete':
          result = await deleteContent(op.modelName, op.entryId!)
          break
        default:
          throw new Error(`Unknown action: ${op.action}`)
      }
      
      results.push({
        success: true,
        operation: op,
        result
      })
    } catch (error) {
      results.push({
        success: false,
        operation: op,
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }
  
  return {
    success: results.some(r => r.success),
    results,
    successCount: results.filter(r => r.success).length,
    failureCount: results.filter(r => !r.success).length
  }
}

// =======================
// API ROUTE HANDLERS
// =======================

export async function POST(request: NextRequest) {
  try {
    if (!BUILDER_PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'Builder.io private key not configured' }, 
        { status: 500 }
      )
    }

    const body = await request.json()
    const { action, ...params } = body

    switch (action) {
      case 'create-content':
        const createResult = await createOrUpdateContent(
          params.modelName,
          params.data,
          params.name
        )
        return NextResponse.json({ success: true, result: createResult })

      case 'update-content':
        const updateResult = await createOrUpdateContent(
          params.modelName,
          params.data,
          params.name,
          params.entryId
        )
        return NextResponse.json({ success: true, result: updateResult })

      case 'delete-content':
        const deleteResult = await deleteContent(params.modelName, params.entryId)
        return NextResponse.json({ success: true, result: deleteResult })

      case 'create-case-study':
        const caseStudyResult = await createCaseStudy(params.caseStudyData)
        return NextResponse.json({ success: true, result: caseStudyResult })

      case 'update-case-study':
        const updateCaseStudyResult = await updateCaseStudy(params.entryId, params.updates)
        return NextResponse.json({ success: true, result: updateCaseStudyResult })

      case 'create-testimonial':
        const testimonialResult = await createTestimonial(params.testimonialData)
        return NextResponse.json({ success: true, result: testimonialResult })

      case 'create-service-page':
        const servicePageResult = await createServicePage(params.serviceData)
        return NextResponse.json({ success: true, result: servicePageResult })

      case 'batch-operation':
        const batchResult = await batchOperation(params.operations)
        return NextResponse.json({ success: true, result: batchResult })

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: create-content, update-content, delete-content, create-case-study, update-case-study, create-testimonial, create-service-page, or batch-operation' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Builder CMS API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const modelName = searchParams.get('model')
  
  if (!modelName) {
    return NextResponse.json(
      { error: 'Missing required parameter: model' },
      { status: 400 }
    )
  }

  try {
    // Build query object from search params
    const query: any = {}
    searchParams.forEach((value, key) => {
      if (key !== 'model') {
        query[key] = value
      }
    })

    const content = await getContent(modelName, Object.keys(query).length > 0 ? query : undefined)
    return NextResponse.json({ success: true, content })
  } catch (error) {
    console.error('Error getting content:', error)
    return NextResponse.json(
      { error: 'Failed to get content' },
      { status: 500 }
    )
  }
}