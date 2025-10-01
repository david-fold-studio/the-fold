// Client-side API wrapper for Builder.io CMS operations
// This replaces the old ai-section-control.ts file and provides secure API access

// =======================
// AI SECTION CONTROL
// =======================

export interface AICommandResult {
  success: boolean
  message: string
  actions: string[]
}

export interface SectionOperationResult {
  success: boolean
  message: string
  pageId?: string
}

export interface BulkOperationResult {
  success: boolean
  results: Array<{
    slug: string
    success: boolean
    message: string
  }>
}

/**
 * Process natural language commands for section management
 * Example: "move testimonials to top of web development page"
 */
export async function processAICommand(command: string): Promise<AICommandResult> {
  try {
    const response = await fetch('/api/ai-section-control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'process-command', command })
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: `Failed to process command: ${error}`,
      actions: []
    }
  }
}

/**
 * Add a section to a service page
 */
export async function addSectionToServicePage(
  serviceSlug: string,
  sectionType: 'hero' | 'testimonials' | 'benefits' | 'case-studies' | 'pricing' | 'cta',
  options: {
    position?: number
    after?: string
    before?: string
    config?: Record<string, any>
  } = {}
): Promise<SectionOperationResult> {
  try {
    const response = await fetch('/api/ai-section-control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'add-section',
        serviceSlug,
        sectionType,
        options
      })
    })

    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: `Failed to add section: ${error}`
    }
  }
}

/**
 * Remove a section from a service page
 */
export async function removeSectionFromServicePage(
  serviceSlug: string,
  sectionType: string
): Promise<SectionOperationResult> {
  try {
    const response = await fetch('/api/ai-section-control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'remove-section',
        serviceSlug,
        sectionType
      })
    })

    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: `Failed to remove section: ${error}`
    }
  }
}

/**
 * Move a section on a service page
 */
export async function moveSectionOnServicePage(
  serviceSlug: string,
  sectionType: string,
  newPosition: number | 'top' | 'bottom'
): Promise<SectionOperationResult> {
  try {
    const response = await fetch('/api/ai-section-control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'move-section',
        serviceSlug,
        sectionType,
        newPosition
      })
    })

    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: `Failed to move section: ${error}`
    }
  }
}

/**
 * Get a service page by slug
 */
export async function getServicePage(slug: string) {
  try {
    const response = await fetch(`/api/ai-section-control?slug=${encodeURIComponent(slug)}`)
    return await response.json()
  } catch (error) {
    return { success: false, page: null }
  }
}

// =======================
// CMS CONTENT MANAGEMENT
// =======================

export interface CaseStudyData {
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
}

export interface TestimonialData {
  author: string
  company: string
  role: string
  content: string
  rating?: number
  project?: string
  tags?: string[]
}

export interface ServicePageData {
  service: string
  slug: string
  seoTitle?: string
  seoDescription?: string
  blocks?: any[]
}

/**
 * Create a new case study
 */
export async function createCaseStudy(caseStudyData: CaseStudyData) {
  try {
    const response = await fetch('/api/builder-cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'create-case-study',
        caseStudyData
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create case study')
    }

    return await response.json()
  } catch (error) {
    throw new Error(`Failed to create case study: ${error}`)
  }
}

/**
 * Update an existing case study
 */
export async function updateCaseStudy(entryId: string, updates: Partial<CaseStudyData>) {
  try {
    const response = await fetch('/api/builder-cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'update-case-study',
        entryId,
        updates
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update case study')
    }

    return await response.json()
  } catch (error) {
    throw new Error(`Failed to update case study: ${error}`)
  }
}

/**
 * Create a new testimonial
 */
export async function createTestimonial(testimonialData: TestimonialData) {
  try {
    const response = await fetch('/api/builder-cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'create-testimonial',
        testimonialData
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create testimonial')
    }

    return await response.json()
  } catch (error) {
    throw new Error(`Failed to create testimonial: ${error}`)
  }
}

/**
 * Create or update content in any model
 */
export async function createOrUpdateContent(
  modelName: string,
  data: any,
  name?: string,
  entryId?: string
) {
  try {
    const action = entryId ? 'update-content' : 'create-content'
    
    const response = await fetch('/api/builder-cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action,
        modelName,
        data,
        name,
        entryId
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to manage content')
    }

    return await response.json()
  } catch (error) {
    throw new Error(`Failed to manage content: ${error}`)
  }
}

/**
 * Delete content from any model
 */
export async function deleteContent(modelName: string, entryId: string) {
  try {
    const response = await fetch('/api/builder-cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'delete-content',
        modelName,
        entryId
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete content')
    }

    return await response.json()
  } catch (error) {
    throw new Error(`Failed to delete content: ${error}`)
  }
}

/**
 * Get content from any model
 */
export async function getContent(modelName: string, query?: Record<string, any>) {
  try {
    const params = new URLSearchParams({ model: modelName })
    if (query) {
      Object.keys(query).forEach(key => {
        if (query[key] !== undefined) {
          params.append(key, query[key].toString())
        }
      })
    }

    const response = await fetch(`/api/builder-cms?${params.toString()}`)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to get content')
    }

    return await response.json()
  } catch (error) {
    throw new Error(`Failed to get content: ${error}`)
  }
}

/**
 * Perform batch operations
 */
export async function batchOperation(operations: Array<{
  action: 'create' | 'update' | 'delete'
  modelName: string
  data?: any
  entryId?: string
  name?: string
}>) {
  try {
    const response = await fetch('/api/builder-cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'batch-operation',
        operations
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to perform batch operation')
    }

    return await response.json()
  } catch (error) {
    throw new Error(`Failed to perform batch operation: ${error}`)
  }
}