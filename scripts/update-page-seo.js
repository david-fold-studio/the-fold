// Update the existing test page with comprehensive SEO fields
async function updatePageSEO() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  const pageId = '90e11111b70240bd86b00b2b390d6be9' // Our test page ID
  
  // Enhanced page data with comprehensive SEO
  const updatedData = {
    name: 'Builder Test Page - SEO Enhanced',
    data: {
      title: 'Builder Test Page',
      url: '/builder-test',
      // Basic SEO fields
      seo: {
        metaTitle: 'Test Page - The Fold Studio | SEO Optimization Demo',
        metaDescription: 'Demonstration of comprehensive SEO management with Builder.io CMS. Test programmatic updates, social media optimization, and structured data.',
        keywords: [
          { keyword: 'Builder.io SEO' },
          { keyword: 'CMS management' },
          { keyword: 'programmatic updates' },
          { keyword: 'meta tag optimization' }
        ],
        canonicalUrl: 'https://thefoldstudio.com/builder-test',
        robots: 'noindex,nofollow'
      },
      // Open Graph / Facebook
      openGraph: {
        title: 'SEO Management Demo - Builder.io Integration',
        description: 'See how we manage SEO settings programmatically with Builder.io CMS and Claude Code integration.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
        imageAlt: 'SEO management dashboard showing meta tags and social media optimization',
        type: 'website'
      },
      // Twitter
      twitter: {
        card: 'summary_large_image',
        title: 'Builder.io SEO Demo',
        description: 'Programmatic SEO management with Claude Code integration',
        site: '@thefoldstudio',
        creator: '@davidfoldstudio'
      },
      // Structured Data
      jsonLd: {
        type: 'WebPage',
        organization: {
          name: 'The Fold Studio',
          url: 'https://thefoldstudio.com',
          contactPoint: {
            telephone: '+1-555-123-4567',
            email: 'hello@thefoldstudio.com',
            contactType: 'customer service'
          }
        }
      },
      // Page content
      blocks: [
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Text',
            options: {
              text: `
                <h1>SEO Management Demo</h1>
                <p><strong>This page demonstrates comprehensive SEO management with Builder.io!</strong></p>
                
                <h2>Current SEO Settings:</h2>
                <ul>
                  <li><strong>Meta Title:</strong> Test Page - The Fold Studio | SEO Optimization Demo</li>
                  <li><strong>Meta Description:</strong> Comprehensive SEO management demo</li>
                  <li><strong>Focus Keywords:</strong> Builder.io SEO, CMS management</li>
                  <li><strong>Open Graph:</strong> Configured for social media</li>
                  <li><strong>Twitter Cards:</strong> Large image format</li>
                  <li><strong>JSON-LD:</strong> Structured data included</li>
                </ul>
                
                <h2>Test Programmatic Updates:</h2>
                <p>Ask Claude to update any of these SEO settings:</p>
                <ul>
                  <li>"Update the meta title to include 'Award-Winning'"</li>
                  <li>"Change the meta description to focus on conversion rates"</li>
                  <li>"Add 'mobile optimization' as a focus keyword"</li>
                  <li>"Update the social media sharing image"</li>
                </ul>
                
                <div style="background: #1a1a2e; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3>✅ Integration Status:</h3>
                  <p>✅ Builder.io connected<br>
                  ✅ SEO fields configured<br>
                  ✅ Programmatic updates ready<br>
                  ✅ Social media optimization active</p>
                </div>
              `
            }
          }
        }
      ]
    },
    published: 'published'
  }

  try {
    console.log('🚀 Updating page with enhanced SEO fields...')
    
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
    
    console.log('✅ Page updated with comprehensive SEO!')
    console.log('📋 Updated page details:')
    console.log(`   - Meta Title: ${result.data?.seo?.metaTitle}`)
    console.log(`   - Keywords: ${result.data?.seo?.keywords?.length || 0}`)
    console.log(`   - Open Graph: ${result.data?.openGraph ? 'Configured' : 'Not set'}`)
    console.log(`   - Twitter: ${result.data?.twitter ? 'Configured' : 'Not set'}`)
    
    console.log('\n🎯 Next steps:')
    console.log('1. Refresh Builder.io to see SEO fields')
    console.log('2. Test programmatic SEO updates!')
    console.log('3. Ask Claude to modify any SEO setting')
    
    return result
  } catch (error) {
    console.error('❌ Page update failed:', error.message)
    return null
  }
}

updatePageSEO()