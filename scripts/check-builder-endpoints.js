// Check available Builder.io API endpoints and create content models
async function checkAndCreateModels() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  
  try {
    console.log('🔍 Testing Builder.io API endpoints...\n')
    
    // Test different endpoint patterns
    const endpoints = [
      'https://builder.io/api/v1/models',
      'https://builder.io/api/v2/models',
      'https://builder.io/api/v1/content-types',
      'https://builder.io/api/v2/content-types',
      'https://builder.io/api/v3/models'
    ]
    
    for (const endpoint of endpoints) {
      console.log(`Testing GET ${endpoint}...`)
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
          'Content-Type': 'application/json',
        }
      })
      
      console.log(`  Status: ${response.status}`)
      
      if (response.ok) {
        try {
          const data = await response.json()
          console.log(`  ✅ Success! Found ${Array.isArray(data) ? data.length : 'data'} items`)
          console.log(`  Sample data:`, JSON.stringify(data).substring(0, 200) + '...')
        } catch (e) {
          console.log(`  ✅ Success but non-JSON response`)
        }
      } else {
        const text = await response.text()
        if (text.includes('404')) {
          console.log(`  ❌ 404 Not Found`)
        } else {
          console.log(`  ❌ Error:`, text.substring(0, 100) + '...')
        }
      }
      console.log()
    }
    
    // Try creating a simple testimonial model with the working endpoint
    console.log('🚀 Attempting to create testimonials model...\n')
    
    const simpleTestimonialModel = {
      name: 'testimonial',
      inputs: [
        {
          name: 'name',
          type: 'string',
          required: true
        },
        {
          name: 'company',
          type: 'string'
        },
        {
          name: 'testimonial',
          type: 'longText',
          required: true
        }
      ]
    }
    
    // Try content creation instead of model creation
    const contentResponse = await fetch('https://builder.io/api/v1/content/testimonial', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Sample Testimonial',
        data: {
          name: 'John Doe',
          company: 'Test Company',
          testimonial: 'Great service!'
        }
      })
    })
    
    console.log(`Content creation status: ${contentResponse.status}`)
    
    if (contentResponse.ok) {
      const result = await contentResponse.json()
      console.log('✅ Content created successfully:', result)
    } else {
      const error = await contentResponse.text()
      console.log('❌ Content creation failed:', error.substring(0, 200))
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

checkAndCreateModels()