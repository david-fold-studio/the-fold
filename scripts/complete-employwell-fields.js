// Complete all fields for the Employwell case study
const fs = require('fs')

// Copy the exact function from builder.ts
async function createOrUpdateContent(modelName, data, name, id) {
  try {
    const privateKey = 'bpk-5fb282d3b27447389012cc30a1f21838'
    if (!privateKey) {
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
        'Authorization': `Bearer ${privateKey}`,
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

async function updateEmploywellWithAllFields() {
  console.log('🔧 Updating Employwell case study with all proper fields...\n')
  
  const ENTRY_ID = '262d11f177e44c1fb7a87070e75d8ac7'
  const MDX_FILE_PATH = '/Users/daviddejong/Library/CloudStorage/OneDrive-TheFoldStudio/The Fold Studio/Sales & Marketing/Pitch Project/case-study-employwell.mdx'
  
  // Read the MDX content
  const fullContent = fs.readFileSync(MDX_FILE_PATH, 'utf8')
  console.log('📖 MDX content loaded:', fullContent.length, 'characters')
  
  // Complete case study data with all fields properly filled
  const completeData = {
    // Main content fields
    title: 'How UX Research & Product Strategy prevented Costly EHR Integration',
    description: 'When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a "foot in the door" approach that delivered immediate value while positioning for future growth. +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI.',
    
    // Media fields
    cover: 'https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2F594d26f16b68448a93628ae800ba5591',
    thumbnail: 'https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2F548514a971c043e38add0f91b01bfa03',
    
    // Navigation and categorization
    tags: ['Healthcare', 'UX Research', 'Product Strategy', 'EHR Integration', 'Startup', 'Fertility Care', 'Dashboard Design'],
    urlSlug: 'employwell-healthcare',
    
    // SEO fields
    seoTitle: 'Employwell Healthcare UX Case Study - Strategic Research Prevents EHR Integration Delays | The Fold',
    seoDescription: 'How strategic UX research helped Employwell avoid costly EHR integration delays and achieve +2 treatment cycles per clinic with 25% admin reduction. Healthcare startup case study.',
    seoTags: ['healthcare UX', 'EHR integration', 'healthcare startup', 'UX research', 'product strategy', 'fertility care', 'case study', 'dashboard design', 'healthcare software'],
    
    // Client and project info
    client: ['Employwell'],
    
    // Full content
    content: fullContent
  }
  
  console.log('📊 Complete data prepared:')
  console.log('- Title:', completeData.title)
  console.log('- Description length:', completeData.description.length)
  console.log('- URL Slug:', completeData.urlSlug)
  console.log('- Tags:', completeData.tags.join(', '))
  console.log('- SEO Title:', completeData.seoTitle)
  console.log('- SEO Description length:', completeData.seoDescription.length)
  console.log('- SEO Tags:', completeData.seoTags.join(', '))
  console.log('- Client:', completeData.client.join(', '))
  console.log('- Content length:', completeData.content.length)
  console.log('- Cover image:', completeData.cover ? 'Set' : 'Missing')
  console.log('- Thumbnail image:', completeData.thumbnail ? 'Set' : 'Missing')
  
  try {
    const result = await createOrUpdateContent(
      'case-studies',
      completeData,
      'Employwell Healthcare Case Study',
      ENTRY_ID
    )
    
    if (result) {
      console.log('\n🎉 Successfully updated all fields!')
      console.log('📊 Updated fields in Builder.io:')
      if (result.data) {
        Object.keys(result.data).forEach(key => {
          const value = result.data[key]
          const preview = typeof value === 'string' && value.length > 100 
            ? value.substring(0, 100) + '...' 
            : value
          console.log(`  - ${key}: ${Array.isArray(preview) ? preview.join(', ') : preview}`)
        })
      }
      
      console.log('\n🌐 Case study updated at: http://localhost:3007/case-studies/employwell-healthcare')
      console.log('✅ All fields should now be properly populated in Builder.io!')
      
      return { success: true, result }
    }
  } catch (error) {
    console.log('❌ Failed to update fields:', error.message)
    return { success: false, error }
  }
}

async function verifyFields() {
  console.log('\n🔍 You can verify the fields are populated by:')
  console.log('1. 🌐 Visiting the case study page: http://localhost:3007/case-studies/employwell-healthcare')
  console.log('2. 🔧 Checking Builder.io web interface to see all fields are filled')
  console.log('3. 🔍 Looking at the page source to see proper meta tags and SEO data')
}

async function run() {
  const result = await updateEmploywellWithAllFields()
  
  if (result.success) {
    await verifyFields()
  }
}

run()