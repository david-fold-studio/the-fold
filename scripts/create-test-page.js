// Create a test page for Builder.io with a different URL
const fs = require('fs')

async function createTestPage() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  
  // Test page data with simpler sections
  const pageData = {
    name: 'Builder Test Page - SEO',
    data: {
      title: 'Builder Test Page',
      url: '/builder-test',
      seo: {
        metaTitle: 'Test Page - The Fold Studio',
        metaDescription: 'This is a test page to verify Builder.io integration with SEO management.',
        keywords: [
          { keyword: 'test page' },
          { keyword: 'Builder.io' },
          { keyword: 'SEO testing' }
        ],
        robots: 'noindex,nofollow'
      },
      openGraph: {
        title: 'Builder.io Test Page',
        description: 'Testing Builder.io integration',
        type: 'website'
      },
      // Simple content - just text blocks instead of complex components
      blocks: [
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Text',
            options: {
              text: '<h1>Welcome to Builder.io Test Page</h1><p>This page demonstrates SEO management with Builder.io</p>'
            }
          }
        }
      ]
    },
    published: 'published'
  }

  try {
    console.log('🚀 Creating Builder.io test page...')
    
    const response = await fetch('https://builder.io/api/v1/write/page', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageData)
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`API Error (${response.status}): ${error}`)
    }

    const result = await response.json()
    
    console.log('✅ Test page created successfully!')
    console.log('📋 Page details:')
    console.log(`   - Name: ${result.name}`)
    console.log(`   - ID: ${result.id}`)
    console.log(`   - URL: ${result.data?.url}`)
    console.log('\n🎯 Next steps:')
    console.log('1. Update Builder.io preview URL to: http://localhost:3002/builder-test')
    console.log('2. Test the page in Builder.io')
    console.log('3. Ask Claude to update SEO settings')
    
    return result
  } catch (error) {
    console.error('❌ Test page creation failed:', error.message)
    return null
  }
}

createTestPage()