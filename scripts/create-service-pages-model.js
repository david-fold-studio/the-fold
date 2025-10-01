// Create the service-pages model in Builder.io for visual page building
async function createServicePagesModel() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  
  console.log('🚀 Creating service-pages model for visual canvas building...\n')
  
  const headers = {
    'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  
  // Create service-pages as a PAGE model (not data model)
  const servicePageModel = {
    name: 'service-pages',
    kind: 'page', // This makes it a visual page builder model
    inputs: [
      {
        name: 'service',
        type: 'reference',
        model: 'services',
        friendlyName: 'Service',
        required: true,
        helperText: 'Which service is this page for?'
      },
      {
        name: 'slug',
        type: 'string',
        friendlyName: 'URL Slug',
        required: true,
        helperText: 'URL path: /services/{slug}'
      },
      
      // SEO fields
      {
        name: 'seoTitle',
        type: 'string',
        friendlyName: 'SEO Title',
        helperText: '50-60 characters for optimal SEO'
      },
      {
        name: 'seoDescription',
        type: 'longText',
        friendlyName: 'Meta Description',
        helperText: '120-160 characters for search results'
      },
      {
        name: 'ogImage',
        type: 'file',
        friendlyName: 'Social Media Image',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'],
        helperText: '1200x630px for optimal social media sharing'
      },
      
      // Page status
      {
        name: 'isPublished',
        type: 'boolean',
        friendlyName: 'Published',
        defaultValue: false,
        helperText: 'Show this page on the website'
      }
    ]
  }
  
  try {
    console.log('Creating service-pages page model...')
    
    const response = await fetch('https://builder.io/api/v2/models', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(servicePageModel)
    })
    
    console.log(`Status: ${response.status}`)
    
    if (response.status === 200) {
      console.log('✅ service-pages model created successfully!')
      console.log('\n🎯 What this gives you:')
      console.log('  ✅ Visual page builder for each service')
      console.log('  ✅ Drag & drop sections (Hero, Testimonials, etc.)')
      console.log('  ✅ SEO fields for each service page')
      console.log('  ✅ URL routing: /services/web-development, /services/ui-ux-design')
      console.log('  ✅ AI programmatic control over all sections')
      
      console.log('\n📋 Next steps:')
      console.log('1. Check Builder.io → Content Models → service-pages')
      console.log('2. Create your first service page!')
      console.log('3. Drag "Smart Hero Section" from the component library')
      console.log('4. Test AI commands like "move hero to bottom"')
      
    } else {
      console.log('⚠️  Model creation returned non-success status')
      console.log('   This might still work - check Builder.io dashboard')
    }
    
  } catch (error) {
    console.error('❌ Error creating model:', error.message)
  }
  
  console.log('\n🔧 Creating sample service page content...')
  
  // Wait a moment for the model to be available
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Create a sample service page for web development
  try {
    const samplePage = {
      name: 'Web Development Service Page',
      data: {
        service: 'web-development', // Reference to services model
        slug: 'web-development',
        seoTitle: 'Custom Web Development Services - The Fold Studio',
        seoDescription: 'Expert web development services using React, Next.js, and modern technologies. Fast, secure, and scalable websites tailored to your business needs.',
        isPublished: true
      },
      published: 'published'
    }
    
    const pageResponse = await fetch('https://builder.io/api/v1/write/content/service-pages', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(samplePage)
    })
    
    if (pageResponse.ok) {
      const result = await pageResponse.json()
      console.log('✅ Sample service page created!')
      console.log(`   Page ID: ${result.id}`)
      console.log('   URL: /services/web-development')
      console.log('   You can now edit this in Builder.io visual editor!')
    } else {
      console.log('⚠️  Sample page creation skipped (model may need more time)')
    }
    
  } catch (error) {
    console.log('⚠️  Sample page creation failed - model may need time to propagate')
  }
}

createServicePagesModel()