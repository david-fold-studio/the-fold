// Debug why models aren't appearing in Builder.io dashboard
async function debugModelCreation() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  
  console.log('🔍 Debugging model creation...\n')
  
  const headers = {
    'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  
  // Test 1: Try to get the actual error response from model creation
  console.log('=== TEST 1: Check model creation response details ===')
  
  const testModel = {
    name: 'debug-test',
    inputs: [
      { name: 'title', type: 'string', required: true }
    ]
  }
  
  try {
    const response = await fetch('https://builder.io/api/v2/models', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(testModel)
    })
    
    console.log(`Status: ${response.status}`)
    console.log(`Content-Type: ${response.headers.get('content-type')}`)
    
    if (response.headers.get('content-type')?.includes('application/json')) {
      try {
        const data = await response.json()
        console.log('Response data:', JSON.stringify(data, null, 2))
      } catch (e) {
        console.log('JSON parse error:', e.message)
      }
    } else {
      const text = await response.text()
      console.log('Response text:', text.substring(0, 500))
    }
  } catch (error) {
    console.log('Request error:', error.message)
  }
  
  // Test 2: Check if we can list existing models
  console.log('\n=== TEST 2: List existing models ===')
  
  const listEndpoints = [
    'https://builder.io/api/v1/models',
    'https://builder.io/api/v2/models', 
    'https://builder.io/api/v1/content-types',
    `https://builder.io/api/v1/content-types?apiKey=4a242b8010c048df9c06392f47457ba0`
  ]
  
  for (const endpoint of listEndpoints) {
    try {
      console.log(`\nTesting: ${endpoint}`)
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: endpoint.includes('apiKey=') ? {
          'Accept': 'application/json'
        } : headers
      })
      
      console.log(`  Status: ${response.status}`)
      console.log(`  Content-Type: ${response.headers.get('content-type')}`)
      
      if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
        try {
          const data = await response.json()
          console.log('  ✅ JSON response received')
          
          if (Array.isArray(data)) {
            console.log(`  Found ${data.length} models:`, data.map(m => m.name || m.id))
            
            // Check if any of our models exist
            const ourModels = ['testimonials', 'services', 'benefits', 'hero-content', 'faq', 'test-testimonial']
            const foundModels = ourModels.filter(name => 
              data.some(model => (model.name || model.id) === name)
            )
            
            if (foundModels.length > 0) {
              console.log(`  🎉 Found our models: ${foundModels.join(', ')}`)
            } else {
              console.log(`  ❌ Our models not found in list`)
            }
          } else if (data.results) {
            console.log(`  Found ${data.results.length} models:`, data.results.map(m => m.name || m.id))
          } else {
            console.log(`  Data structure:`, Object.keys(data))
          }
        } catch (e) {
          console.log('  JSON parse error:', e.message)
        }
      }
    } catch (error) {
      console.log(`  Error: ${error.message}`)
    }
  }
  
  // Test 3: Check if test-testimonial model shows up
  console.log('\n=== TEST 3: Check test-testimonial model (we know this works) ===')
  
  try {
    // Try to create content in test-testimonial to verify it exists
    const testContent = {
      name: 'Model Check Test',
      data: { name: 'Test User', testimonial: 'Testing model existence' },
      published: 'published'
    }
    
    const response = await fetch('https://builder.io/api/v1/write/content/test-testimonial', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(testContent)
    })
    
    if (response.ok) {
      console.log('✅ test-testimonial model exists and works')
      const result = await response.json()
      console.log('  Created content ID:', result.id)
    } else {
      console.log('❌ test-testimonial model not accessible')
      const error = await response.text()
      console.log('  Error:', error.substring(0, 200))
    }
  } catch (error) {
    console.log('❌ Error testing test-testimonial:', error.message)
  }
}

debugModelCreation()