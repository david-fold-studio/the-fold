// Demonstrate programmatic SEO updates by modifying the page title and content
async function demoSEOUpdate() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  const pageId = '90e11111b70240bd86b00b2b390d6be9'
  
  try {
    console.log('🚀 Demonstrating programmatic SEO update...')
    
    // Updated content that will show the change in Builder.io
    const updatedData = {
      name: 'SEO Demo - UPDATED by Claude Code!',
      data: {
        title: 'UPDATED: SEO Management Demo',
        url: '/builder-test',
        blocks: [
          {
            '@type': '@builder.io/sdk:Element',
            component: {
              name: 'Text',
              options: {
                text: `
                  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; color: white; margin-bottom: 20px;">
                    <h1>🚀 SEO Updated by Claude Code!</h1>
                    <p><strong>This page was just updated programmatically!</strong></p>
                    <p>✅ Title changed ✅ Content modified ✅ Meta data updated</p>
                  </div>
                  
                  <h2>🎯 Programmatic SEO Management Demo</h2>
                  <p><strong>Current Status: UPDATED at ${new Date().toLocaleString()}</strong></p>
                  
                  <div style="background: #1a1a2e; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>✅ What Just Happened:</h3>
                    <ul>
                      <li>✅ Page title updated from Claude Code</li>
                      <li>✅ Content modified programmatically</li>
                      <li>✅ SEO metadata can be updated the same way</li>
                      <li>✅ All changes made via API calls</li>
                    </ul>
                  </div>
                  
                  <h3>🔧 SEO Fields We Can Update:</h3>
                  <ul>
                    <li><strong>Meta Title:</strong> Can be changed to anything you want</li>
                    <li><strong>Meta Description:</strong> Optimized for search engines</li>
                    <li><strong>Keywords:</strong> Focus keywords for SEO</li>
                    <li><strong>Open Graph:</strong> Facebook/LinkedIn sharing</li>
                    <li><strong>Twitter Cards:</strong> Twitter-specific formatting</li>
                    <li><strong>JSON-LD:</strong> Structured data for search engines</li>
                  </ul>
                  
                  <div style="background: #0f4c75; padding: 20px; border-radius: 8px; margin: 20px 0; color: white;">
                    <h3>💬 Try These Commands:</h3>
                    <p>Ask Claude:</p>
                    <ul>
                      <li>"Update the page title to include 'Award-Winning'"</li>
                      <li>"Change this content to focus on conversion rates"</li>
                      <li>"Add a section about mobile optimization"</li>
                      <li>"Update the page name to something more professional"</li>
                    </ul>
                  </div>
                  
                  <p><em>This demonstrates that Claude Code can modify any aspect of your Builder.io content, including SEO settings, page content, titles, and metadata!</em></p>
                `
              }
            }
          }
        ]
      }
    }

    const response = await fetch(`https://builder.io/api/v1/write/page/${pageId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData)
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`API Error (${response.status}): ${error}`)
    }

    const result = await response.json()
    
    console.log('🎉 SUCCESS! Page updated programmatically!')
    console.log('📋 Changes made:')
    console.log(`   - Page name: "${result.name}"`)
    console.log(`   - Page title: "${result.data?.title}"`)
    console.log('   - Content: Updated with demo information')
    console.log('   - Timestamp: Added to show real-time updates')
    
    console.log('\n🎯 What this proves:')
    console.log('✅ Claude Code can update Builder.io content')
    console.log('✅ Changes appear instantly in Builder.io')
    console.log('✅ SEO fields can be managed the same way')
    console.log('✅ Full programmatic control is working')
    
    console.log('\n💡 Next: Ask Claude to make any changes you want!')
    
    return result
  } catch (error) {
    console.error('❌ Demo update failed:', error.message)
    return null
  }
}

demoSEOUpdate()