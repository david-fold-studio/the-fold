// Debug script to check Builder.io API and case-studies model
const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'

async function checkModels() {
  try {
    console.log('🔍 Checking available models...')
    const response = await fetch('https://builder.io/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to get models: ${response.status}`)
    }
    
    const models = await response.json()
    console.log('📋 Available models:')
    models.forEach(model => {
      console.log(`  - ${model.name}`)
    })
    
    const caseStudiesModel = models.find(m => m.name === 'case-studies')
    if (caseStudiesModel) {
      console.log('✅ case-studies model exists')
    } else {
      console.log('❌ case-studies model does not exist')
      console.log('📝 Need to create the case-studies model first')
    }
    
    return models
  } catch (error) {
    console.error('❌ Error checking models:', error.message)
    return null
  }
}

async function checkExistingCaseStudies() {
  try {
    console.log('\n🔍 Checking existing case studies...')
    const response = await fetch('https://builder.io/api/v1/content/case-studies', {
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
      }
    })
    
    console.log('📡 Response status:', response.status)
    const text = await response.text()
    console.log('📄 Raw response (first 200 chars):', text.substring(0, 200))
    
    if (!response.ok) {
      throw new Error(`Failed to get case studies: ${response.status}`)
    }
    
    const data = JSON.parse(text)
    console.log('📊 Existing case studies:', data.results?.length || 0)
    
    return data
  } catch (error) {
    console.error('❌ Error checking case studies:', error.message)
    return null
  }
}

// Run the checks
async function runChecks() {
  console.log('🚀 Starting Builder.io API debugging...\n')
  
  await checkModels()
  await checkExistingCaseStudies()
  
  console.log('\n✅ Debug complete')
}

runChecks()