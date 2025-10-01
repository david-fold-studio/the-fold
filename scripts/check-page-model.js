// Check what page models exist and their field definitions
async function checkPageModel() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  
  try {
    console.log('🔍 Checking existing page models...')
    
    // Get all models
    const response = await fetch('https://builder.io/api/v2/content-types', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      console.log('Trying different endpoint...')
      const response2 = await fetch('https://builder.io/api/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
          'Content-Type': 'application/json',
        }
      })
      
      if (response2.ok) {
        const models = await response2.json()
        console.log('📋 Found models:', models.map(m => m.name))
        return models
      }
    }

    const models = await response.json()
    console.log('📋 Found models:', models)
    
    return models
  } catch (error) {
    console.error('❌ Error checking models:', error.message)
    return null
  }
}

// Also check the specific page content
async function checkPageContent() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  const pageId = '90e11111b70240bd86b00b2b390d6be9'
  
  try {
    console.log('🔍 Checking page content...')
    
    const response = await fetch(`https://builder.io/api/v1/content/page/${pageId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
      }
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const content = await response.json()
    console.log('📋 Page data structure:', Object.keys(content.data || {}))
    console.log('📋 SEO data:', content.data?.seo ? 'Present' : 'Missing')
    console.log('📋 OpenGraph data:', content.data?.openGraph ? 'Present' : 'Missing')
    
    return content
  } catch (error) {
    console.error('❌ Error checking page:', error.message)
    return null
  }
}

async function main() {
  await checkPageModel()
  console.log('\n' + '='.repeat(50) + '\n')
  await checkPageContent()
}

main()