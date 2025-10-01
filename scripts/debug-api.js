/**
 * Debug Builder.io API issues step by step
 */

const { default: fetch } = require('node-fetch')
require('dotenv').config({ path: '.env.local' })

async function debugAPI() {
  console.log('🔧 Debugging Builder.io API...\n')
  
  // Step 1: Check environment variables
  console.log('1️⃣ Checking environment variables:')
  console.log('PUBLIC_API_KEY:', process.env.NEXT_PUBLIC_BUILDER_API_KEY ? `${process.env.NEXT_PUBLIC_BUILDER_API_KEY.substring(0, 8)}...` : '❌ NOT FOUND')
  console.log('PRIVATE_KEY:', process.env.BUILDER_PRIVATE_KEY ? `${process.env.BUILDER_PRIVATE_KEY.substring(0, 8)}...` : '❌ NOT FOUND')
  
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY
  const PRIVATE_KEY = process.env.BUILDER_PRIVATE_KEY
  
  if (!PUBLIC_KEY) {
    console.log('❌ No public API key found!')
    return
  }
  
  console.log('\n2️⃣ Testing public API (read access):')
  try {
    const response = await fetch(`https://cdn.builder.io/api/v1/page?apiKey=${PUBLIC_KEY}&limit=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Node.js'
      }
    })
    
    console.log('Status:', response.status)
    console.log('Headers:', Object.fromEntries(response.headers))
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Public API works!')
      console.log('Response:', JSON.stringify(data, null, 2))
    } else {
      const errorText = await response.text()
      console.log('❌ Public API error:')
      console.log('Error body:', errorText.substring(0, 500))
    }
  } catch (error) {
    console.log('❌ Public API request failed:', error.message)
  }
  
  if (!PRIVATE_KEY) {
    console.log('\n❌ No private key found - cannot test write operations')
    return
  }
  
  console.log('\n3️⃣ Testing private API (write access):')
  try {
    // Test with a simple GET request first
    const response = await fetch(`https://builder.io/api/v1/models/${PUBLIC_KEY}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PRIVATE_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Node.js'
      }
    })
    
    console.log('Status:', response.status)
    console.log('Headers:', Object.fromEntries(response.headers))
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Private API works!')
      console.log('Models:', JSON.stringify(data, null, 2))
    } else {
      const errorText = await response.text()
      console.log('❌ Private API error:')
      console.log('Error body:', errorText.substring(0, 500))
    }
  } catch (error) {
    console.log('❌ Private API request failed:', error.message)
  }
  
  console.log('\n4️⃣ Testing alternative endpoints:')
  
  // Test different API endpoints
  const testEndpoints = [
    `https://cdn.builder.io/api/v1/page?apiKey=${PUBLIC_KEY}&url=%2F`,
    `https://cdn.builder.io/api/v1/page?apiKey=${PUBLIC_KEY}`,
    `https://builder.io/api/v1/page?apiKey=${PUBLIC_KEY}`,
  ]
  
  for (const endpoint of testEndpoints) {
    try {
      console.log(`\nTesting: ${endpoint}`)
      const response = await fetch(endpoint)
      console.log(`Status: ${response.status}`)
      
      if (response.ok) {
        const data = await response.json()
        console.log(`✅ Works! Found ${data.results?.length || 0} results`)
      } else {
        const errorText = await response.text()
        console.log(`❌ Failed: ${errorText.substring(0, 100)}`)
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`)
    }
  }
  
  console.log('\n5️⃣ Recommendations:')
  console.log('- Check if API keys are correct in Builder.io dashboard')
  console.log('- Verify private key has proper permissions (create, edit, publish)')
  console.log('- Try creating content manually first, then use API')
  console.log('- Check Builder.io status page for any API issues')
}

debugAPI()