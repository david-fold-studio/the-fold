// Test with correct headers - Accept: application/json
async function testWithCorrectHeaders() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  const BUILDER_API_KEY = '4a242b8010c048df9c06392f47457ba0'
  
  console.log('🔍 Testing with correct headers (Accept: application/json)...\n')
  
  // Correct headers for JSON responses
  const headers = {
    'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  
  console.log('=== TEST 1: Read test-testimonial with correct headers ===')
  
  try {
    const response = await fetch('https://builder.io/api/v1/content/test-testimonial', {
      method: 'GET',
      headers: headers
    })
    
    console.log(`Status: ${response.status}`)
    console.log(`Content-Type: ${response.headers.get('content-type')}`)
    
    if (response.ok) {
      if (response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json()
        console.log('✅ SUCCESS! Got JSON response')
        console.log(`Results: ${data.results?.length || 0} items`)
        console.log('Data structure:', Object.keys(data))
        
        if (data.results && data.results.length > 0) {
          console.log('Sample entry:', data.results[0])
        }
      } else {
        const text = await response.text()
        console.log('⚠️  Non-JSON response:', text.substring(0, 200))
      }
    } else {
      const error = await response.text()
      console.log('❌ Error:', error)
    }
  } catch (error) {
    console.log('❌ Request failed:', error.message)
  }
  
  console.log('\n=== TEST 2: Create content with correct headers ===')
  
  const testContent = {
    name: 'Test Testimonial from Claude',
    data: {
      name: 'Sarah Johnson',
      testimonial: 'Amazing integration with Claude Code! The API is working perfectly now.'
    },
    published: 'published'
  }
  
  try {
    const response = await fetch('https://builder.io/api/v1/content/test-testimonial', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(testContent)
    })
    
    console.log(`Create Status: ${response.status}`)
    console.log(`Content-Type: ${response.headers.get('content-type')}`)
    
    if (response.ok) {
      if (response.headers.get('content-type')?.includes('application/json')) {
        const result = await response.json()
        console.log('✅ SUCCESS! Content created with JSON response')
        console.log(`Created ID: ${result.id}`)
        console.log(`Name: ${result.name}`)
        console.log(`Data:`, result.data)
      } else {
        console.log('✅ Content created (non-JSON response)')
      }
    } else {
      const error = await response.text()
      console.log('❌ Create error:', error)
    }
  } catch (error) {
    console.log('❌ Create request failed:', error.message)
  }
  
  console.log('\n=== TEST 3: Test other models (if they exist) ===')
  
  const modelsToTest = ['testimonials', 'services', 'benefits', 'hero-content', 'faq']
  
  for (const modelName of modelsToTest) {
    try {
      const response = await fetch(`https://builder.io/api/v1/content/${modelName}`, {
        method: 'GET',
        headers: headers
      })
      
      if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json()
        console.log(`✅ ${modelName}: Found ${data.results?.length || 0} items`)
      } else {
        console.log(`⚠️  ${modelName}: ${response.status} - ${response.headers.get('content-type')}`)
      }
    } catch (error) {
      console.log(`❌ ${modelName}: ${error.message}`)
    }
  }
}

testWithCorrectHeaders()