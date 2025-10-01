// Create a sample SEO-optimized page directly in Builder.io
// This bypasses model creation and directly creates content

const fs = require('fs')
const path = require('path')

async function createSEOPage() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  
  // Sample page data with full SEO configuration
  const pageData = {
    name: 'Homepage - SEO Optimized',
    data: {
      title: 'Homepage',
      url: '/',
      seo: {
        metaTitle: 'The Fold Studio - Digital Experiences That Convert',
        metaDescription: 'Expert design and development studio creating digital experiences that convert. Specializing in UX design, web applications, and mobile apps that drive results.',
        keywords: [
          { keyword: 'web design agency' },
          { keyword: 'UX design' },
          { keyword: 'digital development' },
          { keyword: 'conversion optimization' }
        ],
        robots: 'index,follow'
      },
      openGraph: {
        title: 'The Fold Studio - Convert More Visitors Into Customers',
        description: 'See our portfolio of high-converting websites and apps. Expert design and development that drives measurable results.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
        imageAlt: 'The Fold Studio - Digital design and development showcase',
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Convert More With Better Design - The Fold Studio',
        description: 'Expert digital design • High-converting websites • Proven results',
        site: '@thefoldstudio',
        creator: '@davidfoldstudio'
      },
      jsonLd: {
        type: 'Organization',
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
      sections: [
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'HeroSection',
            options: {
              contentId: 'hero-section'
            }
          }
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'ServicesSection',
            options: {
              contentId: 'services-section'
            }
          }
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'BenefitsSection',
            options: {
              contentId: 'benefits-section'
            }
          }
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'TestimonialsSection',
            options: {
              contentId: 'testimonials-section'
            }
          }
        }
      ]
    },
    published: 'published'
  }

  try {
    console.log('🚀 Creating SEO-optimized page in Builder.io...')
    
    // Create page content directly
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
    
    console.log('✅ SEO-optimized page created successfully!')
    console.log('📋 Page details:')
    console.log(`   - Name: ${result.name}`)
    console.log(`   - ID: ${result.id}`)
    console.log(`   - URL: ${result.data?.url}`)
    console.log(`   - SEO Title: ${result.data?.seo?.metaTitle}`)
    console.log('\n🎯 Next steps:')
    console.log('1. Go to Builder.io Content tab')
    console.log('2. Find your new page entry')
    console.log('3. Edit and customize as needed')
    console.log('\n🔧 Test programmatic SEO updates:')
    console.log('Tell Claude to update your SEO settings!')
    
    return result
  } catch (error) {
    console.error('❌ Page creation failed:', error.message)
    
    if (error.message.includes('401')) {
      console.log('\n🔑 Authentication issue - check your private key')
    }
    
    return null
  }
}

// Run the creation
if (require.main === module) {
  createSEOPage()
}

module.exports = { createSEOPage }