// Create content models in Builder.io via API
async function createContentModels() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  
  // Testimonials Model
  const testimonialsModel = {
    name: 'testimonials',
    kind: 'data',
    inputs: [
      {
        name: 'name',
        friendlyName: 'Client Name',
        type: 'string',
        required: true,
        helperText: 'Name of the person giving the testimonial'
      },
      {
        name: 'company',
        friendlyName: 'Company',
        type: 'string',
        required: true,
        helperText: 'Company or organization name'
      },
      {
        name: 'role',
        friendlyName: 'Role/Title',
        type: 'string',
        helperText: 'Job title or role (e.g., "CEO", "Marketing Director")'
      },
      {
        name: 'testimonial',
        friendlyName: 'Testimonial Text',
        type: 'longText',
        required: true,
        helperText: 'The testimonial content'
      },
      {
        name: 'rating',
        friendlyName: 'Rating',
        type: 'number',
        helperText: 'Rating out of 5 stars',
        min: 1,
        max: 5
      },
      {
        name: 'avatar',
        friendlyName: 'Profile Photo',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'],
        helperText: 'Client profile photo or avatar'
      }
    ]
  }

  // Services Model
  const servicesModel = {
    name: 'services',
    kind: 'data',
    inputs: [
      {
        name: 'title',
        friendlyName: 'Service Title',
        type: 'string',
        required: true
      },
      {
        name: 'description',
        friendlyName: 'Service Description',
        type: 'longText',
        required: true
      },
      {
        name: 'icon',
        friendlyName: 'Service Icon',
        type: 'file',
        allowedFileTypes: ['svg', 'png', 'jpg'],
        helperText: 'Icon representing the service'
      },
      {
        name: 'features',
        friendlyName: 'Key Features',
        type: 'list',
        subFields: [
          {
            name: 'feature',
            type: 'string'
          }
        ]
      },
      {
        name: 'price',
        friendlyName: 'Starting Price',
        type: 'string',
        helperText: 'e.g., "Starting at $5,000"'
      }
    ]
  }

  // Benefits Model
  const benefitsModel = {
    name: 'benefits',
    kind: 'data',
    inputs: [
      {
        name: 'title',
        friendlyName: 'Benefit Title',
        type: 'string',
        required: true
      },
      {
        name: 'description',
        friendlyName: 'Benefit Description',
        type: 'longText',
        required: true
      },
      {
        name: 'icon',
        friendlyName: 'Benefit Icon',
        type: 'string',
        helperText: 'Icon name or SVG'
      }
    ]
  }

  // Hero Section Model
  const heroModel = {
    name: 'hero-content',
    kind: 'data',
    inputs: [
      {
        name: 'eyebrowText',
        friendlyName: 'Eyebrow Text',
        type: 'string',
        helperText: 'Small text above the main headline'
      },
      {
        name: 'headline',
        friendlyName: 'Main Headline',
        type: 'string',
        required: true
      },
      {
        name: 'subheadline',
        friendlyName: 'Subheadline',
        type: 'longText',
        required: true
      },
      {
        name: 'ctaText',
        friendlyName: 'CTA Button Text',
        type: 'string',
        defaultValue: 'Get Started'
      },
      {
        name: 'ctaUrl',
        friendlyName: 'CTA Button URL',
        type: 'string',
        defaultValue: '/contact'
      },
      {
        name: 'heroImage',
        friendlyName: 'Hero Image',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp']
      }
    ]
  }

  // FAQ Model
  const faqModel = {
    name: 'faq',
    kind: 'data',
    inputs: [
      {
        name: 'question',
        friendlyName: 'Question',
        type: 'string',
        required: true
      },
      {
        name: 'answer',
        friendlyName: 'Answer',
        type: 'longText',
        required: true
      },
      {
        name: 'category',
        friendlyName: 'Category',
        type: 'string',
        helperText: 'Group FAQs by category (e.g., "Pricing", "Process")'
      }
    ]
  }

  const models = [
    { model: testimonialsModel, name: 'Testimonials' },
    { model: servicesModel, name: 'Services' },
    { model: benefitsModel, name: 'Benefits' },
    { model: heroModel, name: 'Hero Content' },
    { model: faqModel, name: 'FAQ' }
  ]

  try {
    console.log('🚀 Creating content models in Builder.io...\n')

    for (const { model, name } of models) {
      console.log(`Creating ${name} model...`)
      
      const response = await fetch('https://builder.io/api/v1/models', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model)
      })

      if (!response.ok) {
        const error = await response.text()
        console.error(`❌ Failed to create ${name} model:`, error)
        continue
      }

      const result = await response.json()
      console.log(`✅ ${name} model created successfully`)
    }

    console.log('\n🎉 All content models created!')
    console.log('📋 Next steps:')
    console.log('1. Refresh your Builder.io dashboard')
    console.log('2. Look for the new content models in the "Content" section')
    console.log('3. Add sample data to each model')
    console.log('4. Test programmatic updates via Claude Code')

  } catch (error) {
    console.error('❌ Error creating models:', error.message)
  }
}

createContentModels()