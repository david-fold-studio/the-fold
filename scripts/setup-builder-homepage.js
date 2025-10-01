/**
 * Script to automatically populate Builder.io homepage with your components
 * Run this after setting up your "homepage" model in Builder.io
 */

const { default: fetch } = require('node-fetch')
require('dotenv').config({ path: '.env.local' })

// API configuration
const BUILDER_API_KEY = process.env.BUILDER_PRIVATE_KEY || process.env.NEXT_PUBLIC_BUILDER_API_KEY
const BUILDER_SPACE_ID = process.env.NEXT_PUBLIC_BUILDER_API_KEY // Space ID is same as public key

const homepageContent = {
  name: "Homepage",
  published: "published",
  data: {
    title: "The Fold Studio - Custom Software Design & Development",
    seoTitle: "The Fold Studio - Custom Software Design & Development",
    seoDescription: "Transform your business with expert solutions. We create innovative digital solutions that help your business thrive in the modern marketplace.",
    blocks: [
      {
        "@type": "@builder.io/sdk:Element",
        "@version": 2,
        id: "builder-navigation",
        component: {
          name: "Navigation",
          options: {}
        }
      },
      {
        "@type": "@builder.io/sdk:Element", 
        "@version": 2,
        id: "builder-hero",
        component: {
          name: "Enhanced Hero Section",
          options: {
            showEyebrow: true,
            eyebrowText: "EXPERT SOLUTIONS",
            title: "Transform Your Business with Expert Solutions",
            description: "We create innovative digital solutions that help your business thrive in the modern marketplace.",
            showSecondaryButton: true,
            primaryButton: {
              text: "Get Started",
              variant: "primary",
              size: "lg",
              href: "/contact",
              target: "_self"
            },
            secondaryButton: {
              text: "Learn More", 
              variant: "secondary",
              size: "lg",
              href: "/about",
              target: "_self"
            },
            backgroundType: "video",
            sectionHeight: "90vh"
          }
        }
      },
      {
        "@type": "@builder.io/sdk:Element",
        "@version": 2, 
        id: "builder-benefits",
        component: {
          name: "BenefitsSection",
          options: {}
        }
      },
      {
        "@type": "@builder.io/sdk:Element",
        "@version": 2,
        id: "builder-case-studies", 
        component: {
          name: "Case Studies",
          options: {}
        }
      },
      {
        "@type": "@builder.io/sdk:Element",
        "@version": 2,
        id: "builder-services",
        component: {
          name: "ServicesSection", 
          options: {}
        }
      },
      {
        "@type": "@builder.io/sdk:Element",
        "@version": 2,
        id: "builder-process",
        component: {
          name: "Process",
          options: {}
        }
      },
      {
        "@type": "@builder.io/sdk:Element",
        "@version": 2,
        id: "builder-pricing",
        component: {
          name: "Pricing",
          options: {}
        }
      },
      {
        "@type": "@builder.io/sdk:Element", 
        "@version": 2,
        id: "builder-testimonials",
        component: {
          name: "TestimonialsSection",
          options: {}
        }
      },
      {
        "@type": "@builder.io/sdk:Element",
        "@version": 2,
        id: "builder-faq",
        component: {
          name: "FAQ",
          options: {}
        }
      },
      {
        "@type": "@builder.io/sdk:Element",
        "@version": 2,
        id: "builder-footer",
        component: {
          name: "Footer", 
          options: {}
        }
      }
    ]
  }
}

async function setupHomepage() {
  try {
    console.log('🚀 Setting up Builder.io homepage...')
    console.log('🔑 Using API key:', BUILDER_API_KEY ? `${BUILDER_API_KEY.substring(0, 8)}...` : 'Not found')
    
    if (!BUILDER_API_KEY) {
      throw new Error('BUILDER_PRIVATE_KEY not found in environment variables')
    }
    
    // Create the homepage content using REST API
    const response = await fetch(`https://builder.io/api/v1/write/${BUILDER_SPACE_ID}/homepage`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(homepageContent)
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Builder.io API error: ${response.status} - ${errorText}`)
    }
    
    const result = await response.json()
    
    console.log('✅ Homepage created successfully!')
    console.log('📍 Homepage ID:', result.id)
    console.log('🌐 Preview at: http://localhost:3004/')
    console.log('\n🎯 Next steps:')
    console.log('1. Go to Builder.io dashboard')
    console.log('2. Open the "homepage" model') 
    console.log('3. Edit the Enhanced Hero Section to customize your content')
    console.log('4. Adjust other sections as needed')
    
    return result
    
  } catch (error) {
    console.error('❌ Error setting up homepage:', error.message)
    console.log('\n💡 Troubleshooting:')
    console.log('1. Check your BUILDER_PRIVATE_KEY in .env.local')
    console.log('2. Ensure the private key has Create/Edit/Publish permissions')
    console.log('3. Make sure the "homepage" model exists in Builder.io')
    console.log('\n📖 Manual setup instructions:')
    console.log('1. Go to Builder.io dashboard → homepage model')
    console.log('2. Create new entry and add these components in order:')
    console.log('   - Navigation')
    console.log('   - Enhanced Hero Section') 
    console.log('   - BenefitsSection')
    console.log('   - Case Studies')
    console.log('   - ServicesSection')
    console.log('   - Process')
    console.log('   - Pricing')
    console.log('   - TestimonialsSection')
    console.log('   - FAQ')
    console.log('   - Footer')
    
    throw error
  }
}

// Check if running as script
if (require.main === module) {
  setupHomepage()
}

module.exports = { setupHomepage, homepageContent }