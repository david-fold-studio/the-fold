// Create content models using the working v2 endpoint
async function createModelsV2() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  
  const models = [
    {
      name: 'testimonials',
      inputs: [
        { name: 'name', type: 'string', required: true, friendlyName: 'Client Name' },
        { name: 'company', type: 'string', required: true, friendlyName: 'Company' },
        { name: 'role', type: 'string', friendlyName: 'Role/Title' },
        { name: 'testimonial', type: 'longText', required: true, friendlyName: 'Testimonial' },
        { name: 'rating', type: 'number', friendlyName: 'Rating (1-5)' },
        { name: 'avatar', type: 'file', friendlyName: 'Profile Photo' }
      ]
    },
    {
      name: 'services',
      inputs: [
        { name: 'title', type: 'string', required: true, friendlyName: 'Service Title' },
        { name: 'description', type: 'longText', required: true, friendlyName: 'Description' },
        { name: 'icon', type: 'file', friendlyName: 'Service Icon' },
        { name: 'price', type: 'string', friendlyName: 'Starting Price' },
        { 
          name: 'features', 
          type: 'list', 
          friendlyName: 'Key Features',
          subFields: [{ name: 'feature', type: 'string' }]
        }
      ]
    },
    {
      name: 'benefits',
      inputs: [
        { name: 'title', type: 'string', required: true, friendlyName: 'Benefit Title' },
        { name: 'description', type: 'longText', required: true, friendlyName: 'Description' },
        { name: 'icon', type: 'string', friendlyName: 'Icon Name' }
      ]
    },
    {
      name: 'hero-content',
      inputs: [
        { name: 'eyebrowText', type: 'string', friendlyName: 'Eyebrow Text' },
        { name: 'headline', type: 'string', required: true, friendlyName: 'Main Headline' },
        { name: 'subheadline', type: 'longText', required: true, friendlyName: 'Subheadline' },
        { name: 'ctaText', type: 'string', friendlyName: 'CTA Button Text', defaultValue: 'Get Started' },
        { name: 'ctaUrl', type: 'string', friendlyName: 'CTA Button URL', defaultValue: '/contact' },
        { name: 'heroImage', type: 'file', friendlyName: 'Hero Image' }
      ]
    },
    {
      name: 'faq',
      inputs: [
        { name: 'question', type: 'string', required: true, friendlyName: 'Question' },
        { name: 'answer', type: 'longText', required: true, friendlyName: 'Answer' },
        { name: 'category', type: 'string', friendlyName: 'Category' }
      ]
    }
  ]
  
  console.log('🚀 Creating content models using v2 API...\n')
  
  for (const model of models) {
    try {
      console.log(`Creating ${model.name} model...`)
      
      const response = await fetch('https://builder.io/api/v2/models', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model)
      })
      
      console.log(`  Status: ${response.status}`)
      
      if (response.status === 200) {
        console.log(`  ✅ ${model.name} model created successfully!`)
      } else {
        const error = await response.text()
        console.log(`  ❌ Error:`, error.substring(0, 200))
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500))
      
    } catch (error) {
      console.log(`  ❌ Error creating ${model.name}:`, error.message)
    }
  }
  
  console.log('\n🎉 Model creation complete!')
  console.log('\n📋 Next steps:')
  console.log('1. Check your Builder.io dashboard')
  console.log('2. Look for new content models in the sidebar')
  console.log('3. Test creating content entries')
  console.log('4. Run: node scripts/manage-content.js to add sample data')
}

createModelsV2()