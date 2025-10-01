// Add SEO fields as custom inputs to the existing page
async function addSEOFields() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  const pageId = '90e11111b70240bd86b00b2b390d6be9'
  
  try {
    console.log('🚀 Adding SEO fields to page...')
    
    // First, get the current page
    const getResponse = await fetch(`https://builder.io/api/v1/write/page/${pageId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
      }
    })

    if (!getResponse.ok) {
      throw new Error(`Get failed: ${getResponse.status}`)
    }

    const currentPage = await getResponse.json()
    
    // Add custom inputs for SEO
    const updatedPage = {
      ...currentPage,
      inputs: [
        {
          name: 'metaTitle',
          friendlyName: 'Meta Title',
          type: 'string',
          helperText: 'SEO title for search engines (50-60 characters)',
          defaultValue: 'Test Page - The Fold Studio | SEO Demo'
        },
        {
          name: 'metaDescription', 
          friendlyName: 'Meta Description',
          type: 'longText',
          helperText: 'SEO description for search results (120-160 characters)',
          defaultValue: 'Demonstration of comprehensive SEO management with Builder.io CMS'
        },
        {
          name: 'keywords',
          friendlyName: 'Focus Keywords',
          type: 'string',
          helperText: 'Comma-separated keywords for SEO',
          defaultValue: 'Builder.io SEO, CMS management, programmatic updates'
        },
        {
          name: 'ogImage',
          friendlyName: 'Social Media Image',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'],
          helperText: 'Image for social media sharing (1200x630px recommended)'
        }
      ]
    }

    // Update the page with custom inputs
    const updateResponse = await fetch(`https://builder.io/api/v1/write/page/${pageId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPage)
    })

    if (!updateResponse.ok) {
      const error = await updateResponse.text()
      throw new Error(`Update failed: ${updateResponse.status} - ${error}`)
    }

    const result = await updateResponse.json()
    
    console.log('✅ SEO fields added successfully!')
    console.log('📋 Added fields:')
    console.log('   - Meta Title')
    console.log('   - Meta Description') 
    console.log('   - Focus Keywords')
    console.log('   - Social Media Image')
    
    console.log('\n🎯 Next steps:')
    console.log('1. Refresh Builder.io interface')
    console.log('2. Look for new SEO fields in the right panel')
    console.log('3. Test editing the fields')
    
    return result
  } catch (error) {
    console.error('❌ Adding SEO fields failed:', error.message)
    return null
  }
}

addSEOFields()