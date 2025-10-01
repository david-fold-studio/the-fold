// Test different read endpoints to find the one that returns JSON
async function testReadEndpoints() {
  const BUILDER_API_KEY = '4a242b8010c048df9c06392f47457ba0'
  
  console.log('🔍 Testing different read endpoints for JSON responses...\n')
  
  // Different patterns to try for reading content
  const readPatterns = [
    // CDN with different query formats
    `https://cdn.builder.io/api/v1/content/test-testimonial?apiKey=${BUILDER_API_KEY}&format=json`,
    `https://cdn.builder.io/api/v1/content/test-testimonial?apiKey=${BUILDER_API_KEY}&cachebust=true`,
    `https://cdn.builder.io/api/v1/content/test-testimonial?apiKey=${BUILDER_API_KEY}&includeRefs=true`,
    `https://cdn.builder.io/api/v1/content/test-testimonial?apiKey=${BUILDER_API_KEY}&omit=data.blocks`,
    
    // Different subdomains
    `https://api.builder.io/api/v1/content/test-testimonial?apiKey=${BUILDER_API_KEY}`,
    
    // Try with public API key in header instead
    'https://cdn.builder.io/api/v1/content/test-testimonial',
    
    // Try query endpoint
    `https://cdn.builder.io/api/v1/query/test-testimonial?apiKey=${BUILDER_API_KEY}`,
    
    // Try different content model name patterns
    `https://cdn.builder.io/api/v1/content/testimonials?apiKey=${BUILDER_API_KEY}`,
    `https://cdn.builder.io/api/v1/content/testimonial?apiKey=${BUILDER_API_KEY}`,
  ]
  
  for (const url of readPatterns) {
    try {
      console.log(`Testing: ${url}`)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: url.includes('cdn.builder.io/api/v1/content/test-testimonial') && !url.includes('apiKey=') ? {
          'Authorization': `Bearer ${BUILDER_API_KEY}`,
          'Accept': 'application/json'
        } : {
          'Accept': 'application/json'
        }
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
            if (data.results?.length > 0) {
              console.log(`  Sample:`, data.results[0].data)
              console.log(`\n🎉 WORKING READ ENDPOINT FOUND: ${url}`)
              return url
            } else {
              console.log(`  Empty results array`)
            }
          } catch (e) {
            console.log(`  ⚠️  JSON parse error: ${e.message}`)
          }
        } else if (!contentType?.includes('text/html')) {
          const text = await response.text()
          console.log(`  📄 Non-HTML response: ${text.substring(0, 200)}`)
        } else {
          console.log(`  ❌ HTML response`)
        }
      } else {
        console.log(`  ❌ Error: ${response.status}`)
      }
    } catch (error) {
      console.log(`  ❌ Request failed: ${error.message}`)
    }
    console.log()
  }
  
  console.log('❌ No working JSON read endpoint found')
  
  // Let's also try getting the content we know exists by ID
  console.log('\n=== Try reading by specific content ID ===')
  
  const contentId = 'c897bfda587a4f308605a9debfc18785' // From previous creation
  
  const idPatterns = [
    `https://cdn.builder.io/api/v1/content/test-testimonial/${contentId}?apiKey=${BUILDER_API_KEY}`,
    `https://builder.io/api/v1/content/test-testimonial/${contentId}?apiKey=${BUILDER_API_KEY}`,
    `https://cdn.builder.io/api/v1/content/${contentId}?apiKey=${BUILDER_API_KEY}`,
  ]
  
  for (const url of idPatterns) {
    try {
      console.log(`Testing ID: ${url}`)
      
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' }
      })
      
      console.log(`  Status: ${response.status}`)
      
      if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json()
        console.log(`  ✅ SUCCESS! Got content by ID`)
        console.log(`  Data:`, data.data)
        return url
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`)
    }
  }
}

testReadEndpoints()