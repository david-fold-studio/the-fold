/**
 * Compare what's in page model vs homepage data model
 */

const { default: fetch } = require('node-fetch')
require('dotenv').config({ path: '.env.local' })

async function compareModels() {
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY
  
  console.log('🔍 Comparing page model vs homepage data model...')
  
  try {
    // Check page model
    console.log('\n📄 PAGE MODEL content:')
    const pageResponse = await fetch(`https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_KEY}&limit=10`)
    const pageData = await pageResponse.json()
    
    if (pageData.results) {
      console.log(`✅ Found ${pageData.results.length} pages:`)
      pageData.results.forEach((page, index) => {
        console.log(`  ${index + 1}. "${page.name}" - URL: ${page.data?.url} - Blocks: ${page.data?.blocks?.length || 0}`)
      })
    }
    
    // Check homepage data model
    console.log('\n🏠 HOMEPAGE DATA MODEL content:')
    const homepageResponse = await fetch(`https://cdn.builder.io/api/v3/content/homepage?apiKey=${PUBLIC_KEY}&limit=10`)
    
    if (homepageResponse.ok) {
      const homepageData = await homepageResponse.json()
      if (homepageData.results) {
        console.log(`✅ Found ${homepageData.results.length} homepage entries:`)
        homepageData.results.forEach((entry, index) => {
          console.log(`  ${index + 1}. "${entry.name}" - Blocks: ${entry.data?.blocks?.length || 0}`)
        })
      } else {
        console.log('❌ No homepage data model entries')
      }
    } else {
      console.log('❌ Homepage data model does not exist or is empty')
    }
    
    // Find the root URL content
    console.log('\n🎯 Looking for root URL (/) content:')
    const rootPage = pageData.results?.find(page => page.data?.url === '/')
    if (rootPage) {
      console.log('✅ Found homepage in PAGE model:')
      console.log(`   Name: ${rootPage.name}`)
      console.log(`   ID: ${rootPage.id}`)
      console.log(`   Blocks: ${rootPage.data?.blocks?.length}`)
      console.log(`   Published: ${rootPage.published}`)
      
      // Check if components are registered properly
      if (rootPage.data?.blocks) {
        console.log('   Components used:')
        rootPage.data.blocks.forEach((block, index) => {
          if (block.component) {
            console.log(`     ${index + 1}. ${block.component.name}`)
          }
        })
      }
    } else {
      console.log('❌ No page with URL "/" found in page model')
    }
    
    console.log('\n💡 Recommendations:')
    if (rootPage) {
      console.log('✅ Your homepage IS in the page model - it should have visual editing!')
      console.log('🎯 Go to Builder.io → Pages → "Homepage" → Click "Edit"')
      console.log('🎯 Make sure preview URL is set to: http://localhost:3004/')
      console.log('🎯 You should see full visual editing interface')
    } else {
      console.log('❌ Homepage not found in page model')
      console.log('🔧 Need to create it properly as a page')
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

compareModels()