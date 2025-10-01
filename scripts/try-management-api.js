// Try Builder.io Management API with different approaches
const fs = require('fs')

const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
const BUILDER_PUBLIC_KEY = '4a242b8010c048df9c06392f47457ba0'
const ENTRY_ID = '262d11f177e44c1fb7a87070e75d8ac7'
const MODEL_ID = '7974871d708e40cdacc287be71235a07'
const MDX_FILE_PATH = '/Users/daviddejong/Library/CloudStorage/OneDrive-TheFoldStudio/The Fold Studio/Sales & Marketing/Pitch Project/case-study-employwell.mdx'

async function tryManagementAPI() {
  console.log('🔍 Trying Builder.io Management API approaches...\n')
  
  const testContent = fs.readFileSync(MDX_FILE_PATH, 'utf8')
  console.log('📖 MDX content loaded:', testContent.length, 'characters\n')
  
  // Different API patterns to try
  const approaches = [
    {
      name: 'Management API - Update Entry',
      url: `https://builder.io/api/v1/content/${ENTRY_ID}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: {
        data: {
          content: testContent.substring(0, 1000) + '...' // Just first 1000 chars for testing
        }
      }
    },
    {
      name: 'Management API - Update with Model',
      url: `https://builder.io/api/v1/content/case-studies/${ENTRY_ID}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: {
        data: {
          content: testContent.substring(0, 1000) + '...'
        }
      }
    },
    {
      name: 'Write API - Correct Format',
      url: 'https://builder.io/api/v1/write',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: {
        modelId: MODEL_ID,
        entryId: ENTRY_ID,
        data: {
          content: testContent.substring(0, 1000) + '...'
        }
      }
    },
    {
      name: 'GraphQL API',
      url: 'https://builder.io/api/graphql',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: {
        query: `
          mutation UpdateContent($id: String!, $data: JSON!) {
            updateContent(id: $id, modelName: "case-studies", input: { data: $data }) {
              id
              data
            }
          }
        `,
        variables: {
          id: ENTRY_ID,
          data: {
            content: testContent.substring(0, 500) + '...'
          }
        }
      }
    },
    {
      name: 'Alternative Write API',
      url: 'https://builder.io/api/v1/content',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: {
        id: ENTRY_ID,
        model: 'case-studies',
        data: {
          content: testContent.substring(0, 1000) + '...'
        }
      }
    },
    {
      name: 'Admin API',
      url: `https://builder.io/api/v1/admin/content/${MODEL_ID}/${ENTRY_ID}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: {
        data: {
          content: testContent.substring(0, 1000) + '...'
        }
      }
    }
  ]
  
  for (const approach of approaches) {
    console.log(`🔧 Testing: ${approach.name}`)
    console.log(`🔗 ${approach.method} ${approach.url}`)
    
    try {
      const response = await fetch(approach.url, {
        method: approach.method,
        headers: approach.headers,
        body: JSON.stringify(approach.body)
      })
      
      console.log(`📡 Status: ${response.status}`)
      console.log(`📄 Content-Type: ${response.headers.get('content-type')}`)
      
      // Log response headers to understand what's happening
      const responseHeaders = {}
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })
      console.log(`📋 Headers:`, JSON.stringify(responseHeaders, null, 2))
      
      const responseText = await response.text()
      
      if (responseText.startsWith('{') || responseText.startsWith('[')) {
        try {
          const data = JSON.parse(responseText)
          console.log('✅ Got JSON response!')
          console.log('📊 Response keys:', Object.keys(data))
          console.log('📄 Response:', JSON.stringify(data, null, 2))
          
          if (response.status >= 200 && response.status < 300) {
            console.log('🎉 SUCCESS! This approach worked!')
            return { success: true, approach, data }
          } else if (data.message || data.error) {
            console.log('⚠️ Error message:', data.message || data.error)
          }
        } catch (parseError) {
          console.log('❌ JSON parse error:', parseError.message)
        }
      } else {
        console.log('❌ Got non-JSON response')
        console.log('📄 Response preview:', responseText.substring(0, 300))
      }
      
    } catch (error) {
      console.log('❌ Request failed:', error.message)
    }
    
    console.log('---\n')
  }
  
  return { success: false }
}

async function verifyBrowser() {
  console.log('🌐 Let\'s also check what the browser network shows...')
  console.log('💡 Try opening the browser dev tools and visiting:')
  console.log(`   http://localhost:3007/case-studies/employwell-healthcare`)
  console.log('💡 Check the Network tab for any API calls to Builder.io')
  console.log('💡 This will show us the exact requests your app makes\n')
}

async function run() {
  const result = await tryManagementAPI()
  
  if (result.success) {
    console.log('🎉 Found working API approach:', result.approach.name)
    console.log('✅ Ready to add full content!')
  } else {
    console.log('❌ All approaches failed')
    console.log('💡 Let\'s check the browser network tab for clues...')
    await verifyBrowser()
  }
}

run()