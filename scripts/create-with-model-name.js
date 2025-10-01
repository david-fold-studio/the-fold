// Create using model name instead of model ID
const fs = require('fs')

const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
const MODEL_NAME = 'case-studies' // Use model name instead of ID
const MDX_FILE_PATH = '/Users/daviddejong/Library/CloudStorage/OneDrive-TheFoldStudio/The Fold Studio/Sales & Marketing/Pitch Project/case-study-employwell.mdx'

async function createEmploywellCaseStudyWithModelName() {
  try {
    console.log('📖 Reading MDX file...')
    const mdxContent = fs.readFileSync(MDX_FILE_PATH, 'utf8')
    console.log('✅ MDX content loaded:', mdxContent.length, 'characters')
    
    console.log('🚀 Creating new Employwell case study using model name...')
    
    // Create entry data for the case-studies model
    const entryData = {
      model: MODEL_NAME,
      name: 'Employwell Healthcare Case Study - Test',
      published: 'published',
      data: {
        title: 'How UX Research & Product Strategy prevented Costly EHR Integration',
        description: 'When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a \'foot in the door\' approach that delivered immediate value while positioning for future growth. +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI.',
        cover: 'https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2F594d26f16b68448a93628ae800ba5591',
        thumbnail: 'https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2F548514a971c043e38add0f91b01bfa03',
        tags: ['Healthcare', 'UX Research', 'Product Strategy'],
        urlSlug: 'employwell-healthcare-test',
        seoTitle: 'Employwell Healthcare UX Case Study - The Fold',
        seoDescription: 'How strategic UX research helped Employwell avoid costly EHR integration delays.',
        seoTags: ['healthcare', 'ux research'],
        client: ['Employwell'],
        content: mdxContent
      }
    }
    
    console.log('📊 Entry data prepared for model:', MODEL_NAME)
    console.log('- Title:', entryData.data.title)
    console.log('- URL Slug:', entryData.data.urlSlug)
    console.log('- Content length:', entryData.data.content.length)
    
    // Try different Builder.io API endpoints
    const endpoints = [
      'https://builder.io/api/v1/write',
      `https://builder.io/api/v1/content/${MODEL_NAME}`,
      `https://builder.io/api/v2/content/${MODEL_NAME}`,
      'https://builder.io/api/v3/content'
    ]
    
    for (const endpoint of endpoints) {
      console.log(`\n🔗 Trying endpoint: ${endpoint}`)
      
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entryData)
        })
        
        console.log('📡 Status:', response.status)
        const responseText = await response.text()
        console.log('📄 Response preview:', responseText.substring(0, 300))
        
        if (response.status >= 200 && response.status < 300) {
          if (responseText.startsWith('{')) {
            const result = JSON.parse(responseText)
            console.log('✅ Success with endpoint:', endpoint)
            console.log('🆔 Entry ID:', result.id)
            return result
          }
        }
        
      } catch (endpointError) {
        console.log('❌ Error with endpoint:', endpointError.message)
      }
    }
    
    console.log('❌ All endpoints failed')
    return null
    
  } catch (error) {
    console.error('❌ Error creating case study:', error.message)
    return null
  }
}

async function run() {
  const result = await createEmploywellCaseStudyWithModelName()
  
  if (result && result.id) {
    console.log('\n✅ Case study created successfully!')
    console.log('🆔 Entry ID:', result.id)
    console.log(`🌐 Should be available at: http://localhost:3007/case-studies/employwell-healthcare-test`)
  } else {
    console.log('\n❌ Failed to create case study with all endpoints')
    console.log('💡 You may need to create this manually in the Builder.io web interface')
  }
}

run()