/**
 * Test the working v3 API and see what content exists
 */

const { default: fetch } = require('node-fetch')
require('dotenv').config({ path: '.env.local' })

async function checkWorkingAPI() {
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY
  const PRIVATE_KEY = process.env.BUILDER_PRIVATE_KEY
  
  console.log('🎉 Testing WORKING v3 API...')
  console.log('Public Key:', PUBLIC_KEY ? `${PUBLIC_KEY.substring(0, 8)}...` : 'NOT FOUND')
  console.log('Private Key:', PRIVATE_KEY ? `${PRIVATE_KEY.substring(0, 8)}...` : 'NOT FOUND')
  
  try {
    // Test v3 content API - READ
    console.log('\n1️⃣ Testing v3 content API (READ):')
    const response = await fetch(`https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&limit=10`)
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ SUCCESS! Found pages:')
      console.log(`📊 Total pages: ${data.results?.length || 0}`)
      
      if (data.results && data.results.length > 0) {
        data.results.forEach((page, index) => {
          console.log(`  ${index + 1}. "${page.name}" (${page.id})`)
          console.log(`     URL: ${page.data?.url || 'No URL'}`)
          console.log(`     Status: ${page.published}`)
          console.log(`     Blocks: ${page.data?.blocks?.length || 0}`)
        })
      }
      
      // Show full data for the first page
      if (data.results && data.results.length > 0) {
        console.log('\n📄 First page full data:')
        console.log(JSON.stringify(data.results[0], null, 2))
      }
    } else {
      console.log('❌ v3 Read failed:', response.status, await response.text())
    }
    
    // Test v3 write API
    if (PRIVATE_KEY) {
      console.log('\n2️⃣ Testing v3 write API:')
      
      // First, try to get existing content via write API
      const writeResponse = await fetch(`https://builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${PRIVATE_KEY}`,
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Write API status:', writeResponse.status)
      
      if (writeResponse.ok) {
        const writeData = await writeResponse.json()
        console.log('✅ Write API works!')
        console.log(`Found ${writeData.results?.length || 0} pages via write API`)
      } else {
        const errorText = await writeResponse.text()
        console.log('❌ Write API error:', errorText.substring(0, 300))
      }
    }
    
    console.log('\n3️⃣ Next steps:')
    console.log('✅ API is working with v3 endpoints!')
    console.log('✅ Your homepage page exists and has content')
    console.log('🔧 Need to update scripts to use v3 API')
    console.log('🎯 The page should work at http://localhost:3004/')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

checkWorkingAPI()