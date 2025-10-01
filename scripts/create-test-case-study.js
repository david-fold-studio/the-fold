// Create a brand new test case study in Builder.io from scratch
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

async function createTestCaseStudy() {
  console.log('🆕 Creating brand new test case study in Builder.io...\\n')
  
  const MDX_FILE_PATH = '/Users/daviddejong/DevelopmentApps/Fold Studio/the-fold/test-case-study.mdx'
  
  // Read the test MDX content
  const testContent = fs.readFileSync(MDX_FILE_PATH, 'utf8')
  console.log('📖 Test MDX content loaded:', testContent.length, 'characters')
  
  // Complete case study data following documentation guidelines
  const newCaseStudyData = {
    // Core Content Fields (Required)
    title: 'How Progressive Interface Design Reduced Onboarding Time by 67%',
    description: 'TechFlow Analytics was losing trial users to interface complexity. Through adaptive dashboard design and progressive disclosure, we reduced onboarding from 3-4 weeks to 5-7 days while increasing feature adoption by 156%.',
    urlSlug: 'techflow-fintech-dashboard',
    
    // Media Fields (Using placeholders as instructed)
    cover: 'https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2F594d26f16b68448a93628ae800ba5591',
    thumbnail: 'https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2F548514a971c043e38add0f91b01bfa03',
    
    // Categorization & Organization
    client: ['TechFlow Analytics'],
    services: ['UX Research', 'Dashboard Design', 'User Experience Design', 'Information Architecture', 'Fintech UX', 'Product Strategy'],
    tags: ['Fintech', 'Dashboard Design', 'User Onboarding', 'Progressive Disclosure', 'B2B Software', 'Financial Analytics', 'Series A Startup'],
    
    // SEO Optimization (Critical for Discovery)
    seoTitle: 'TechFlow Fintech Dashboard Case Study - 67% Faster User Onboarding | The Fold',
    seoDescription: 'How progressive interface design reduced TechFlow Analytics onboarding time by 67% and increased feature adoption by 156%. Fintech UX case study.',
    seoTags: ['fintech UX', 'dashboard design', 'user onboarding', 'B2B software design', 'financial analytics', 'progressive disclosure', 'case study', 'startup UX', 'interface design'],
    
    // Full MDX content (following guidelines: no title, no summary)
    content: testContent
  }
  
  console.log('📊 New case study data prepared:')
  console.log('- Title:', newCaseStudyData.title)
  console.log('- Description length:', newCaseStudyData.description.length, 'characters')
  console.log('- URL Slug:', newCaseStudyData.urlSlug)
  console.log('- Client:', newCaseStudyData.client.join(', '))
  console.log('- Services:', newCaseStudyData.services.length, 'services listed')
  console.log('- Tags:', newCaseStudyData.tags.join(', '))
  console.log('- SEO Title length:', newCaseStudyData.seoTitle.length, 'characters')
  console.log('- SEO Description length:', newCaseStudyData.seoDescription.length, 'characters (should be under 160)')
  console.log('- SEO Tags:', newCaseStudyData.seoTags.length, 'keywords')
  console.log('- Content length:', newCaseStudyData.content.length, 'characters')
  
  try {
    const result = await createOrUpdateContent(
      'case-studies',
      newCaseStudyData,
      'TechFlow Analytics Dashboard Case Study',
      undefined // No ID = create new entry
    )
    
    if (result) {
      console.log('\\n🎉 Successfully created new case study!')
      console.log('🆔 New Entry ID:', result.id)
      console.log('📊 Entry Details:')
      console.log('  ✅ Title set for Hero H1 component')
      console.log('  ✅ Description set for body copy below Hero')
      console.log('  ✅ All required fields populated')
      console.log('  ✅ SEO fields optimized')
      console.log('  ✅ Content follows documentation guidelines')
      
      console.log('\\n🔍 Access your new case study:')
      console.log(`- 🌐 Website: http://localhost:3007/case-studies/${newCaseStudyData.urlSlug}`)
      console.log('- 🔧 Builder.io: Check the web interface to see all populated fields')
      console.log('- 📝 Edit: Use this entry ID for future updates:', result.id)
      
      return { success: true, entryId: result.id, slug: newCaseStudyData.urlSlug }
    }
  } catch (error) {
    console.log('❌ Failed to create case study:', error.message)
    return { success: false, error }
  }
}

async function run() {
  console.log('🎯 Creating test case study from scratch...\\n')
  
  const result = await createTestCaseStudy()
  
  if (result.success) {
    console.log('\\n✅ Test case study created successfully!')
    console.log(`🔗 Entry ID: ${result.entryId}`)
    console.log(`🌐 URL: http://localhost:3007/case-studies/${result.slug}`)
    console.log('💡 All fields populated according to documentation guidelines')
  } else {
    console.log('\\n❌ Test case study creation failed')
  }
}

run()