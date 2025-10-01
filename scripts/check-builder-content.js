/**
 * Check what content exists in Builder.io space
 */

const { default: fetch } = require('node-fetch')
require('dotenv').config({ path: '.env.local' })

const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY

async function checkBuilderContent() {
  try {
    console.log('🔍 Checking Builder.io content...')
    console.log('🔑 Using API key:', BUILDER_API_KEY ? `${BUILDER_API_KEY.substring(0, 8)}...` : 'Not found')
    
    // Check pages
    console.log('\n📄 Checking PAGES:')
    const pagesResponse = await fetch(`https://cdn.builder.io/api/v1/page?apiKey=${BUILDER_API_KEY}&limit=20`)
    const pagesData = await pagesResponse.json()
    
    if (pagesData.results && pagesData.results.length > 0) {
      console.log(`✅ Found ${pagesData.results.length} pages:`)
      pagesData.results.forEach((page, index) => {
        console.log(`  ${index + 1}. "${page.name}" - URL: ${page.data?.url || 'No URL'} - Status: ${page.published}`)
      })
    } else {
      console.log('❌ No pages found')
    }
    
    // Check homepage model
    console.log('\n🏠 Checking HOMEPAGE model:')
    const homepageResponse = await fetch(`https://cdn.builder.io/api/v1/homepage?apiKey=${BUILDER_API_KEY}&limit=10`)
    const homepageData = await homepageResponse.json()
    
    if (homepageData.results && homepageData.results.length > 0) {
      console.log(`✅ Found ${homepageData.results.length} homepage entries:`)
      homepageData.results.forEach((entry, index) => {
        console.log(`  ${index + 1}. "${entry.name}" - Status: ${entry.published}`)
      })
    } else {
      console.log('❌ No homepage model entries found')
    }
    
    // Check what models exist
    console.log('\n🏗️ Checking available models:')
    try {
      const modelsResponse = await fetch(`https://builder.io/api/v1/models?apiKey=${BUILDER_API_KEY}`)
      const modelsData = await modelsResponse.json()
      
      if (modelsData && modelsData.length > 0) {
        console.log('✅ Available models:')
        modelsData.forEach((model, index) => {
          console.log(`  ${index + 1}. ${model.name} (${model.kind})`)
        })
      }
    } catch (error) {
      console.log('⚠️ Could not fetch models list (might need different API key)')
    }
    
    // Check sections
    console.log('\n📦 Checking SECTIONS:')
    const sectionsResponse = await fetch(`https://cdn.builder.io/api/v1/section?apiKey=${BUILDER_API_KEY}&limit=10`)
    const sectionsData = await sectionsResponse.json()
    
    if (sectionsData.results && sectionsData.results.length > 0) {
      console.log(`✅ Found ${sectionsData.results.length} sections:`)
      sectionsData.results.forEach((section, index) => {
        console.log(`  ${index + 1}. "${section.name}" - Status: ${section.published}`)
      })
    } else {
      console.log('❌ No sections found')
    }
    
    console.log('\n💡 Recommendations:')
    console.log('1. Check your Builder.io dashboard directly at https://builder.io/content')
    console.log('2. Look in the "Pages" section for homepage entries')
    console.log('3. If no pages exist, we may need to create one manually in the UI first')
    
  } catch (error) {
    console.error('❌ Error checking content:', error.message)
    console.log('\n💡 This might be due to:')
    console.log('1. API key permissions')
    console.log('2. CORS restrictions')
    console.log('3. Builder.io API changes')
  }
}

checkBuilderContent()