// Create a new Employwell case study from scratch using the correct field schema
const fs = require('fs')

const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
const MODEL_ID = '7974871d708e40cdacc287be71235a07'
const MDX_FILE_PATH = '/Users/daviddejong/Library/CloudStorage/OneDrive-TheFoldStudio/The Fold Studio/Sales & Marketing/Pitch Project/case-study-employwell.mdx'

async function createEmploywellCaseStudy() {
  try {
    console.log('📖 Reading MDX file...')
    const mdxContent = fs.readFileSync(MDX_FILE_PATH, 'utf8')
    console.log('✅ MDX content loaded:', mdxContent.length, 'characters')
    
    console.log('🚀 Creating new Employwell case study from scratch...')
    
    // Create entry data matching the Builder.io field schema exactly
    const entryData = {
      modelId: MODEL_ID,
      name: 'Employwell Healthcare Case Study',
      published: 'published',
      data: {
        // Main fields from schema
        title: 'How UX Research & Product Strategy prevented Costly EHR Integration',
        description: 'When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a \'foot in the door\' approach that delivered immediate value while positioning for future growth. +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI.',
        cover: 'https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2F594d26f16b68448a93628ae800ba5591',
        thumbnail: 'https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2F548514a971c043e38add0f91b01bfa03',
        tags: ['Healthcare', 'UX Research', 'Product Strategy', 'EHR Integration', 'Startup'],
        urlSlug: 'employwell-healthcare-new',
        
        // SEO fields
        seoTitle: 'Employwell Healthcare UX Case Study - The Fold',
        seoDescription: 'How strategic UX research helped Employwell avoid costly EHR integration delays and achieve +2 treatment cycles per clinic with 25% admin reduction.',
        seoTags: ['healthcare', 'ux research', 'product strategy', 'case study'],
        
        // Client and content
        client: ['Employwell'],
        content: mdxContent  // This should match the "Content" field in the schema
      }
    }
    
    console.log('📊 Entry data prepared:')
    console.log('- Title:', entryData.data.title)
    console.log('- URL Slug:', entryData.data.urlSlug)
    console.log('- Content length:', entryData.data.content.length)
    console.log('- Client:', entryData.data.client)
    
    // Create the entry via Builder.io API
    const response = await fetch('https://builder.io/api/v1/write', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entryData)
    })
    
    console.log('📡 Create response status:', response.status)
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()))
    
    const responseText = await response.text()
    console.log('📄 Response preview:', responseText.substring(0, 500))
    
    if (responseText.startsWith('{')) {
      const result = JSON.parse(responseText)
      console.log('✅ Entry created successfully!')
      console.log('🆔 New entry ID:', result.id)
      return result
    } else {
      console.log('❌ Got HTML response instead of JSON')
      return null
    }
    
  } catch (error) {
    console.error('❌ Error creating case study:', error.message)
    return null
  }
}

async function verifyNewEntry(entryId) {
  if (!entryId) return false
  
  try {
    console.log('\n🔍 Verifying new entry was created...')
    
    const response = await fetch(`https://builder.io/api/v1/content/${entryId}`, {
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
      }
    })
    
    const responseText = await response.text()
    
    if (responseText.startsWith('{')) {
      const data = JSON.parse(responseText)
      console.log('✅ Entry verified!')
      console.log('📋 Name:', data.name)
      console.log('📊 Data fields:', Object.keys(data.data || {}))
      console.log('📝 Has content:', !!data.data?.content)
      console.log('📏 Content length:', data.data?.content?.length || 0)
      return true
    } else {
      console.log('❌ Could not verify entry')
      return false
    }
    
  } catch (error) {
    console.error('❌ Verification error:', error.message)
    return false
  }
}

async function run() {
  const result = await createEmploywellCaseStudy()
  
  if (result && result.id) {
    console.log('✅ Case study creation successful!')
    await verifyNewEntry(result.id)
    console.log(`\n🌐 Case study should be available at: http://localhost:3007/case-studies/employwell-healthcare-new`)
  } else {
    console.log('❌ Failed to create case study')
  }
}

run()