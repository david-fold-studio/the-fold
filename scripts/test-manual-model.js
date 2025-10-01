// Test the manually created test-testimonial model
async function testManualModel() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  const BUILDER_API_KEY = '4a242b8010c048df9c06392f47457ba0'
  
  console.log('🔍 Testing manually created test-testimonial model...\n')
  
  // Test 1: Try to get the model
  console.log('=== TEST 1: Get test-testimonial model ===')
  
  const readEndpoints = [
    `https://builder.io/api/v1/content/test-testimonial?apiKey=${BUILDER_API_KEY}`,
    `https://builder.io/api/v1/content/test-testimonial?privateKey=${BUILDER_PRIVATE_KEY}`,
    'https://builder.io/api/v1/content/test-testimonial',
    'https://builder.io/api/v2/content/test-testimonial',
    `https://builder.io/api/v1/content/test-testimonial?limit=10&apiKey=${BUILDER_API_KEY}`
  ]
  
  let workingEndpoint = null
  
  for (const endpoint of readEndpoints) {
    try {
      console.log(`Testing: ${endpoint}`)
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: endpoint.includes('?') ? {} : {
          'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
          'Content-Type': 'application/json'
        }
      })
      
      console.log(`  Status: ${response.status}`)
      
      if (response.ok) {
        const contentType = response.headers.get('content-type')
        console.log(`  Content-Type: ${contentType}`)
        
        if (contentType?.includes('application/json')) {
          try {
            const data = await response.json()
            console.log(`  ✅ SUCCESS! Got JSON data`)
            console.log(`  Results: ${data.results?.length || 0} items`)
            console.log(`  Data structure:`, Object.keys(data))
            workingEndpoint = endpoint
            break
          } catch (e) {
            console.log(`  ⚠️  JSON parse error: ${e.message}`)
          }
        } else {
          const text = await response.text()
          if (text.includes('<html>')) {
            console.log(`  ❌ HTML response (auth issue)`)
          } else {
            console.log(`  Text response: ${text.substring(0, 100)}`)
          }
        }
      } else {
        console.log(`  ❌ Error: ${response.status}`)
      }
    } catch (error) {
      console.log(`  ❌ Request failed: ${error.message}`)
    }
    console.log()
  }
  
  if (!workingEndpoint) {
    console.log('❌ No working endpoint found for reading content')
    return
  }
  
  console.log(`\n🎉 Found working endpoint: ${workingEndpoint}`)
  
  // Test 2: Create content using the working pattern
  console.log('\n=== TEST 2: Create content ===')
  
  const testContent = {
    name: 'Test Testimonial Entry',
    data: {
      name: 'John Doe',
      testimonial: 'Great service from Claude Code integration!'
    },
    published: 'published'
  }
  
  // Try different creation endpoints based on the working read endpoint
  const baseUrl = workingEndpoint.split('?')[0]
  const queryParams = workingEndpoint.includes('?') ? workingEndpoint.split('?')[1] : ''
  
  const createEndpoints = [
    queryParams ? `${baseUrl}?${queryParams}` : baseUrl,
    baseUrl
  ]
  
  for (const endpoint of createEndpoints) {
    try {
      console.log(`Creating content at: ${endpoint}`)
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: endpoint.includes('?') ? {
          'Content-Type': 'application/json'
        } : {
          'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testContent)
      })
      
      console.log(`  Status: ${response.status}`)
      
      if (response.ok) {
        const contentType = response.headers.get('content-type')
        console.log(`  Content-Type: ${contentType}`)
        
        if (contentType?.includes('application/json')) {
          try {
            const result = await response.json()
            console.log(`  ✅ SUCCESS! Content created`)
            console.log(`  Created ID: ${result.id}`)
            console.log(`  Created data:`, result.data)
            
            console.log('\n🎉 BREAKTHROUGH! Content creation is working!')
            console.log('📋 Working pattern:')
            console.log(`   Read: ${workingEndpoint}`)
            console.log(`   Create: ${endpoint}`)
            
            return { readEndpoint: workingEndpoint, createEndpoint: endpoint }
            
          } catch (e) {
            console.log(`  ⚠️  Created but JSON parse error: ${e.message}`)
          }
        } else {
          console.log(`  ✅ Content created (non-JSON response)`)
        }
      } else {
        const error = await response.text()
        if (!error.includes('<html>')) {
          console.log(`  ❌ Error: ${error.substring(0, 200)}`)
        }
      }
    } catch (error) {
      console.log(`  ❌ Request failed: ${error.message}`)
    }
    console.log()
  }
}

testManualModel()