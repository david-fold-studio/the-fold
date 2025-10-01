/**
 * Check what the API is actually returning
 */

const { default: fetch } = require('node-fetch')
require('dotenv').config({ path: '.env.local' })

async function checkAPIResponse() {
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY
  
  console.log('🔍 Checking actual API response...')
  console.log('API Key:', PUBLIC_KEY ? `${PUBLIC_KEY.substring(0, 8)}...` : 'NOT FOUND')
  
  try {
    const response = await fetch(`https://cdn.builder.io/api/v1/page?apiKey=${PUBLIC_KEY}&limit=1`)
    const text = await response.text()
    
    console.log('\n📄 Response Status:', response.status)
    console.log('📄 Content-Type:', response.headers.get('content-type'))
    console.log('📄 First 500 characters of response:')
    console.log(text.substring(0, 500))
    console.log('...')
    
    // Try to see if it's actually JSON despite the content-type
    try {
      const parsed = JSON.parse(text)
      console.log('\n✅ Response is actually valid JSON!')
      console.log('Parsed data:', JSON.stringify(parsed, null, 2))
    } catch (e) {
      console.log('\n❌ Response is not JSON')
      
      // Check if it's an HTML page
      if (text.includes('<!doctype') || text.includes('<html>')) {
        console.log('🌐 Response appears to be HTML page')
        
        // Extract title if possible
        const titleMatch = text.match(/<title>(.*?)<\/title>/i)
        if (titleMatch) {
          console.log('Page title:', titleMatch[1])
        }
        
        // Check for Builder.io specific content
        if (text.includes('builder.io')) {
          console.log('🎯 This looks like Builder.io dashboard HTML')
          console.log('💡 Possible causes:')
          console.log('   1. API key is invalid or not activated')
          console.log('   2. Space has no content yet')
          console.log('   3. API endpoint changed')
          console.log('   4. CORS or authentication issue')
        }
      }
    }
    
    // Try different approach - test if the API key works at all
    console.log('\n🔧 Testing different API formats...')
    
    const testURLs = [
      `https://cdn.builder.io/api/v1/page?apiKey=${PUBLIC_KEY}&limit=1&fields=name,id`,
      `https://cdn.builder.io/api/v1/page?api_key=${PUBLIC_KEY}&limit=1`,
      `https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&limit=1`,
    ]
    
    for (const testURL of testURLs) {
      try {
        console.log(`\nTesting: ${testURL.substring(0, 80)}...`)
        const testResponse = await fetch(testURL)
        console.log(`Status: ${testResponse.status}, Content-Type: ${testResponse.headers.get('content-type')}`)
        
        const testText = await testResponse.text()
        if (testText.startsWith('{') || testText.startsWith('[')) {
          console.log('✅ This one returns JSON!')
          console.log(testText.substring(0, 200) + '...')
        }
      } catch (error) {
        console.log(`❌ Error: ${error.message}`)
      }
    }
    
  } catch (error) {
    console.error('❌ Request failed:', error.message)
  }
}

checkAPIResponse()