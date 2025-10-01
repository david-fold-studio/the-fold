// Test using the existing createOrUpdateContent function from builder.ts
const fs = require('fs')

// Copy the exact function from builder.ts
async function createOrUpdateContent(modelName, data, name, id) {
  try {
    const privateKey = 'bpk-5fb282d3b27447389012cc30a1f21838' // Using your private key
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
    console.log('📊 Result:', JSON.stringify(result, null, 2))
    return result
  } catch (error) {
    console.error(`Error creating/updating ${modelName}:`, error)
    throw error
  }
}

async function testWithExistingFunction() {
  console.log('🔍 Testing with existing createOrUpdateContent function...\n')
  
  const MDX_FILE_PATH = '/Users/daviddejong/Library/CloudStorage/OneDrive-TheFoldStudio/The Fold Studio/Sales & Marketing/Pitch Project/case-study-employwell.mdx'
  const ENTRY_ID = '262d11f177e44c1fb7a87070e75d8ac7'
  
  const testContent = fs.readFileSync(MDX_FILE_PATH, 'utf8')
  console.log('📖 MDX content loaded:', testContent.length, 'characters\n')
  
  // Test data for case studies based on what we know works
  const caseStudyData = {
    title: 'How UX Research & Product Strategy prevented Costly EHR Integration',
    description: 'When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a \'foot in the door\' approach that delivered immediate value while positioning for future growth. +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI.',
    cover: 'https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2F594d26f16b68448a93628ae800ba5591',
    thumbnail: 'https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2F548514a971c043e38add0f91b01bfa03',
    urlSlug: 'employwell-healthcare',
    content: testContent.substring(0, 2000) + '...' // Test with truncated content first
  }
  
  // Try different model names that might work
  const modelNames = [
    'case-studies',         // This is what we want to work
    'case-studies-section', // This is what the error logs show
    'casestudies',          // Maybe no hyphens?
    'content',              // Generic content model?
    'page',                 // Maybe it's stored as pages?
  ]
  
  for (const modelName of modelNames) {
    console.log(`📋 Testing model name: "${modelName}"`)
    
    try {
      // Test creating new entry first (no ID)
      console.log('   🆕 Testing CREATE (no ID)...')
      const createResult = await createOrUpdateContent(
        modelName, 
        caseStudyData, 
        `Test Employwell Case Study - ${modelName}`,
        undefined // No ID = create new
      )
      
      if (createResult) {
        console.log('🎉 CREATE SUCCESS!')
        console.log('🆔 New entry ID:', createResult.id)
        
        // If create worked, try to update it
        if (createResult.id) {
          console.log('   🔧 Testing UPDATE with returned ID...')
          const updateResult = await createOrUpdateContent(
            modelName,
            { ...caseStudyData, content: testContent.substring(0, 3000) + '...' },
            `Test Employwell Case Study - ${modelName} - Updated`,
            createResult.id
          )
          
          if (updateResult) {
            console.log('🎉 UPDATE SUCCESS!')
            console.log('✅ Model name that works:', modelName)
            return { success: true, modelName, entryId: createResult.id }
          }
        }
      }
      
    } catch (error) {
      console.log('   ❌ Failed:', error.message.split('\n')[0])
    }
    
    console.log('---\n')
  }
  
  return { success: false }
}

async function testUpdateExistingEntry() {
  console.log('🔧 Testing UPDATE on existing Employwell entry...\n')
  
  const MDX_FILE_PATH = '/Users/daviddejong/Library/CloudStorage/OneDrive-TheFoldStudio/The Fold Studio/Sales & Marketing/Pitch Project/case-study-employwell.mdx'
  const ENTRY_ID = '262d11f177e44c1fb7a87070e75d8ac7'
  
  const testContent = fs.readFileSync(MDX_FILE_PATH, 'utf8')
  
  // Try to update the existing entry with content
  const updateData = {
    content: testContent
  }
  
  try {
    const result = await createOrUpdateContent(
      'case-studies',
      updateData,
      'Employwell Healthcare Case Study',
      ENTRY_ID
    )
    
    if (result) {
      console.log('🎉 Successfully updated existing entry!')
      return { success: true, result }
    }
  } catch (error) {
    console.log('❌ Failed to update existing entry:', error.message)
  }
  
  return { success: false }
}

async function run() {
  // First try to update the existing entry
  const updateResult = await testUpdateExistingEntry()
  
  if (updateResult.success) {
    console.log('\n✅ Successfully updated the existing Employwell entry!')
    console.log('🌐 Check: http://localhost:3007/case-studies/employwell-healthcare')
  } else {
    console.log('\n💡 Update failed, trying to find working model name...')
    const createResult = await testWithExistingFunction()
    
    if (createResult.success) {
      console.log(`\n🎉 Found working approach with model: ${createResult.modelName}`)
      console.log(`🆔 Created test entry: ${createResult.entryId}`)
    } else {
      console.log('\n❌ Could not find working model name')
      console.log('💡 The API might need different authentication or the model might not support write operations')
    }
  }
}

run()