/**
 * Move Process section to position 2 (after Hero)
 */

const { default: fetch } = require('node-fetch')
require('dotenv').config({ path: '.env.local' })

async function moveProcessSection() {
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY
  const PRIVATE_KEY = process.env.BUILDER_PRIVATE_KEY
  
  console.log('🔄 Moving Process section to position 2...')
  
  if (!PRIVATE_KEY) {
    console.log('❌ No private key - cannot update page')
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
    console.log('✅ Found homepage with', homepage.data?.blocks?.length, 'blocks')
    
    // Find the Process section (currently at position 6)
    const blocks = [...homepage.data.blocks]
    let processIndex = -1
    
    blocks.forEach((block, index) => {
      if (block.component && block.component.name === 'Process') {
        processIndex = index
        console.log(`📍 Found Process section at position ${index + 1}`)
      }
    })
    
    if (processIndex === -1) {
      console.log('❌ Process section not found')
      return
    }
    
    // Remove Process from current position and insert at position 2 (index 1)
    const processBlock = blocks.splice(processIndex, 1)[0]
    blocks.splice(1, 0, processBlock) // Insert at index 1 (position 2)
    
    console.log('🔄 Rearranged blocks:')
    blocks.forEach((block, index) => {
      if (block.component) {
        console.log(`  ${index + 1}. ${block.component.name}`)
      }
    })
    
    // Update the page
    const updateData = {
      ...homepage,
      data: {
        ...homepage.data,
        blocks: blocks
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
      console.log('✅ Process section moved successfully!')
      console.log('🎯 Process is now at position 2 (after Hero)')
      console.log('🌐 Check Builder.io editor to see the change')
      console.log('📝 Preview at: http://localhost:3002/')
      
      // Auto-delete this script after successful execution
      const fs = require('fs')
      const path = require('path')
      const scriptPath = path.join(__dirname, 'move-process-section.js')
      
      setTimeout(() => {
        try {
          fs.unlinkSync(scriptPath)
          console.log('🗑️  Script auto-deleted after successful execution')
        } catch (err) {
          console.log('⚠️  Could not auto-delete script:', err.message)
        }
      }, 3000) // 3 second delay to ensure console output completes and user can read
      
    } else {
      const errorText = await updateResponse.text()
      console.log('❌ Update failed:', updateResponse.status, errorText)
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

moveProcessSection()