// Create Employwell case study as draft first, then publish
const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'

async function createDraftEntry() {
  const employwellEntry = {
    name: "Employwell Healthcare Platform",
    published: "draft", // Start as draft
    modelId: "7974871d708e40cdacc287be71235a07",
    data: {
      title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
      description: "When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a 'foot in the door' approach that delivered immediate value while positioning for future growth. +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI.",
      thumbnail: "https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2Femploywell-thumbnail.jpg",
      cover: "https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2Femploywell-cover.jpg",
      slug: "employwell-healthcare",
      urlSlug: "employwell-healthcare",
      client: "Employwell",
      year: "2024",
      tags: ["Healthcare", "UX Research", "Startup", "EHR", "Fertility Care"],
      industry: "Healthcare",
      featured: true,
      readTime: "12 min",
      category: "Healthcare",
      services: ["UX Research", "Information Architecture", "Dashboard Design"]
    }
  }

  try {
    console.log('🚀 Creating Employwell case study as DRAFT...')
    
    const response = await fetch('https://builder.io/api/v1/content/case-studies', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employwellEntry)
    })
    
    console.log('📡 Status:', response.status)
    const responseText = await response.text()
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ Draft created successfully!')
      
      // Try to extract entry ID from HTML response
      const idMatch = responseText.match(/entry\/([a-f0-9]+)/i) || responseText.match(/"id":\s*"([^"]+)"/);
      if (idMatch) {
        const entryId = idMatch[1]
        console.log('📋 Found entry ID:', entryId)
        return entryId
      } else {
        console.log('⚠️ Could not extract entry ID from response')
        console.log('📄 Response sample:', responseText.substring(0, 200))
        return 'unknown'
      }
    } else {
      console.log('❌ Failed to create draft:', response.status)
      console.log('📄 Response:', responseText.substring(0, 300))
      return null
    }
  } catch (error) {
    console.error('❌ Error creating draft:', error.message)
    return null
  }
}

async function publishEntry(entryId) {
  if (!entryId || entryId === 'unknown') {
    console.log('⚠️ No entry ID available for publishing')
    return false
  }

  try {
    console.log(`\n📤 Publishing entry ${entryId}...`)
    
    const response = await fetch(`https://builder.io/api/v1/content/${entryId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        published: "published"
      })
    })
    
    console.log('📡 Publish Status:', response.status)
    const responseText = await response.text()
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ Entry published successfully!')
      return true
    } else {
      console.log('❌ Failed to publish:', response.status)
      console.log('📄 Response:', responseText.substring(0, 300))
      return false
    }
  } catch (error) {
    console.error('❌ Error publishing entry:', error.message)
    return false
  }
}

async function createDirectlyAsPublished() {
  console.log('\n🎯 Trying to create directly as PUBLISHED...')
  
  const employwellEntry = {
    name: "Employwell Healthcare Platform",
    published: "published", // Directly published
    modelId: "7974871d708e40cdacc287be71235a07",
    data: {
      title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
      description: "Strategic UX research approach delivering +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI - avoiding 6-12 months of costly EHR integration work.",
      thumbnail: "/images/case-studies/employwell-dashboard.jpg",
      cover: "/images/case-studies/employwell-dashboard.jpg", 
      slug: "employwell-healthcare",
      urlSlug: "employwell-healthcare",
      client: "Employwell",
      year: "2024",
      featured: true,
      readTime: "12 min"
    }
  }

  try {
    const response = await fetch('https://builder.io/api/v1/content/case-studies', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employwellEntry)
    })
    
    console.log('📡 Status:', response.status)
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ Created directly as published!')
      return true
    } else {
      const text = await response.text()
      console.log('❌ Failed:', response.status)
      console.log('📄 Response:', text.substring(0, 200))
      return false
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    return false
  }
}

async function tryWithoutModelId() {
  console.log('\n🎯 Trying WITHOUT modelId field...')
  
  const employwellEntry = {
    name: "Employwell Healthcare Platform",
    published: "published",
    // Remove modelId - let Builder.io assign it
    data: {
      title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
      description: "Strategic UX research delivering immediate value: +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI.",
      slug: "employwell-healthcare",
      client: "Employwell",
      featured: true
    }
  }

  try {
    const response = await fetch('https://builder.io/api/v1/content/case-studies', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employwellEntry)
    })
    
    console.log('📡 Status:', response.status)
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ Created without modelId!')
      return true
    } else {
      const text = await response.text()
      console.log('❌ Failed:', response.status)
      return false
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    return false
  }
}

// Main execution
async function run() {
  console.log('🎯 Creating and publishing Employwell case study...\n')
  
  // Method 1: Create as draft, then publish
  console.log('📋 METHOD 1: Create draft then publish')
  const entryId = await createDraftEntry()
  
  if (entryId) {
    const published = await publishEntry(entryId)
    if (published) {
      console.log('\n🎉 SUCCESS! Entry created and published via draft method')
      console.log('✅ Check Builder.io dashboard: https://builder.io/content')
      return
    }
  }
  
  // Method 2: Create directly as published
  console.log('\n📋 METHOD 2: Create directly as published')
  const directSuccess = await createDirectlyAsPublished()
  
  if (directSuccess) {
    console.log('\n🎉 SUCCESS! Entry created directly as published')
    console.log('✅ Check Builder.io dashboard: https://builder.io/content')
    return
  }
  
  // Method 3: Create without modelId
  console.log('\n📋 METHOD 3: Create without modelId')
  const noModelIdSuccess = await tryWithoutModelId()
  
  if (noModelIdSuccess) {
    console.log('\n🎉 SUCCESS! Entry created without modelId')
    console.log('✅ Check Builder.io dashboard: https://builder.io/content')
    return
  }
  
  console.log('\n💥 All methods failed. The case study might still be created but not visible.')
  console.log('📋 Check these locations in Builder.io:')
  console.log('   • Content > All content')
  console.log('   • Content > Drafts') 
  console.log('   • Content > case-studies model')
  console.log('   • Try searching for "Employwell"')
}

run()