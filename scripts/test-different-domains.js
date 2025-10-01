// Test different Builder.io API domains and patterns
async function testDifferentDomains() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  const BUILDER_API_KEY = '4a242b8010c048df9c06392f47457ba0'
  
  console.log('🔍 Testing different Builder.io API domains and patterns...\n')
  
  const headers = {
    'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  
  // Different base URLs and patterns to try
  const testPatterns = [
    // Different subdomains
    'https://api.builder.io/api/v1/content/test-testimonial',
    'https://cdn.builder.io/api/v1/content/test-testimonial',
    
    // Query param authentication (like how pages work)
    `https://builder.io/api/v1/content/test-testimonial?apiKey=${BUILDER_API_KEY}`,
    `https://cdn.builder.io/api/v1/content/test-testimonial?apiKey=${BUILDER_API_KEY}`,
    
    // Different API versions
    'https://builder.io/api/v2/content/test-testimonial',
    'https://builder.io/api/v3/content/test-testimonial',
    
    // Try with space ID if we can find it
    // (We know page creation works, let's see if we can extract the pattern)
    
    // Try different content vs data endpoints
    'https://builder.io/api/v1/data/test-testimonial',
    `https://builder.io/api/v1/data/test-testimonial?apiKey=${BUILDER_API_KEY}`,
    
    // Try write API endpoints
    'https://builder.io/api/v1/write/test-testimonial',
    `https://builder.io/api/v1/write/test-testimonial?apiKey=${BUILDER_API_KEY}`,
  ]
  
  for (const url of testPatterns) {
    try {
      console.log(`Testing: ${url}`)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: url.includes('apiKey=') ? {
          'Accept': 'application/json'
        } : headers
      })
      
      console.log(`  Status: ${response.status}`)
      const contentType = response.headers.get('content-type')
      console.log(`  Content-Type: ${contentType}`)
      
      if (response.ok) {
        if (contentType?.includes('application/json')) {
          try {
            const data = await response.json()
            console.log(`  ✅ SUCCESS! JSON response`)
            console.log(`  Results: ${data.results?.length || 0} items`)
            console.log(`  Data keys:`, Object.keys(data))
            
            if (data.results?.length > 0) {
              console.log(`  Sample item:`, data.results[0])
            }
            
            console.log(`\n🎉 WORKING ENDPOINT FOUND: ${url}`)
            
            // Test creating content with this working pattern
            return await testContentCreation(url, url.includes('apiKey='))
            
          } catch (e) {
            console.log(`  ⚠️  JSON parse error: ${e.message}`)
          }
        } else if (!contentType?.includes('text/html')) {
          const text = await response.text()
          console.log(`  📄 Non-HTML response: ${text.substring(0, 100)}`)
        }
      } else if (response.status === 404) {
        console.log(`  ⚠️  404 - Endpoint doesn't exist`)
      } else {
        console.log(`  ❌ ${response.status} error`)
      }
    } catch (error) {
      console.log(`  ❌ Request failed: ${error.message}`)
    }
    console.log()
  }
}

async function testContentCreation(workingUrl, useApiKey) {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  
  console.log('\n=== Testing content creation with working endpoint ===')
  
  const testContent = {
    name: 'Test Entry from API Discovery',
    data: {
      name: 'API Test User',
      testimonial: 'Successfully found the working Builder.io API endpoint!'
    },
    published: 'published'
  }
  
  try {
    const response = await fetch(workingUrl, {
      method: 'POST',
      headers: useApiKey ? {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      } : {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testContent)
    })
    
    console.log(`Create Status: ${response.status}`)
    console.log(`Content-Type: ${response.headers.get('content-type')}`)
    
    if (response.ok) {
      if (response.headers.get('content-type')?.includes('application/json')) {
        const result = await response.json()
        console.log('✅ SUCCESS! Content created with JSON response')
        console.log(`Created:`, result)
        return workingUrl
      } else {
        console.log('✅ Content created (non-JSON response)')
        return workingUrl
      }
    } else {
      const error = await response.text()
      console.log('❌ Create failed:', error.substring(0, 200))
    }
  } catch (error) {
    console.log('❌ Create request failed:', error.message)
  }
  
  return null
}

testDifferentDomains()