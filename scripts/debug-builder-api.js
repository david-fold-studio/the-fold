// Debug Builder.io API endpoints and authentication
async function debugBuilderAPI() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  const BUILDER_API_KEY = '4a242b8010c048df9c06392f47457ba0'
  
  console.log('🔍 Debugging Builder.io API endpoints and authentication...\n')
  
  // Test 1: Check if we can get existing content/pages
  console.log('=== TEST 1: Get existing content ===')
  try {
    const pageResponse = await fetch('https://builder.io/api/v1/content/page', {
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
      }
    })
    
    console.log(`Pages endpoint status: ${pageResponse.status}`)
    if (pageResponse.ok) {
      const pages = await pageResponse.json()
      console.log(`✅ Found ${pages.results?.length || 0} pages`)
      if (pages.results?.[0]) {
        console.log(`Sample page: ${pages.results[0].name} (${pages.results[0].id})`)
      }
    } else {
      const error = await pageResponse.text()
      console.log('❌ Pages error:', error.substring(0, 200))
    }
  } catch (error) {
    console.log('❌ Pages request failed:', error.message)
  }
  
  console.log('\n=== TEST 2: Try different authentication methods ===')
  
  // Test different auth headers
  const authMethods = [
    { name: 'Bearer with private key', headers: { 'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}` }},
    { name: 'Bearer with public key', headers: { 'Authorization': `Bearer ${BUILDER_API_KEY}` }},
    { name: 'Private key header', headers: { 'Private-Key': BUILDER_PRIVATE_KEY }},
    { name: 'API key header', headers: { 'Api-Key': BUILDER_API_KEY }},
    { name: 'Query param private', url: `?privateKey=${BUILDER_PRIVATE_KEY}` },
    { name: 'Query param api', url: `?apiKey=${BUILDER_API_KEY}` }
  ]
  
  for (const method of authMethods) {
    try {
      const url = `https://builder.io/api/v1/content/page${method.url || ''}`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...method.headers
        }
      })
      
      console.log(`${method.name}: ${response.status}`)
      if (response.ok) {
        console.log(`  ✅ Success with ${method.name}`)
      }
    } catch (error) {
      console.log(`${method.name}: Error - ${error.message}`)
    }
  }
  
  console.log('\n=== TEST 3: Model/Schema endpoints ===')
  
  // Test model-related endpoints with working auth
  const modelEndpoints = [
    'https://builder.io/api/v1/models',
    'https://builder.io/api/v2/models', 
    'https://builder.io/api/v3/models',
    'https://builder.io/api/v1/content-types',
    'https://builder.io/api/v2/content-types',
    'https://builder.io/api/v1/schemas',
    'https://builder.io/api/v1/spaces/models',
    'https://builder.io/api/v1/write/models'
  ]
  
  for (const endpoint of modelEndpoints) {
    try {
      console.log(`\nTesting: ${endpoint}`)
      
      // Try GET first
      const getResponse = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
          'Content-Type': 'application/json'
        }
      })
      
      console.log(`  GET ${getResponse.status}`)
      
      if (getResponse.ok) {
        try {
          const contentType = getResponse.headers.get('content-type')
          console.log(`  Content-Type: ${contentType}`)
          
          if (contentType?.includes('application/json')) {
            const data = await getResponse.json()
            console.log(`  ✅ JSON data:`, typeof data, Array.isArray(data) ? `Array(${data.length})` : Object.keys(data || {}).slice(0, 3))
          } else {
            const text = await getResponse.text()
            if (text.includes('<html')) {
              console.log(`  ⚠️  Returns HTML page (likely need different auth or endpoint)`)
            } else {
              console.log(`  Text response:`, text.substring(0, 100))
            }
          }
        } catch (e) {
          console.log(`  ⚠️  Response parsing error:`, e.message)
        }
      }
      
      // Try POST with simple model
      if (endpoint.includes('models') && !endpoint.includes('spaces')) {
        const postResponse = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: 'test-model',
            inputs: [
              { name: 'title', type: 'string', required: true }
            ]
          })
        })
        
        console.log(`  POST ${postResponse.status}`)
        if (postResponse.ok) {
          console.log(`  ✅ POST Success! Model creation works on ${endpoint}`)
          try {
            const result = await postResponse.json()
            console.log(`  Created:`, result)
          } catch (e) {
            console.log(`  Created but couldn't parse response`)
          }
        } else {
          const error = await postResponse.text()
          if (!error.includes('<html>')) {
            console.log(`  POST Error:`, error.substring(0, 150))
          }
        }
      }
      
    } catch (error) {
      console.log(`  ❌ Request failed:`, error.message)
    }
  }
  
  console.log('\n=== TEST 4: Space/Organization info ===')
  
  try {
    const spaceResponse = await fetch('https://builder.io/api/v1/spaces', {
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
      }
    })
    
    console.log(`Spaces endpoint: ${spaceResponse.status}`)
    if (spaceResponse.ok) {
      const spaces = await spaceResponse.json()
      console.log('✅ Spaces data:', spaces)
    }
  } catch (error) {
    console.log('❌ Spaces error:', error.message)
  }
}

debugBuilderAPI()