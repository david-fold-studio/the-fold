/**
 * Check current homepage status in Builder.io
 */

const { default: fetch } = require('node-fetch')
require('dotenv').config({ path: '.env.local' })

const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY

async function checkHomepage() {
  try {
    console.log('🔍 Checking homepage status...')
    
    // Check if homepage content exists
    const response = await fetch(`https://cdn.builder.io/api/v1/page?apiKey=${BUILDER_API_KEY}&userAttributes.urlPath=%2F`)
    const data = await response.json()
    
    console.log('📊 Results:')
    console.log('- Response status:', response.status)
    console.log('- Results found:', data.results?.length || 0)
    
    if (data.results && data.results.length > 0) {
      console.log('✅ Homepage content found!')
      data.results.forEach((result, index) => {
        console.log(`  ${index + 1}. Name: ${result.name}`)
        console.log(`     ID: ${result.id}`) 
        console.log(`     Published: ${result.published}`)
        console.log(`     Model: ${result.modelName}`)
        console.log(`     Blocks: ${result.data?.blocks?.length || 0}`)
      })
    } else {
      console.log('❌ No homepage content found')
      console.log('💡 Possible issues:')
      console.log('  1. Content needs to be published in Builder.io')
      console.log('  2. URL path might not match')
      console.log('  3. Content might be in draft state')
    }
    
    // Also check the homepage model directly
    console.log('\n🔍 Checking homepage model...')
    const homepageResponse = await fetch(`https://cdn.builder.io/api/v1/homepage?apiKey=${BUILDER_API_KEY}`)
    const homepageData = await homepageResponse.json()
    
    console.log('📋 Homepage model results:')
    console.log('- Status:', homepageResponse.status)
    console.log('- Results:', homepageData.results?.length || 0)
    
    if (homepageData.results && homepageData.results.length > 0) {
      homepageData.results.forEach((result, index) => {
        console.log(`  ${index + 1}. ${result.name} (${result.published})`)
      })
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

checkHomepage()