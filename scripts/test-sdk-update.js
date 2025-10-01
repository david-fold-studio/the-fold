// Test using Builder.io SDK directly for updates
const { builder } = require('@builder.io/sdk')
const fs = require('fs')

// Initialize builder with public key
builder.init('4a242b8010c048df9c06392f47457ba0')

const ENTRY_ID = '262d11f177e44c1fb7a87070e75d8ac7'
const MDX_FILE_PATH = '/Users/daviddejong/Library/CloudStorage/OneDrive-TheFoldStudio/The Fold Studio/Sales & Marketing/Pitch Project/case-study-employwell.mdx'

async function testSDKOperations() {
  console.log('🔍 Testing Builder.io SDK operations...\n')
  
  try {
    // First, try to read the existing entry
    console.log('📋 Step 1: Reading existing entry with SDK...')
    
    const entry = await builder.get('case-studies', ENTRY_ID).promise()
    
    if (entry) {
      console.log('✅ Successfully read entry with SDK!')
      console.log('📋 Entry name:', entry.name)
      console.log('📊 Data fields:', Object.keys(entry.data || {}))
      console.log('📝 Has content field:', !!entry.data?.content)
      
      if (entry.data?.content) {
        console.log('📏 Current content length:', entry.data.content.length)
        console.log('📄 Current content preview:', entry.data.content.substring(0, 100) + '...')
      } else {
        console.log('📄 Content field is empty or missing')
      }
      
      // Now try to update with SDK
      console.log('\n🔧 Step 2: Testing SDK update...')
      
      const mdxContent = fs.readFileSync(MDX_FILE_PATH, 'utf8')
      console.log('📖 MDX content loaded:', mdxContent.length, 'characters')
      
      // Try different update approaches
      const updateMethods = [
        {
          name: 'builder.update() with full data',
          method: async () => {
            return await builder.update('case-studies', ENTRY_ID, {
              data: {
                ...entry.data,
                content: mdxContent
              }
            }).promise()
          }
        },
        {
          name: 'builder.update() with only content',
          method: async () => {
            return await builder.update('case-studies', ENTRY_ID, {
              data: {
                content: mdxContent
              }
            }).promise()
          }
        },
        {
          name: 'builder.patch() with content',
          method: async () => {
            // Try patch if it exists
            if (builder.patch) {
              return await builder.patch('case-studies', ENTRY_ID, {
                data: {
                  content: mdxContent
                }
              }).promise()
            } else {
              throw new Error('patch method not available')
            }
          }
        }
      ]
      
      for (const updateMethod of updateMethods) {
        console.log(`\n🔧 Trying: ${updateMethod.name}`)
        
        try {
          const result = await updateMethod.method()
          
          if (result) {
            console.log('✅ Update successful!')
            console.log('📋 Result keys:', Object.keys(result))
            
            // Verify the update worked
            console.log('\n🔍 Verifying update...')
            const updatedEntry = await builder.get('case-studies', ENTRY_ID).promise()
            
            if (updatedEntry?.data?.content) {
              console.log('✅ Content field now has content!')
              console.log('📏 Updated content length:', updatedEntry.data.content.length)
              console.log('📄 Content preview:', updatedEntry.data.content.substring(0, 100) + '...')
              return { success: true, method: updateMethod.name }
            } else {
              console.log('❌ Content field still empty after update')
            }
          } else {
            console.log('❌ Update returned null/undefined')
          }
          
        } catch (updateError) {
          console.log('❌ Update failed:', updateError.message)
        }
      }
      
    } else {
      console.log('❌ Could not read entry with SDK')
    }
    
  } catch (error) {
    console.error('❌ SDK operation failed:', error.message)
    console.error('Stack:', error.stack)
  }
  
  return { success: false }
}

async function testWriteAPI() {
  console.log('\n🚀 Testing Builder.io Write API...\n')
  
  // Test if we can create a new entry to understand the API better
  const testEntry = {
    modelId: '7974871d708e40cdacc287be71235a07',
    name: 'Test Entry - Delete Me',
    published: 'draft',
    data: {
      title: 'Test Entry',
      description: 'This is a test entry to understand the API',
      urlSlug: 'test-entry-delete-me',
      content: 'This is test content to see if the content field works.'
    }
  }
  
  const writeEndpoints = [
    'https://builder.io/api/v1/write',
    'https://builder.io/api/v2/write', 
    'https://builder.io/api/v3/write'
  ]
  
  for (const endpoint of writeEndpoints) {
    console.log(`🔗 Testing: ${endpoint}`)
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer bpk-5fb282d3b27447389012cc30a1f21838`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testEntry)
      })
      
      console.log('📡 Status:', response.status)
      console.log('📄 Content-Type:', response.headers.get('content-type'))
      
      const responseText = await response.text()
      
      if (responseText.startsWith('{')) {
        const result = JSON.parse(responseText)
        console.log('✅ Got JSON response!')
        console.log('📋 Response:', result)
        
        if (result.id) {
          console.log('🎉 Successfully created test entry!')
          console.log('🆔 Test entry ID:', result.id)
          return { success: true, entryId: result.id }
        }
      } else {
        console.log('❌ Got HTML response')
        console.log('📄 Preview:', responseText.substring(0, 200))
      }
      
    } catch (error) {
      console.log('❌ Request failed:', error.message)
    }
  }
  
  return { success: false }
}

async function run() {
  const sdkResult = await testSDKOperations()
  
  if (!sdkResult.success) {
    console.log('\n💡 SDK approach failed, trying Write API...')
    const writeResult = await testWriteAPI()
    
    if (writeResult.success) {
      console.log('\n✅ Write API works! We can create entries.')
      console.log('🔧 Now we know how to add content to Builder.io')
    } else {
      console.log('\n❌ All methods failed')
      console.log('💡 May need to check Builder.io permissions or API key scopes')
    }
  } else {
    console.log('\n🎉 Found working method:', sdkResult.method)
    console.log('✅ Ready to update the real entry!')
  }
}

run()