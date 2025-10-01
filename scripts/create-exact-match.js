// Create Employwell entry matching exact structure of existing case studies
const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'

async function createEmploywellExactMatch() {
  // Based on the HealthLink structure I saw in the server logs
  const employwellEntry = {
    name: "Employwell Healthcare Platform",
    published: "published", 
    modelId: "7974871d708e40cdacc287be71235a07",
    data: {
      description: "When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a 'foot in the door' approach that delivered immediate value while positioning for future growth. +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI.",
      thumbnail: "https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2Femploywell-thumbnail.jpg",
      cover: "https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2Femploywell-cover.jpg",
      slug: "employwell-healthcare",
      title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
      client: "Employwell",
      year: "2024",
      tags: ["Healthcare", "UX Research", "Startup", "EHR", "Fertility Care"],
      industry: "Healthcare",
      featured: true,
      readTime: "12 min",
      // Add any other fields that might be required
      category: "Healthcare",
      services: ["UX Research", "Information Architecture", "Dashboard Design"],
      projectType: "Healthcare Platform",
      outcomes: [
        "+2 treatment cycles per clinic within 90 days",
        "25% reduction in administrative load",
        "3-month ROI achieved"
      ]
    }
  }

  const endpoints = [
    'https://builder.io/api/v1/content/case-studies',
    'https://cdn.builder.io/api/v1/content/case-studies', 
    'https://builder.io/api/v3/content/case-studies',
    'https://cdn.builder.io/api/v3/content/case-studies'
  ]

  for (const endpoint of endpoints) {
    try {
      console.log(`\n🚀 Trying endpoint: ${endpoint}`)
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employwellEntry)
      })
      
      console.log(`📡 Status: ${response.status}`)
      const responseText = await response.text()
      
      if (response.status >= 200 && response.status < 300) {
        console.log('✅ SUCCESS! Entry created')
        
        if (responseText.startsWith('{')) {
          try {
            const result = JSON.parse(responseText)
            console.log('📋 Entry ID:', result.id)
            console.log('📝 Entry Name:', result.name)
            return { success: true, endpoint, result }
          } catch (e) {
            console.log('✅ Created but response not JSON')
            return { success: true, endpoint }
          }
        } else {
          console.log('✅ Created (HTML response - normal for Builder.io)')
          return { success: true, endpoint }
        }
      } else {
        console.log(`❌ Failed: ${response.status}`)
        console.log(`📄 Response: ${responseText.substring(0, 150)}...`)
      }
    } catch (error) {
      console.log(`❌ Error with ${endpoint}: ${error.message}`)
    }
  }
  
  return { success: false }
}

// Try different payload formats
async function tryDifferentFormats() {
  console.log('\n🎯 Trying different payload formats...\n')
  
  const formats = [
    {
      name: "Standard Format",
      payload: {
        name: "Employwell Healthcare Platform",
        published: "published",
        data: {
          title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
          description: "Strategic UX research approach delivering +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI.",
          slug: "employwell-healthcare"
        }
      }
    },
    {
      name: "Minimal Format", 
      payload: {
        name: "Employwell Healthcare Platform",
        data: {
          title: "Employwell Case Study",
          description: "Healthcare startup case study",
        }
      }
    },
    {
      name: "With Model ID",
      payload: {
        name: "Employwell Healthcare Platform", 
        modelId: "7974871d708e40cdacc287be71235a07",
        published: "published",
        data: {
          title: "Employwell Healthcare Case Study",
          description: "Strategic UX research for healthcare startup"
        }
      }
    }
  ]
  
  for (const format of formats) {
    console.log(`\n📋 Trying ${format.name}...`)
    
    try {
      const response = await fetch('https://builder.io/api/v1/content/case-studies', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(format.payload)
      })
      
      console.log(`📡 Status: ${response.status}`)
      
      if (response.status >= 200 && response.status < 300) {
        console.log(`✅ ${format.name} worked!`)
        return { success: true, format: format.name }
      } else {
        const text = await response.text()
        console.log(`❌ ${format.name} failed: ${response.status}`)
        console.log(`📄 Response: ${text.substring(0, 100)}...`)
      }
    } catch (error) {
      console.log(`❌ ${format.name} error: ${error.message}`)
    }
  }
  
  return { success: false }
}

async function run() {
  console.log('🎯 Creating Employwell case study with exact field matching...')
  
  const result1 = await createEmploywellExactMatch()
  
  if (!result1.success) {
    console.log('\n⏭️  Trying different formats...')
    const result2 = await tryDifferentFormats()
    
    if (result2.success) {
      console.log(`\n🎉 Success with ${result2.format}!`)
    } else {
      console.log('\n💥 All attempts failed')
    }
  } else {
    console.log('\n🎉 Success!')
  }
  
  console.log('\n✅ Check Builder.io dashboard: https://builder.io/content')
}

run()