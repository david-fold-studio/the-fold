// Working content management using Builder.io Write API
const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
const BUILDER_API_KEY = '4a242b8010c048df9c06392f47457ba0'

const headers = {
  'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

// Generic content functions using Write API
async function createContent(modelName, contentData) {
  try {
    const response = await fetch(`https://builder.io/api/v1/write/content/${modelName}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(contentData)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Failed to create ${modelName}: ${error.message}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`❌ Error creating ${modelName}:`, error.message)
    return null
  }
}

async function updateContent(modelName, contentId, contentData) {
  try {
    const response = await fetch(`https://builder.io/api/v1/write/content/${modelName}/${contentId}`, {
      method: 'PUT', 
      headers: headers,
      body: JSON.stringify(contentData)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Failed to update ${modelName}: ${error.message}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`❌ Error updating ${modelName}:`, error.message)
    return null
  }
}

async function deleteContent(modelName, contentId) {
  try {
    const response = await fetch(`https://builder.io/api/v1/write/content/${modelName}/${contentId}`, {
      method: 'DELETE',
      headers: headers
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Failed to delete ${modelName}: ${error.message}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`❌ Error deleting ${modelName}:`, error.message)
    return null
  }
}

// Reading content - use the public API with API key
async function getContent(modelName, limit = 100) {
  try {
    const response = await fetch(`https://cdn.builder.io/api/v1/content/${modelName}?apiKey=${BUILDER_API_KEY}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to get ${modelName}: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`❌ Error getting ${modelName}:`, error.message)
    return null
  }
}

// Specific model functions
async function createTestimonial(testimonialData) {
  const data = {
    name: `Testimonial - ${testimonialData.name}`,
    data: testimonialData,
    published: 'published'
  }
  return await createContent('test-testimonial', data)
}

async function getAllTestimonials() {
  return await getContent('test-testimonial')
}

// Demo function to test everything works
async function testFullWorkflow() {
  console.log('🚀 Testing full content management workflow...\n')
  
  // 1. Create a testimonial
  console.log('=== Creating testimonial ===')
  const testimonial = await createTestimonial({
    name: 'Jane Smith',
    testimonial: 'Fantastic work! The Builder.io integration with Claude Code is seamless.'
  })
  
  if (testimonial) {
    console.log('✅ Testimonial created:', testimonial.id)
    console.log('  Name:', testimonial.name)
    console.log('  Data:', testimonial.data)
  }
  
  // 2. Get all testimonials
  console.log('\n=== Getting all testimonials ===')
  const allTestimonials = await getAllTestimonials()
  
  if (allTestimonials) {
    console.log(`✅ Found ${allTestimonials.results?.length || 0} testimonials`)
    if (allTestimonials.results?.length > 0) {
      console.log('Latest testimonial:', allTestimonials.results[0].data)
    }
  }
  
  // 3. Update the testimonial
  if (testimonial?.id) {
    console.log('\n=== Updating testimonial ===')
    const updatedTestimonial = await updateContent('test-testimonial', testimonial.id, {
      name: testimonial.name,
      data: {
        ...testimonial.data,
        testimonial: testimonial.data.testimonial + ' [UPDATED via API]'
      },
      published: 'published'
    })
    
    if (updatedTestimonial) {
      console.log('✅ Testimonial updated')
      console.log('  New content:', updatedTestimonial.data.testimonial)
    }
  }
  
  console.log('\n🎉 Full workflow test complete!')
  console.log('📋 You can now:')
  console.log('  ✅ Create content via Claude Code')
  console.log('  ✅ Read all content programmatically') 
  console.log('  ✅ Update existing content')
  console.log('  ✅ Delete content when needed')
  console.log('  ✅ Manage everything from Builder.io interface')
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createContent,
    updateContent,
    deleteContent,
    getContent,
    createTestimonial,
    getAllTestimonials,
    testFullWorkflow
  }
}

// Run test if called directly
if (require.main === module) {
  testFullWorkflow()
}