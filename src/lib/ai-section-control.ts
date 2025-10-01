// DEPRECATED: This file has been replaced by secure API routes
// Use /src/lib/cms-api.ts for client-side operations
// Private keys are now handled server-side in /src/app/api/

// This file is kept for backwards compatibility but should not be used
console.warn('⚠️ ai-section-control.ts is deprecated. Use cms-api.ts instead for secure operations.')

const headers = {
  'Authorization': `Bearer process.env.BUILDER_PRIVATE_KEY`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

// Types for section management
export interface SectionBlock {
  '@type': '@builder.io/sdk:Element'
  component?: {
    name: string
    options: Record<string, any>
  }
  id?: string
}

export interface ServicePageData {
  id: string
  name: string
  data: {
    service: string
    slug: string
    seoTitle?: string
    seoDescription?: string
    blocks?: SectionBlock[]
  }
}

// =======================
// CORE PAGE MANAGEMENT
// =======================

/**
 * Get a service page by slug
 */
export async function getServicePage(slug: string): Promise<ServicePageData | null> {
  try {
    const response = await fetch(`https://builder.io/api/v1/content/service-pages?query.data.slug=${slug}&limit=1`, {
      headers: { 'Authorization': `Bearer ${process.env.BUILDER_PRIVATE_KEY}` }
    })
    
    if (!response.ok) return null
    
    const data = await response.json()
    return data.results?.[0] || null
  } catch (error) {
    console.error('Error getting service page:', error)
    return null
  }
}

/**
 * Update a service page
 */
export async function updateServicePage(pageId: string, updates: Partial<ServicePageData['data']>): Promise<boolean> {
  try {
    const response = await fetch(`https://builder.io/api/v1/write/content/service-pages/${pageId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        data: updates,
        published: 'published'
      })
    })
    
    return response.ok
  } catch (error) {
    console.error('Error updating service page:', error)
    return false
  }
}

// =======================
// SECTION MANAGEMENT
// =======================

/**
 * Add a section to a service page
 * Example: "Add testimonials section after hero on web development page"
 */
export async function addSectionToServicePage(
  serviceSlug: string,
  sectionType: 'hero' | 'testimonials' | 'benefits' | 'case-studies' | 'pricing' | 'cta',
  options: {
    position?: number // 0 = first, undefined = last
    after?: string    // Insert after section with this name
    before?: string   // Insert before section with this name
    config?: Record<string, any> // Section-specific configuration
  } = {}
): Promise<{ success: boolean; message: string; pageId?: string }> {
  
  const page = await getServicePage(serviceSlug)
  if (!page) {
    return { success: false, message: `Service page '${serviceSlug}' not found` }
  }
  
  const blocks = page.data.blocks || []
  
  // Create new section block
  const newSection: SectionBlock = {
    '@type': '@builder.io/sdk:Element',
    component: {
      name: getSectionComponentName(sectionType),
      options: {
        sectionId: sectionType,
        ...options.config
      }
    },
    id: `${sectionType}-${Date.now()}`
  }
  
  // Determine insertion position
  let insertIndex = blocks.length // Default: add at end
  
  if (options.position !== undefined) {
    insertIndex = Math.max(0, Math.min(options.position, blocks.length))
  } else if (options.after) {
    const afterIndex = blocks.findIndex(block => 
      block.component?.name?.toLowerCase().includes(options.after!) ||
      block.component?.options?.sectionId === options.after
    )
    insertIndex = afterIndex >= 0 ? afterIndex + 1 : blocks.length
  } else if (options.before) {
    const beforeIndex = blocks.findIndex(block => 
      block.component?.name?.toLowerCase().includes(options.before!) ||
      block.component?.options?.sectionId === options.before
    )
    insertIndex = beforeIndex >= 0 ? beforeIndex : blocks.length
  }
  
  // Insert the section
  const updatedBlocks = [...blocks]
  updatedBlocks.splice(insertIndex, 0, newSection)
  
  // Update the page
  const success = await updateServicePage(page.id, { 
    ...page.data,
    blocks: updatedBlocks
  })
  
  return {
    success,
    message: success 
      ? `Added ${sectionType} section to ${serviceSlug} page at position ${insertIndex}`
      : `Failed to add ${sectionType} section to ${serviceSlug} page`,
    pageId: success ? page.id : undefined
  }
}

/**
 * Remove a section from a service page
 * Example: "Remove pricing section from consulting page"
 */
export async function removeSectionFromServicePage(
  serviceSlug: string,
  sectionType: string
): Promise<{ success: boolean; message: string }> {
  
  const page = await getServicePage(serviceSlug)
  if (!page) {
    return { success: false, message: `Service page '${serviceSlug}' not found` }
  }
  
  const blocks = page.data.blocks || []
  const updatedBlocks = blocks.filter(block => 
    !block.component?.name?.toLowerCase().includes(sectionType.toLowerCase()) &&
    block.component?.options?.sectionId !== sectionType
  )
  
  if (updatedBlocks.length === blocks.length) {
    return { success: false, message: `Section '${sectionType}' not found on ${serviceSlug} page` }
  }
  
  const success = await updateServicePage(page.id, {
    ...page.data,
    blocks: updatedBlocks
  })
  
  return {
    success,
    message: success 
      ? `Removed ${sectionType} section from ${serviceSlug} page`
      : `Failed to remove ${sectionType} section from ${serviceSlug} page`
  }
}

/**
 * Reorder sections on a service page  
 * Example: "Move testimonials section to top of web development page"
 */
export async function moveSectionOnServicePage(
  serviceSlug: string,
  sectionType: string,
  newPosition: number | 'top' | 'bottom'
): Promise<{ success: boolean; message: string }> {
  
  const page = await getServicePage(serviceSlug)
  if (!page) {
    return { success: false, message: `Service page '${serviceSlug}' not found` }
  }
  
  const blocks = page.data.blocks || []
  
  // Find the section to move
  const sectionIndex = blocks.findIndex(block => 
    block.component?.name?.toLowerCase().includes(sectionType.toLowerCase()) ||
    block.component?.options?.sectionId === sectionType
  )
  
  if (sectionIndex === -1) {
    return { success: false, message: `Section '${sectionType}' not found on ${serviceSlug} page` }
  }
  
  // Calculate new position
  let targetPosition: number
  if (newPosition === 'top') {
    targetPosition = 0
  } else if (newPosition === 'bottom') {
    targetPosition = blocks.length - 1
  } else {
    targetPosition = Math.max(0, Math.min(newPosition, blocks.length - 1))
  }
  
  // Move the section
  const updatedBlocks = [...blocks]
  const [sectionToMove] = updatedBlocks.splice(sectionIndex, 1)
  updatedBlocks.splice(targetPosition, 0, sectionToMove)
  
  const success = await updateServicePage(page.id, {
    ...page.data,
    blocks: updatedBlocks
  })
  
  return {
    success,
    message: success 
      ? `Moved ${sectionType} section to position ${targetPosition} on ${serviceSlug} page`
      : `Failed to move ${sectionType} section on ${serviceSlug} page`
  }
}

// =======================
// BULK OPERATIONS
// =======================

/**
 * Apply section changes to multiple service pages
 * Example: "Add case studies section to all development service pages"
 */
export async function bulkUpdateServicePages(
  serviceFilter: string[] | 'all',
  operation: 'add' | 'remove' | 'move',
  sectionType: string,
  options?: any
): Promise<{ success: boolean; results: Array<{ slug: string; success: boolean; message: string }> }> {
  
  // Get all service pages or filtered ones
  let targetSlugs: string[]
  
  if (serviceFilter === 'all') {
    // Get all service slugs from your services content model
    targetSlugs = ['web-development', 'ui-ux-design', 'digital-strategy', 'e-commerce', 'mobile-app', 'seo-optimization']
  } else {
    targetSlugs = serviceFilter
  }
  
  const results = []
  
  for (const slug of targetSlugs) {
    let result
    
    switch (operation) {
      case 'add':
        result = await addSectionToServicePage(slug, sectionType as any, options)
        break
      case 'remove':
        result = await removeSectionFromServicePage(slug, sectionType)
        break
      case 'move':
        result = await moveSectionOnServicePage(slug, sectionType, options?.position || 'top')
        break
      default:
        result = { success: false, message: 'Unknown operation' }
    }
    
    results.push({
      slug,
      success: result.success,
      message: result.message
    })
  }
  
  const successCount = results.filter(r => r.success).length
  
  return {
    success: successCount > 0,
    results
  }
}

// =======================
// HELPER FUNCTIONS
// =======================

function getSectionComponentName(sectionType: string): string {
  const componentMap: Record<string, string> = {
    'hero': 'Enhanced Hero Section',
    'testimonials': 'Smart Testimonials Section', 
    'benefits': 'Smart Benefits Section',
    'case-studies': 'Smart Case Studies Section',
    'pricing': 'Smart Pricing Section',
    'cta': 'Smart CTA Section'
  }
  
  return componentMap[sectionType] || 'Enhanced Hero Section'
}

// =======================
// NATURAL LANGUAGE INTERFACE
// =======================

/**
 * Process natural language commands for section management
 * This is what enables "move testimonials to top of web dev page"
 */
export async function processAICommand(command: string): Promise<{ success: boolean; message: string; actions: string[] }> {
  const cmd = command.toLowerCase()
  const actions: string[] = []
  
  try {
    // Parse common command patterns
    if (cmd.includes('move') && cmd.includes('to top')) {
      const sectionMatch = cmd.match(/(testimonials|hero|benefits|case studies|pricing|cta)/)
      const pageMatch = cmd.match(/(web development|ui.*ux|design|consulting|e-commerce|mobile)/)
      
      if (sectionMatch && pageMatch) {
        const section = sectionMatch[1].replace(' ', '-')
        const slug = pageMatch[1].includes('web') ? 'web-development' : 
                    pageMatch[1].includes('design') ? 'ui-ux-design' : 'consulting'
        
        const result = await moveSectionOnServicePage(slug, section, 'top')
        actions.push(`Moved ${section} to top of ${slug} page`)
        
        return {
          success: result.success,
          message: result.message,
          actions
        }
      }
    }
    
    if (cmd.includes('add') && cmd.includes('after')) {
      const sectionMatch = cmd.match(/(testimonials|hero|benefits|case studies|pricing|cta)/)
      const afterMatch = cmd.match(/after\s+(testimonials|hero|benefits|case studies|pricing|cta)/)
      const pageMatch = cmd.match(/(web development|ui.*ux|design|consulting|e-commerce|mobile)/)
      
      if (sectionMatch && afterMatch && pageMatch) {
        const section = sectionMatch[1].replace(' ', '-')
        const afterSection = afterMatch[1].replace(' ', '-')
        const slug = pageMatch[1].includes('web') ? 'web-development' : 
                    pageMatch[1].includes('design') ? 'ui-ux-design' : 'consulting'
        
        const result = await addSectionToServicePage(slug, section as any, { after: afterSection })
        actions.push(`Added ${section} after ${afterSection} on ${slug} page`)
        
        return {
          success: result.success,
          message: result.message,
          actions
        }
      }
    }
    
    if (cmd.includes('hide') || cmd.includes('remove')) {
      const sectionMatch = cmd.match(/(testimonials|hero|benefits|case studies|pricing|cta)/)
      const pageMatch = cmd.match(/(web development|ui.*ux|design|consulting|e-commerce|mobile)/)
      
      if (sectionMatch && pageMatch) {
        const section = sectionMatch[1].replace(' ', '-')
        const slug = pageMatch[1].includes('web') ? 'web-development' : 
                    pageMatch[1].includes('design') ? 'ui-ux-design' : 'consulting'
        
        const result = await removeSectionFromServicePage(slug, section)
        actions.push(`Removed ${section} from ${slug} page`)
        
        return {
          success: result.success,
          message: result.message,
          actions
        }
      }
    }
    
    return {
      success: false,
      message: `I couldn't understand the command: "${command}". Try commands like "move testimonials to top of web development page" or "add case studies after benefits on design page"`,
      actions
    }
    
  } catch (error) {
    return {
      success: false,
      message: `Error processing command: ${error}`,
      actions
    }
  }
}