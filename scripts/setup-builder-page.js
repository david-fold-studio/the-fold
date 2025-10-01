/**
 * Script to automatically populate Builder.io homepage as a Page (not Data model)
 * This will give you full visual editing capabilities
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
    url: "/",
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

async function setupPage() {
  try {
    console.log('🚀 Setting up Builder.io homepage as PAGE (with visual editing)...')
    console.log('🔑 Using API key:', BUILDER_API_KEY ? `${BUILDER_API_KEY.substring(0, 8)}...` : 'Not found')
    
    if (!BUILDER_API_KEY) {
      throw new Error('BUILDER_PRIVATE_KEY not found in environment variables')
    }
    
    // Create the homepage content using REST API for PAGE model
    const response = await fetch(`https://builder.io/api/v1/write/${BUILDER_SPACE_ID}/page`, {
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
    
    console.log('✅ Homepage PAGE created successfully!')
    console.log('📍 Homepage ID:', result.id)
    console.log('🌐 Preview at: http://localhost:3004/')
    console.log('\n🎯 Next steps:')
    console.log('1. Go to Builder.io dashboard → Pages')
    console.log('2. Find your new homepage entry')
    console.log('3. Click "Edit" to open the VISUAL editor')
    console.log('4. You\'ll now have full drag & drop capabilities!')
    console.log('5. Click on any component to edit its properties')
    
    return result
    
  } catch (error) {
    console.error('❌ Error setting up homepage:', error.message)
    console.log('\n💡 Troubleshooting:')
    console.log('1. Check your BUILDER_PRIVATE_KEY in .env.local')
    console.log('2. Ensure the private key has Create/Edit/Publish permissions')
    console.log('3. Make sure the "page" model exists in Builder.io (it should by default)')
    
    throw error
  }
}

// Check if running as script
if (require.main === module) {
  setupPage()
}

module.exports = { setupPage, homepageContent }