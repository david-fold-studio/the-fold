// Systematically test Builder.io API to understand what works
const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
const BUILDER_PUBLIC_KEY = '4a242b8010c048df9c06392f47457ba0'
const ENTRY_ID = '262d11f177e44c1fb7a87070e75d8ac7'

async function testApiEndpoints() {
  console.log('🔍 Testing Builder.io API endpoints systematically...\n')
  
  // Test different ways to read the existing entry first
  const readEndpoints = [
    {
      name: 'GET with private key',
      url: `https://builder.io/api/v1/content/${ENTRY_ID}`,
      headers: { 'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}` }
    },
    {
      name: 'GET with public key in URL',
      url: `https://cdn.builder.io/api/v1/content/case-studies/${ENTRY_ID}?apiKey=${BUILDER_PUBLIC_KEY}`,
      headers: {}
    },
    {
      name: 'GET case-studies model with query',
      url: `https://cdn.builder.io/api/v1/content/case-studies?apiKey=${BUILDER_PUBLIC_KEY}&query.data.urlSlug=employwell-healthcare`,
      headers: {}
    },
    {
      name: 'GET with private key - case-studies model',
      url: `https://builder.io/api/v1/content/case-studies?query.data.urlSlug=employwell-healthcare`,
      headers: { 'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}` }
    }
  ]
  
  for (const endpoint of readEndpoints) {
    console.log(`📋 Testing: ${endpoint.name}`)
    console.log(`🔗 URL: ${endpoint.url}`)
    
    try {
      const response = await fetch(endpoint.url, {
        method: 'GET',
        headers: endpoint.headers
      })
      
      console.log(`📡 Status: ${response.status}`)
      console.log(`📄 Content-Type: ${response.headers.get('content-type')}`)
      
      const responseText = await response.text()
      
      if (responseText.startsWith('{') || responseText.startsWith('[')) {
        try {
          const data = JSON.parse(responseText)
          console.log('✅ Got JSON response!')
          
          if (Array.isArray(data)) {
            console.log(`📊 Array with ${data.length} entries`)
            if (data.length > 0 && data[0].data) {
              console.log(`📋 First entry fields: ${Object.keys(data[0].data)}`)
              console.log(`📝 Has content field: ${!!data[0].data.content}`)
              if (data[0].data.content) {
                console.log(`📏 Content length: ${data[0].data.content.length}`)
              }
            }
          } else if (data.data) {
            console.log(`📋 Entry fields: ${Object.keys(data.data)}`)
            console.log(`📝 Has content field: ${!!data.data.content}`)
            if (data.data.content) {
              console.log(`📏 Content length: ${data.data.content.length}`)
            }
          }
          
          // If this worked, let's try updating
          if (response.status === 200) {
            console.log('🎯 This endpoint works for reading! Trying update...')
            return { success: true, endpoint, data }
          }
          
        } catch (parseError) {
          console.log('❌ Failed to parse JSON:', parseError.message)
        }
      } else {
        console.log('❌ Got HTML response')
        console.log(`📄 Preview: ${responseText.substring(0, 100)}...`)
      }
      
    } catch (error) {
      console.log('❌ Request failed:', error.message)
    }
    
    console.log('---\n')
  }
  
  return { success: false }
}

async function testUpdateWithWorkingEndpoint(workingEndpoint, entryData) {
  console.log('🔧 Testing update with working endpoint...\n')
  
  const updateEndpoints = [
    {
      name: 'PATCH with private key',
      url: workingEndpoint.url,
      method: 'PATCH',
      headers: { 
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json'
      }
    },
    {
      name: 'PUT with private key', 
      url: workingEndpoint.url,
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json'
      }
    },
    {
      name: 'POST to content API',
      url: 'https://builder.io/api/v1/content',
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  ]
  
  const testContent = "# Test Content\n\nThis is a test to see if we can update the content field."
  
  for (const endpoint of updateEndpoints) {
    console.log(`🔧 Testing: ${endpoint.name}`)
    console.log(`🔗 URL: ${endpoint.url}`)
    
    const updateData = {
      id: ENTRY_ID,
      data: {
        content: testContent
      }
    }
    
    try {
      const response = await fetch(endpoint.url, {
        method: endpoint.method,
        headers: endpoint.headers,
        body: JSON.stringify(updateData)
      })
      
      console.log(`📡 Status: ${response.status}`)
      console.log(`📄 Content-Type: ${response.headers.get('content-type')}`)
      
      const responseText = await response.text()
      
      if (responseText.startsWith('{')) {
        const data = JSON.parse(responseText)
        console.log('✅ Got JSON response!')
        console.log('📋 Response keys:', Object.keys(data))
        
        if (response.status >= 200 && response.status < 300) {
          console.log('🎉 Update successful!')
          return { success: true, endpoint, data }
        }
      } else {
        console.log('❌ Got HTML response')
        console.log(`📄 Preview: ${responseText.substring(0, 200)}...`)
      }
      
    } catch (error) {
      console.log('❌ Request failed:', error.message)
    }
    
    console.log('---\n')
  }
  
  return { success: false }
}

async function run() {
  const readResult = await testApiEndpoints()
  
  if (readResult.success) {
    console.log('✅ Found working read endpoint!')
    const updateResult = await testUpdateWithWorkingEndpoint(readResult.endpoint, readResult.data)
    
    if (updateResult.success) {
      console.log('🎉 Found working update method!')
      console.log('💡 Ready to add full MDX content!')
    } else {
      console.log('❌ Could not find working update method')
    }
  } else {
    console.log('❌ No working read endpoints found')
    console.log('💡 May need to check API keys or permissions')
  }
}

run()