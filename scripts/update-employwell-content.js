// Update the existing Employwell case study with full content from MDX file
const fs = require('fs')
const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
const EMPLOYWELL_ENTRY_ID = '262d11f177e44c1fb7a87070e75d8ac7'
const MDX_FILE_PATH = '/Users/daviddejong/Library/CloudStorage/OneDrive-TheFoldStudio/The Fold Studio/Sales & Marketing/Pitch Project/case-study-employwell.mdx'

async function readMDXContent() {
  try {
    console.log('📖 Reading MDX file...')
    const content = fs.readFileSync(MDX_FILE_PATH, 'utf8')
    console.log('✅ Successfully read MDX file')
    console.log(`📊 Content length: ${content.length} characters`)
    return content
  } catch (error) {
    console.error('❌ Error reading MDX file:', error.message)
    return null
  }
}

async function updateEmploywellContent(fullContent) {
  const updateData = {
    name: "Employwell Healthcare Platform",
    published: "published",
    data: {
      title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
      description: "When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a 'foot in the door' approach that delivered immediate value while positioning for future growth. The result: +2 treatment cycles per clinic, 25% admin reduction, and 3-month ROI - all while avoiding 6-12 months of costly integration work.",
      urlSlug: "employwell-healthcare",
      slug: "employwell-healthcare",
      thumbnail: "https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2F594d26f16b68448a93628ae800ba5591",
      cover: "https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2F548514a971c043e38add0f91b01bfa03",
      client: "Employwell",
      year: "2024",
      industry: "Healthcare",
      tags: ["Healthcare", "UX Research", "Startup", "EHR", "Fertility Care"],
      services: ["UX Research", "Information Architecture", "Dashboard Design"],
      featured: true,
      readTime: "15 min",
      category: "Healthcare",
      
      // Add the full MDX content
      content: fullContent,
      
      // Key outcomes from the MDX
      outcomes: [
        "+2 treatment cycles per clinic within 90 days",
        "25% reduction in administrative load for clinical staff",
        "3-month ROI on platform investment",
        "Estimated $30,000-$40,000 monthly revenue increase per clinic"
      ],
      
      // Project details
      projectType: "Healthcare Platform",
      approach: "Research-driven phased dashboard prioritizing workflow over feature completeness",
      keyInnovation: "Context-aware information architecture that adapts to patient care phases",
      
      // Business impact metrics
      businessImpact: {
        treatmentCycles: "+2 per clinic within 90 days",
        adminReduction: "25% reduction in administrative load",
        roi: "3-month ROI achieved",
        monthlyValue: "$30,000-$40,000 per clinic"
      }
    }
  }

  try {
    console.log(`\n📝 Updating Employwell entry ${EMPLOYWELL_ENTRY_ID}...`)
    
    const response = await fetch(`https://builder.io/api/v1/content/${EMPLOYWELL_ENTRY_ID}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    })
    
    console.log('📡 Update Status:', response.status)
    const responseText = await response.text()
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ Successfully updated Employwell case study!')
      
      // Try to parse response if it's JSON
      if (responseText.startsWith('{')) {
        try {
          const result = JSON.parse(responseText)
          console.log('📋 Updated entry ID:', result.id)
          console.log('📝 Updated entry name:', result.name)
        } catch (e) {
          // HTML response is normal for Builder.io updates
        }
      }
      
      return true
    } else {
      console.log('❌ Failed to update:', response.status)
      console.log('📄 Response:', responseText.substring(0, 300))
      return false
    }
  } catch (error) {
    console.error('❌ Error updating entry:', error.message)
    return false
  }
}

async function verifyUpdate() {
  try {
    console.log('\n🔍 Verifying the update...')
    
    // Test the URL
    const response = await fetch('http://localhost:3007/case-studies/employwell-healthcare')
    console.log('📡 URL Status:', response.status)
    
    if (response.status === 200) {
      console.log('✅ Case study URL is accessible!')
      
      // Check if content is updated
      const html = await response.text()
      if (html.includes('Strategic UX Research Prevented Costly EHR Integration Delays')) {
        console.log('✅ Updated content is visible!')
      } else {
        console.log('⚠️ Content might not be fully updated yet')
      }
    } else {
      console.log('❌ Case study URL is not accessible')
    }
    
  } catch (error) {
    console.log('❌ Error verifying:', error.message)
  }
}

async function run() {
  console.log('🎯 Updating Employwell case study with full MDX content...\n')
  console.log(`📂 Reading from: ${MDX_FILE_PATH}`)
  console.log(`🆔 Updating entry: ${EMPLOYWELL_ENTRY_ID}`)
  
  // Read the MDX content
  const mdxContent = await readMDXContent()
  
  if (!mdxContent) {
    console.log('💥 Could not read MDX file. Exiting.')
    return
  }
  
  // Update the entry
  const success = await updateEmploywellContent(mdxContent)
  
  if (success) {
    console.log('\n🎉 SUCCESS! Employwell case study updated with full content!')
    console.log('🔗 View at: http://localhost:3007/case-studies/employwell-healthcare')
    console.log('📋 Builder.io: https://builder.io/content')
    
    // Verify the update
    await new Promise(resolve => setTimeout(resolve, 2000)) // Wait 2 seconds
    await verifyUpdate()
  } else {
    console.log('\n💥 Failed to update the case study.')
    console.log('💡 You can manually update it in Builder.io dashboard:')
    console.log(`   1. Go to https://builder.io/content/${EMPLOYWELL_ENTRY_ID}`)
    console.log('   2. Copy the content from the MDX file')
    console.log('   3. Paste it into the content field')
    console.log('   4. Save and publish')
  }
}

run()