/**
 * Ensure the homepage page is visible in Builder.io dashboard
 */

const { default: fetch } = require('node-fetch')
require('dotenv').config({ path: '.env.local' })

async function ensurePageVisible() {
  const PRIVATE_KEY = process.env.BUILDER_PRIVATE_KEY
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY
  
  console.log('🔧 Ensuring homepage is visible in Builder.io dashboard...')
  
  if (!PRIVATE_KEY) {
    console.log('❌ No private key - cannot update page settings')
    return
  }
  
  try {
    // Get the existing homepage
    const getResponse = await fetch(`https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&query.data.url=/`)
    const getData = await getResponse.json()
    
    if (!getData.results || getData.results.length === 0) {
      console.log('❌ No homepage found')
      return
    }
    
    const homepage = getData.results[0]
    console.log('✅ Found homepage:', homepage.name, homepage.id)
    
    // Update the page to ensure it's properly configured
    const updateData = {
      ...homepage,
      data: {
        ...homepage.data,
        url: '/',
        title: 'The Fold Studio - Custom Software Design & Development',
        // Ensure it's marked as a page
        '@type': '@builder.io/core:Page'
      },
      published: 'published',
      meta: {
        ...homepage.meta,
        kind: 'page',
        hasLinks: true
      }
    }
    
    // Update via write API
    const updateResponse = await fetch(`https://builder.io/api/v1/write/${PUBLIC_KEY}/page/${homepage.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${PRIVATE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })
    
    if (updateResponse.ok) {
      const result = await updateResponse.json()
      console.log('✅ Homepage updated successfully!')
      console.log('📍 Page ID:', result.id)
      console.log('🌐 Should be visible at: https://builder.io/content')
      console.log('🎯 Look for "Homepage" in your content list')
      console.log('📝 Preview URL should be: http://localhost:3002/')
    } else {
      const errorText = await updateResponse.text()
      console.log('❌ Update failed:', updateResponse.status, errorText)
      
      // Try alternative approach - create new page entry
      console.log('\n🔄 Trying alternative approach...')
      console.log('Go to Builder.io dashboard manually:')
      console.log('1. Look for "Content" or "Pages" section')
      console.log('2. You should see "Homepage" entry')
      console.log('3. If not, your content exists but might be in a different view')
      console.log('4. Try the direct URL: https://builder.io/content/4a242b8010c048df9c06392f47457ba0/page')
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\n💡 Manual steps:')
    console.log('1. Go to https://builder.io')
    console.log('2. Make sure you\'re in the right space')
    console.log('3. Look for "Content", "Pages", or "All Content"')
    console.log('4. Search for "Homepage" or URL "/"')
  }
}

ensurePageVisible()