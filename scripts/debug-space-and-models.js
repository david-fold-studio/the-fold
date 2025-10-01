// Debug space info and try different model creation approaches
async function debugSpaceAndModels() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  const BUILDER_API_KEY = '4a242b8010c048df9c06392f47457ba0'
  
  console.log('🔍 Debugging space and model creation...\n')
  
  // Try to get space/organization info with different methods
  console.log('=== SPACE/ORG INFO ===')
  
  const spaceEndpoints = [
    'https://builder.io/api/v1/spaces',
    'https://builder.io/api/v1/orgs', 
    'https://builder.io/api/v1/user',
    'https://builder.io/api/v1/me',
    `https://builder.io/api/v1/content-types?apiKey=${BUILDER_API_KEY}`,
    `https://builder.io/api/v1/models?apiKey=${BUILDER_API_KEY}`
  ]
  
  for (const endpoint of spaceEndpoints) {
    try {
      console.log(`\nTesting: ${endpoint}`)
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
          'Content-Type': 'application/json'
        }
      })
      
      console.log(`Status: ${response.status}`)
      
      if (response.ok) {
        const contentType = response.headers.get('content-type')
        console.log(`Content-Type: ${contentType}`)
        
        if (contentType?.includes('application/json')) {
          try {
            const data = await response.json()
            console.log('✅ JSON Response:', JSON.stringify(data, null, 2))
          } catch (e) {
            console.log('⚠️  JSON parse error:', e.message)
          }
        } else {
          const text = await response.text()
          if (text.includes('<html>')) {
            console.log('⚠️  Returns HTML (auth or endpoint issue)')
          } else {
            console.log('Response:', text.substring(0, 200))
          }
        }
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`)
    }
  }
  
  console.log('\n=== CHECK EXISTING MODELS ===')
  
  // Try to get existing models with different methods
  const modelCheckEndpoints = [
    `https://builder.io/api/v1/content-types?apiKey=${BUILDER_API_KEY}`,
    `https://builder.io/api/v2/models?apiKey=${BUILDER_API_KEY}`,
    `https://builder.io/api/v1/content-types?privateKey=${BUILDER_PRIVATE_KEY}`,
    `https://builder.io/api/v2/models?privateKey=${BUILDER_PRIVATE_KEY}`
  ]
  
  for (const endpoint of modelCheckEndpoints) {
    try {
      console.log(`\nChecking: ${endpoint}`)
      const response = await fetch(endpoint)
      
      console.log(`Status: ${response.status}`)
      
      if (response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType?.includes('application/json')) {
          try {
            const data = await response.json()
            console.log('✅ Models found:', Array.isArray(data) ? data.map(m => m.name || m.id) : Object.keys(data))
            
            // Check if our created models are in the list
            const modelNames = Array.isArray(data) ? data.map(m => m.name || m.id) : []
            const ourModels = ['testimonials', 'services', 'benefits', 'hero-content', 'faq']
            const foundModels = ourModels.filter(name => modelNames.includes(name))
            
            if (foundModels.length > 0) {
              console.log(`🎉 Found our created models: ${foundModels.join(', ')}`)
            } else {
              console.log('❌ Our created models not found in this list')
            }
          } catch (e) {
            console.log('⚠️  JSON parse error')
          }
        }
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`)
    }
  }
  
  console.log('\n=== TRY CREATING DATA MODEL (different approach) ===')
  
  // Try creating a data model with explicit type
  const dataModel = {
    name: 'test-testimonials',
    kind: 'data', // Explicitly set as data model
    inputs: [
      { 
        name: 'name', 
        type: 'string', 
        required: true,
        friendlyName: 'Client Name'
      },
      { 
        name: 'testimonial', 
        type: 'longText', 
        required: true,
        friendlyName: 'Testimonial Text'
      }
    ]
  }
  
  // Try different creation endpoints
  const createEndpoints = [
    'https://builder.io/api/v2/models',
    'https://builder.io/api/v3/models', 
    `https://builder.io/api/v2/models?apiKey=${BUILDER_API_KEY}`,
    `https://builder.io/api/v2/models?privateKey=${BUILDER_PRIVATE_KEY}`
  ]
  
  for (const endpoint of createEndpoints) {
    try {
      console.log(`\nTrying to create model at: ${endpoint}`)
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataModel)
      })
      
      console.log(`Status: ${response.status}`)
      
      if (response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType?.includes('application/json')) {
          try {
            const result = await response.json()
            console.log('✅ Model created successfully:', result)
          } catch (e) {
            console.log('✅ Model created (response parse error)')
          }
        } else {
          console.log('✅ Model created (non-JSON response)')
        }
      } else {
        const error = await response.text()
        if (!error.includes('<html>')) {
          console.log(`❌ Error: ${error}`)
        }
      }
    } catch (error) {
      console.log(`❌ Request error: ${error.message}`)
    }
  }
}

debugSpaceAndModels()