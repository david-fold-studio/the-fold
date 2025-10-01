// Simple debug using direct API calls
const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
const ENTRY_ID = '262d11f177e44c1fb7a87070e75d8ac7'

async function debugEntry() {
  try {
    console.log('🔍 Fetching Employwell entry directly...')
    
    const response = await fetch(`https://builder.io/api/v1/content/${ENTRY_ID}`, {
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
      }
    })
    
    console.log('📡 Status:', response.status)
    const text = await response.text()
    
    if (text.startsWith('{')) {
      const data = JSON.parse(text)
      console.log('✅ Got JSON response!')
      console.log('📋 Entry name:', data.name)
      console.log('📊 Data keys:', Object.keys(data.data || {}))
      
      // Check for content field
      if (data.data?.content) {
        console.log('✅ Has content field!')
        console.log('📏 Content length:', data.data.content.length)
        console.log('📄 Content preview:', data.data.content.substring(0, 200) + '...')
      } else {
        console.log('❌ No content field found')
        console.log('📄 Available fields:')
        Object.keys(data.data || {}).forEach(key => {
          const value = data.data[key]
          const type = typeof value
          const preview = type === 'string' && value.length > 50 ? value.substring(0, 50) + '...' : value
          console.log(`  - ${key} (${type}): ${preview}`)
        })
      }
      
      return data
    } else {
      console.log('❌ Got HTML response')
      console.log('📄 Response:', text.substring(0, 200))
      return null
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    return null
  }
}

async function fixContentField() {
  const fs = require('fs')
  const MDX_FILE_PATH = '/Users/daviddejong/Library/CloudStorage/OneDrive-TheFoldStudio/The Fold Studio/Sales & Marketing/Pitch Project/case-study-employwell.mdx'
  
  try {
    console.log('\n🔧 Reading MDX file and updating content...')
    const mdxContent = fs.readFileSync(MDX_FILE_PATH, 'utf8')
    console.log('📖 MDX content length:', mdxContent.length)
    
    const updateData = {
      data: {
        content: mdxContent
      }
    }
    
    const response = await fetch(`https://builder.io/api/v1/content/${ENTRY_ID}`, {
      method: 'PATCH', // Try PATCH instead of PUT
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    })
    
    console.log('📡 Update status:', response.status)
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ Content updated successfully!')
      return true
    } else {
      const text = await response.text()
      console.log('❌ Update failed:', text.substring(0, 200))
      return false
    }
    
  } catch (error) {
    console.error('❌ Error updating content:', error.message)
    return false
  }
}

async function run() {
  const entry = await debugEntry()
  
  if (entry && (!entry.data?.content || entry.data.content.length < 1000)) {
    console.log('\n💡 Content field needs fixing...')
    const fixed = await fixContentField()
    
    if (fixed) {
      console.log('\n🔍 Verifying fix...')
      await debugEntry()
    }
  } else if (entry && entry.data?.content) {
    console.log('\n✅ Content field looks good!')
  }
}

run()