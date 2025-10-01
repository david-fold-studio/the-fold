// Setup case-studies-section model and add Employwell content
const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'

// First, let's check what models exist
async function listModels() {
  try {
    console.log('📋 Checking existing models...')
    const response = await fetch('https://builder.io/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
      }
    })
    
    if (response.ok) {
      const models = await response.json()
      console.log('✅ Existing models:')
      models.forEach(model => console.log(`  - ${model.name}`))
      return models
    } else {
      console.log('⚠️ Could not fetch models:', response.status)
      return []
    }
  } catch (error) {
    console.error('❌ Error fetching models:', error.message)
    return []
  }
}

// Create the case-studies-section model
async function createCaseStudiesSectionModel() {
  const model = {
    name: 'case-studies-section',
    kind: 'data',
    inputs: [
      {
        name: 'eyebrowText',
        friendlyName: 'Eyebrow Text',
        type: 'string',
        helperText: 'Small text above the main title'
      },
      {
        name: 'title',
        friendlyName: 'Section Title', 
        type: 'string',
        required: true
      },
      {
        name: 'paragraphs',
        friendlyName: 'Description Paragraphs',
        type: 'list',
        subFields: [
          {
            name: 'text',
            type: 'longText'
          }
        ]
      },
      {
        name: 'studies',
        friendlyName: 'Case Studies',
        type: 'list',
        subFields: [
          {
            name: 'title',
            friendlyName: 'Title',
            type: 'string',
            required: true
          },
          {
            name: 'description', 
            friendlyName: 'Description',
            type: 'longText',
            required: true
          },
          {
            name: 'image',
            friendlyName: 'Image',
            type: 'file',
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp']
          },
          {
            name: 'tags',
            friendlyName: 'Tags',
            type: 'list',
            subFields: [
              {
                name: 'tag',
                type: 'string'
              }
            ]
          },
          {
            name: 'link',
            friendlyName: 'Link',
            type: 'string'
          }
        ]
      }
    ]
  }

  try {
    console.log('🚀 Creating case-studies-section model...')
    const response = await fetch('https://builder.io/api/v1/models', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    })
    
    if (response.ok) {
      const result = await response.json()
      console.log('✅ Model created successfully!')
      return result
    } else {
      const text = await response.text()
      console.log('⚠️ Model creation failed:', response.status, text)
      return null
    }
  } catch (error) {
    console.error('❌ Error creating model:', error.message)
    return null
  }
}

// Try via local API instead
async function useLocalAPI() {
  const employwellCaseStudy = {
    title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
    description: "When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a 'foot in the door' approach that delivered immediate value while positioning for future growth.",
    image: "/images/case-studies/employwell-dashboard.jpg",
    tags: ["Healthcare", "UX Research", "Startup", "EHR"],
    link: "/case-studies/employwell-healthcare"
  }

  try {
    console.log('📝 Using POST method to create initial case studies section...')
    const response = await fetch('http://localhost:3007/api/builder/case-studies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eyebrowText: "Case Studies",
        title: "Our Work",
        paragraphs: ["Explore our portfolio of successful projects and transformative designs."],
        studies: [employwellCaseStudy]
      })
    })
    
    if (response.ok) {
      const result = await response.json()
      console.log('✅ Case studies section created via local API!')
      console.log('📊 Result:', JSON.stringify(result, null, 2))
      return result
    } else {
      const text = await response.text()
      console.log('❌ Local API failed:', response.status, text)
      return null
    }
  } catch (error) {
    console.error('❌ Local API error:', error.message)
    return null
  }
}

// Main execution
async function run() {
  console.log('🎯 Setting up case studies section...\n')
  
  const models = await listModels()
  const hasModel = models.some(m => m.name === 'case-studies-section')
  
  if (!hasModel) {
    console.log('\n🔧 case-studies-section model does not exist')
    await createCaseStudiesSectionModel()
    
    // Wait a bit for the model to be ready
    console.log('⏳ Waiting for model to be available...')
    await new Promise(resolve => setTimeout(resolve, 3000))
  } else {
    console.log('\n✅ case-studies-section model already exists')
  }
  
  console.log('\n' + '='.repeat(50))
  const result = await useLocalAPI()
  
  if (result) {
    console.log('\n🎉 Success! Case studies section is now set up in Builder.io')
  } else {
    console.log('\n💥 Something went wrong. Check the errors above.')
  }
}

run()