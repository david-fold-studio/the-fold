// Debug what's actually in the Employwell Builder.io entry
const { builder } = require('@builder.io/sdk')

// Initialize builder
builder.init('4a242b8010c048df9c06392f47457ba0')

async function debugEmploywellEntry() {
  console.log('🔍 Debugging Employwell entry in Builder.io...\n')
  
  try {
    // Try different ways to fetch the entry
    console.log('📋 Method 1: Get by ID directly...')
    const byId = await builder.get('case-studies', '262d11f177e44c1fb7a87070e75d8ac7').promise()
    
    if (byId) {
      console.log('✅ Found entry by ID')
      console.log('📊 Entry data keys:', Object.keys(byId.data || {}))
      console.log('📝 Has content field:', !!byId.data?.content)
      console.log('📏 Content length:', byId.data?.content?.length || 0)
      console.log('📄 Content preview:', (byId.data?.content || '').substring(0, 100) + '...')
    } else {
      console.log('❌ No entry found by ID')
    }
    
    console.log('\n📋 Method 2: Get by urlSlug query...')
    const bySlug = await builder
      .get('case-studies', {
        query: { 'data.urlSlug': 'employwell-healthcare' }
      })
      .promise()
    
    if (bySlug) {
      console.log('✅ Found entry by slug query')
      console.log('📊 Entry data keys:', Object.keys(bySlug.data || {}))
      console.log('📝 Has content field:', !!bySlug.data?.content)
      console.log('📏 Content length:', bySlug.data?.content?.length || 0)
    } else {
      console.log('❌ No entry found by slug query')
    }
    
    console.log('\n📋 Method 3: Get all case studies...')
    const allStudies = await builder.getAll('case-studies', { limit: 10 })
    
    if (allStudies && allStudies.length > 0) {
      console.log(`✅ Found ${allStudies.length} case studies`)
      
      const employwell = allStudies.find(study => 
        study.name?.includes('Employwell') || 
        study.data?.urlSlug === 'employwell-healthcare'
      )
      
      if (employwell) {
        console.log('🎯 Found Employwell in list!')
        console.log('📋 Entry name:', employwell.name)
        console.log('📊 Entry data keys:', Object.keys(employwell.data || {}))
        console.log('📝 Has content field:', !!employwell.data?.content)
        console.log('📏 Content length:', employwell.data?.content?.length || 0)
        
        // Show all data fields
        console.log('\n📄 All data fields:')
        Object.keys(employwell.data || {}).forEach(key => {
          const value = employwell.data[key]
          const type = Array.isArray(value) ? 'array' : typeof value
          const preview = type === 'string' ? value.substring(0, 50) + '...' : `(${type})`
          console.log(`  - ${key}: ${preview}`)
        })
        
        return employwell
      } else {
        console.log('❌ Employwell not found in list')
      }
    } else {
      console.log('❌ No case studies found')
    }
    
  } catch (error) {
    console.error('❌ Error debugging entry:', error.message)
  }
  
  return null
}

async function fixContentField() {
  console.log('\n🔧 Attempting to fix content field...')
  
  // Re-read the MDX file
  const fs = require('fs')
  const MDX_FILE_PATH = '/Users/daviddejong/Library/CloudStorage/OneDrive-TheFoldStudio/The Fold Studio/Sales & Marketing/Pitch Project/case-study-employwell.mdx'
  
  try {
    const mdxContent = fs.readFileSync(MDX_FILE_PATH, 'utf8')
    console.log('📖 Read MDX content:', mdxContent.length, 'characters')
    
    // Try updating with Builder SDK
    const result = await builder.update('case-studies', '262d11f177e44c1fb7a87070e75d8ac7', {
      data: {
        content: mdxContent,
        // Also try alternative field names
        body: mdxContent,
        markdown: mdxContent,
        text: mdxContent
      }
    }).promise()
    
    if (result) {
      console.log('✅ Updated content field with Builder SDK')
      return true
    } else {
      console.log('❌ Failed to update with Builder SDK')
      return false
    }
    
  } catch (error) {
    console.error('❌ Error fixing content:', error.message)
    return false
  }
}

async function run() {
  const entry = await debugEmploywellEntry()
  
  if (entry && (!entry.data?.content || entry.data.content.length < 1000)) {
    console.log('\n💡 Content field appears to be missing or incomplete')
    await fixContentField()
    
    // Verify the fix
    console.log('\n🔍 Verifying fix...')
    await debugEmploywellEntry()
  }
  
  console.log('\n✅ Debug complete!')
}

run()