// Add the content field to the existing Employwell entry
const fs = require('fs')

const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
const ENTRY_ID = '262d11f177e44c1fb7a87070e75d8ac7'
const MDX_FILE_PATH = '/Users/daviddejong/Library/CloudStorage/OneDrive-TheFoldStudio/The Fold Studio/Sales & Marketing/Pitch Project/case-study-employwell.mdx'

async function addContentField() {
  try {
    console.log('📖 Reading MDX file...')
    const mdxContent = fs.readFileSync(MDX_FILE_PATH, 'utf8')
    console.log('✅ MDX content loaded:', mdxContent.length, 'characters')
    
    console.log('🔧 Adding content field to existing entry...')
    
    // Use Builder.io's content API to update the entry
    const updateData = {
      data: {
        content: mdxContent
      }
    }
    
    const response = await fetch(`https://builder.io/api/v2/content/${ENTRY_ID}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    })
    
    console.log('📡 Response status:', response.status)
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()))
    
    const responseText = await response.text()
    console.log('📄 Response preview:', responseText.substring(0, 500))
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ Content field added successfully!')
      return true
    } else {
      console.log('❌ Failed to add content field')
      return false
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    return false
  }
}

async function verifyContentField() {
  try {
    console.log('\n🔍 Verifying content field was added...')
    
    const response = await fetch(`https://builder.io/api/v2/content/${ENTRY_ID}`, {
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
      }
    })
    
    console.log('📡 Verify status:', response.status)
    const responseText = await response.text()
    
    if (responseText.startsWith('{')) {
      const data = JSON.parse(responseText)
      console.log('✅ Entry found!')
      console.log('📊 Data fields:', Object.keys(data.data || {}))
      
      if (data.data?.content) {
        console.log('✅ Content field exists!')
        console.log('📏 Content length:', data.data.content.length)
        console.log('📄 Content preview:', data.data.content.substring(0, 200) + '...')
        return true
      } else {
        console.log('❌ Content field still missing')
        return false
      }
    } else {
      console.log('❌ Got HTML response in verification')
      return false
    }
    
  } catch (error) {
    console.error('❌ Verification error:', error.message)
    return false
  }
}

async function run() {
  const added = await addContentField()
  
  if (added) {
    console.log('✅ Content field addition successful!')
    await verifyContentField()
  } else {
    console.log('❌ Failed to add content field')
  }
}

run()