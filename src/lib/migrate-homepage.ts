import { builder } from './builder'

// Define the homepage structure based on your current page.tsx
const homepageStructure = {
  url: '/',
  title: 'The Fold Studio - Homepage',
  seoTitle: 'The Fold Studio - Custom Software Design & Development',
  seoDescription: 'Transform your business with expert solutions. We create innovative digital solutions that help your business thrive in the modern marketplace.',
  
  // Page sections in order
  sections: [
    {
      '@type': '@builder.io/sdk:Element',
      '@version': 2,
      id: 'navigation-section',
      component: {
        name: 'Navigation',
        options: {}
      },
      responsiveStyles: {
        large: {
          display: 'block',
          width: '100%'
        }
      }
    },
    {
      '@type': '@builder.io/sdk:Element',
      '@version': 2,
      id: 'hero-section',
      component: {
        name: 'Enhanced Hero Section',
        options: {
          'data.title': 'Transform Your Business with Expert Solutions',
          'data.subtitle': 'We create innovative digital solutions that help your business thrive in the modern marketplace.',
          'data.backgroundType': 'video',
          'data.videoSrc': '/video-background.mp4',
          'data.overlayOpacity': 0.3,
          'data.sectionHeight': '90vh',
          'data.primaryButton.text': 'Get Started',
          'data.primaryButton.variant': 'primary',
          'data.primaryButton.size': 'lg',
          'data.primaryButton.href': '/contact',
          'data.showSecondaryButton': true,
          'data.secondaryButton.text': 'View Our Work',
          'data.secondaryButton.variant': 'outline',
          'data.secondaryButton.size': 'lg',
          'data.secondaryButton.href': '/portfolio',
          'data.showEyebrow': false,
          'data.disableAnimations': false
        }
      },
      responsiveStyles: {
        large: {
          display: 'block',
          width: '100%'
        }
      }
    },
    {
      '@type': '@builder.io/sdk:Element',
      '@version': 2,
      id: 'benefits-section',
      component: {
        name: 'BenefitsSection',
        options: {
          contentId: 'benefits-section',
          className: ''
        }
      },
      responsiveStyles: {
        large: {
          display: 'block',
          width: '100%'
        }
      }
    },
    {
      '@type': '@builder.io/sdk:Element',
      '@version': 2,
      id: 'case-studies-section',
      component: {
        name: 'Case Studies',
        options: {}
      },
      responsiveStyles: {
        large: {
          display: 'block',
          width: '100%'
        }
      }
    },
    {
      '@type': '@builder.io/sdk:Element',
      '@version': 2,
      id: 'services-section',
      component: {
        name: 'ServicesSection',
        options: {
          contentId: 'services-section',
          className: ''
        }
      },
      responsiveStyles: {
        large: {
          display: 'block',
          width: '100%'
        }
      }
    },
    {
      '@type': '@builder.io/sdk:Element',
      '@version': 2,
      id: 'process-section',
      component: {
        name: 'Process',
        options: {}
      },
      responsiveStyles: {
        large: {
          display: 'block',
          width: '100%'
        }
      }
    },
    {
      '@type': '@builder.io/sdk:Element',
      '@version': 2,
      id: 'pricing-section',
      component: {
        name: 'Pricing',
        options: {}
      },
      responsiveStyles: {
        large: {
          display: 'block',
          width: '100%'
        }
      }
    },
    {
      '@type': '@builder.io/sdk:Element',
      '@version': 2,
      id: 'testimonials-section',
      component: {
        name: 'TestimonialsSection',
        options: {
          contentId: 'testimonials-section',
          className: ''
        }
      },
      responsiveStyles: {
        large: {
          display: 'block',
          width: '100%'
        }
      }
    },
    {
      '@type': '@builder.io/sdk:Element',
      '@version': 2,
      id: 'faq-section',
      component: {
        name: 'FAQ',
        options: {}
      },
      responsiveStyles: {
        large: {
          display: 'block',
          width: '100%'
        }
      }
    },
    {
      '@type': '@builder.io/sdk:Element',
      '@version': 2,
      id: 'footer-section',
      component: {
        name: 'Footer',
        options: {}
      },
      responsiveStyles: {
        large: {
          display: 'block',
          width: '100%'
        }
      }
    }
  ]
}

/**
 * Create the homepage in Builder.io
 */
export async function createHomepageInBuilder() {
  try {
    const privateKey = process.env.BUILDER_PRIVATE_KEY
    if (!privateKey) {
      throw new Error('BUILDER_PRIVATE_KEY environment variable is required')
    }

    const response = await fetch('https://builder.io/api/v1/write/page', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${privateKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Homepage',
        data: {
          url: '/',
          title: homepageStructure.title,
          seoTitle: homepageStructure.seoTitle,
          seoDescription: homepageStructure.seoDescription,
          blocks: homepageStructure.sections
        },
        published: 'published'
      })
    })

    if (!response.ok) {
      throw new Error(`Builder.io API error: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    console.log('Homepage created in Builder.io:', result)
    return result

  } catch (error) {
    console.error('Error creating homepage in Builder.io:', error)
    throw error
  }
}

/**
 * Migration instructions for manual setup in Builder.io
 */
export const migrationInstructions = `
🚀 HOMEPAGE MIGRATION TO BUILDER.IO

1. Go to https://builder.io/models and create a new "page" entry
2. Set URL to: /
3. Set Title to: The Fold Studio - Homepage
4. Add these sections in order:

   📍 Navigation
   - Component: Navigation
   
   📍 Hero Section (MAIN)
   - Component: Enhanced Hero Section
   - Title: "Transform Your Business with Expert Solutions"
   - Subtitle: "We create innovative digital solutions..."
   - Background: Video (/video-background.mp4)
   - Section Height: Large (90vh) - NEW FEATURE!
   - Primary Button: "Get Started" → /contact
   - Secondary Button: "View Our Work" → /portfolio
   
   📍 Benefits
   - Component: BenefitsSection
   - Content ID: benefits-section
   
   📍 Case Studies
   - Component: Case Studies
   
   📍 Services
   - Component: ServicesSection
   - Content ID: services-section
   
   📍 Process
   - Component: Process
   
   📍 Pricing
   - Component: Pricing
   
   📍 Testimonials
   - Component: TestimonialsSection
   - Content ID: testimonials-section
   
   📍 FAQ
   - Component: FAQ
   
   📍 Footer
   - Component: Footer

5. Set SEO settings:
   - Meta Title: "The Fold Studio - Custom Software Design & Development"
   - Meta Description: "Transform your business with expert solutions..."

6. Publish the page

7. Test at: /homepage-builder

8. When ready, swap the routes to make this your main homepage
`

/**
 * Log migration instructions
 */
export function logMigrationInstructions() {
  console.log(migrationInstructions)
}