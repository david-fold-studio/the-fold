// Fix SEO description length and add services field
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

async function fixSEOAndServices() {
  console.log('🔧 Fixing SEO description length and adding services...\n')
  
  const ENTRY_ID = '262d11f177e44c1fb7a87070e75d8ac7'
  const MDX_FILE_PATH = '/Users/daviddejong/Library/CloudStorage/OneDrive-TheFoldStudio/The Fold Studio/Sales & Marketing/Pitch Project/case-study-employwell.mdx'
  
  // Read the MDX content
  const fullContent = fs.readFileSync(MDX_FILE_PATH, 'utf8')
  console.log('📖 MDX content loaded:', fullContent.length, 'characters')
  
  // Optimized SEO description (under 160 characters)
  const optimizedSEODescription = "Strategic UX research helped Employwell avoid costly EHR delays, achieving +2 treatment cycles per clinic and 25% admin reduction."
  
  console.log('📏 SEO description length:', optimizedSEODescription.length, 'characters (should be under 160)')
  
  // Complete case study data with optimized SEO and services
  const optimizedData = {
    // Main content fields
    title: 'How UX Research & Product Strategy prevented Costly EHR Integration',
    description: 'When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a "foot in the door" approach that delivered immediate value while positioning for future growth. +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI.',
    
    // Media fields
    cover: 'https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2F594d26f16b68448a93628ae800ba5591',
    thumbnail: 'https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2F548514a971c043e38add0f91b01bfa03',
    
    // Navigation and categorization
    tags: ['Healthcare', 'UX Research', 'Product Strategy', 'EHR Integration', 'Startup', 'Fertility Care', 'Dashboard Design'],
    urlSlug: 'employwell-healthcare',
    
    // SEO fields - OPTIMIZED
    seoTitle: 'Employwell Healthcare UX Case Study - Strategic Research Prevents EHR Integration Delays | The Fold',
    seoDescription: optimizedSEODescription,
    seoTags: ['healthcare UX', 'EHR integration', 'healthcare startup', 'UX research', 'product strategy', 'fertility care', 'case study', 'dashboard design', 'healthcare software'],
    
    // Client and project info
    client: ['Employwell'],
    
    // Services - using tags format as you mentioned
    services: ['UX Research', 'Product Strategy', 'Information Architecture', 'Dashboard Design', 'User Experience Design', 'Healthcare UX'],
    
    // Full content
    content: fullContent
  }
  
  console.log('📊 Optimized data prepared:')
  console.log('- Title:', optimizedData.title)
  console.log('- Description length:', optimizedData.description.length)
  console.log('- URL Slug:', optimizedData.urlSlug)
  console.log('- Tags:', optimizedData.tags.join(', '))
  console.log('- SEO Title:', optimizedData.seoTitle)
  console.log('- SEO Description:', `"${optimizedData.seoDescription}" (${optimizedData.seoDescription.length} chars)`)
  console.log('- SEO Tags:', optimizedData.seoTags.join(', '))
  console.log('- Client:', optimizedData.client.join(', '))
  console.log('- Services:', optimizedData.services.join(', '))
  console.log('- Content length:', optimizedData.content.length)
  
  try {
    const result = await createOrUpdateContent(
      'case-studies',
      optimizedData,
      'Employwell Healthcare Case Study',
      ENTRY_ID
    )
    
    if (result) {
      console.log('\n🎉 Successfully optimized SEO and added services!')
      console.log('📊 Key improvements:')
      console.log(`  ✅ SEO description: ${optimizedSEODescription.length} characters (was 179, now under 160)`)
      console.log(`  ✅ Services added: ${optimizedData.services.length} services listed`)
      console.log('  ✅ All other fields preserved')
      
      console.log('\n🔍 Verification:')
      console.log('- 🌐 Visit: http://localhost:3007/case-studies/employwell-healthcare')
      console.log('- 🔧 Check Builder.io web interface for updated fields')
      console.log('- 🔍 View page source to see optimized meta description')
      console.log('- 👀 Client & Services sections should now both be populated')
      
      return { success: true, result }
    }
  } catch (error) {
    console.log('❌ Failed to optimize fields:', error.message)
    return { success: false, error }
  }
}

async function run() {
  console.log('🎯 Optimizing Employwell case study SEO and services...\n')
  
  const result = await fixSEOAndServices()
  
  if (result.success) {
    console.log('\n✅ Optimization complete!')
    console.log('💡 SEO description is now search-engine optimized')
    console.log('🛠️ Services field is now properly populated')
  } else {
    console.log('\n❌ Optimization failed')
  }
}

run()