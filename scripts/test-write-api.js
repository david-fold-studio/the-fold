// Test the write API endpoints that returned JSON 400 errors
async function testWriteAPI() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  
  console.log('🔍 Testing Builder.io Write API endpoints...\n')
  
  const headers = {
    'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  
  console.log('=== TEST 1: Check 400 error details ===')
  
  try {
    const response = await fetch('https://builder.io/api/v1/write/test-testimonial', {
      method: 'GET',
      headers: headers
    })
    
    console.log(`Status: ${response.status}`)
    console.log(`Content-Type: ${response.headers.get('content-type')}`)
    
    if (response.headers.get('content-type')?.includes('application/json')) {
      try {
        const errorData = await response.json()
        console.log('📋 Error response:', JSON.stringify(errorData, null, 2))
      } catch (e) {
        const text = await response.text()
        console.log('📋 Error text:', text)
      }
    }
  } catch (error) {
    console.log('❌ Request failed:', error.message)
  }
  
  console.log('\n=== TEST 2: Try GET on write endpoint for content ===')
  
  // Maybe we need to GET from a different write endpoint
  const writeEndpoints = [
    'https://builder.io/api/v1/write/content/test-testimonial',
    'https://builder.io/api/v1/write/data/test-testimonial',
    'https://builder.io/api/v1/write/models/test-testimonial'
  ]
  
  for (const endpoint of writeEndpoints) {
    try {
      console.log(`Testing: ${endpoint}`)
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: headers
      })
      
      console.log(`  Status: ${response.status}`)
      console.log(`  Content-Type: ${response.headers.get('content-type')}`)
      
      if (response.headers.get('content-type')?.includes('application/json')) {
        try {
          const data = await response.json()
          console.log(`  ✅ JSON Response:`, JSON.stringify(data, null, 2))
          
          if (data.results?.length > 0) {
            console.log(`  🎉 Found ${data.results.length} items!`)
            return endpoint // Found working endpoint
          }
        } catch (e) {
          const text = await response.text()
          console.log(`  📋 Response text:`, text)
        }
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`)
    }
    console.log()
  }
  
  console.log('\n=== TEST 3: Try content creation with write API ===')
  
  const testContent = {
    name: 'Write API Test Entry',
    data: {
      name: 'Write API User',
      testimonial: 'Testing the Builder.io Write API endpoint!'
    },
    published: 'published'
  }
  
  const createEndpoints = [
    'https://builder.io/api/v1/write/content/test-testimonial',
    'https://builder.io/api/v1/write/data/test-testimonial'
  ]
  
  for (const endpoint of createEndpoints) {
    try {
      console.log(`Creating at: ${endpoint}`)
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(testContent)
      })
      
      console.log(`  Status: ${response.status}`)
      console.log(`  Content-Type: ${response.headers.get('content-type')}`)
      
      if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
        const result = await response.json()
        console.log(`  ✅ SUCCESS! Content created`)
        console.log(`  Result:`, JSON.stringify(result, null, 2))
        return endpoint
      } else if (response.headers.get('content-type')?.includes('application/json')) {
        const error = await response.json()
        console.log(`  ❌ Error:`, JSON.stringify(error, null, 2))
      }
    } catch (error) {
      console.log(`  ❌ Request failed: ${error.message}`)
    }
    console.log()
  }
  
  console.log('\n=== TEST 4: Check what models exist in write API ===')
  
  try {
    const response = await fetch('https://builder.io/api/v1/write/models', {
      method: 'GET',
      headers: headers
    })
    
    console.log(`Models endpoint status: ${response.status}`)
    
    if (response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.json()
      console.log('📋 Available models:', JSON.stringify(data, null, 2))
    }
  } catch (error) {
    console.log('❌ Models request failed:', error.message)
  }
}

testWriteAPI()