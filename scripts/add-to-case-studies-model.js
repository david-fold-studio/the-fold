// Add Employwell case study to the existing case-studies model
const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
const MODEL_ID = '7974871d708e40cdacc287be71235a07'

// First, let's get the current content
async function getCurrentCaseStudies() {
  try {
    console.log('📋 Fetching current case studies...')
    const response = await fetch(`https://builder.io/api/v1/content/${MODEL_ID}`, {
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to get current content: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('✅ Current case studies found:', data.results?.length || 0)
    
    if (data.results && data.results.length > 0) {
      const currentEntry = data.results[0]
      console.log('📊 Current entry ID:', currentEntry.id)
      console.log('📝 Current studies count:', currentEntry.data?.studies?.length || 0)
      return currentEntry
    }
    
    return null
  } catch (error) {
    console.error('❌ Error fetching current case studies:', error.message)
    return null
  }
}

// Add Employwell case study to the existing entry
async function addEmploywellToExisting(currentEntry) {
  const employwellCaseStudy = {
    title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
    description: "When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a 'foot in the door' approach that delivered immediate value while positioning for future growth. +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI.",
    image: "/images/case-studies/employwell-dashboard.jpg", 
    tags: ["Healthcare", "UX Research", "Startup", "EHR", "Fertility Care"],
    link: "/case-studies/employwell-healthcare"
  }

  // Add the new study to the existing studies array
  const updatedData = {
    ...currentEntry.data,
    studies: [
      ...(currentEntry.data.studies || []),
      employwellCaseStudy
    ]
  }

  try {
    console.log('🚀 Adding Employwell case study to existing model...')
    const response = await fetch(`https://builder.io/api/v1/content/${currentEntry.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: updatedData,
        published: 'published'
      })
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to update content: ${response.status} - ${errorText}`)
    }
    
    const result = await response.json()
    console.log('✅ Successfully added Employwell case study!')
    console.log('📊 Updated studies count:', result.data?.studies?.length || 0)
    return result
  } catch (error) {
    console.error('❌ Error updating case studies:', error.message)
    return null
  }
}

// Check if Employwell already exists
function employwellExists(studies) {
  return studies.some(study => 
    study.title?.includes('Employwell') || 
    study.link?.includes('employwell-healthcare')
  )
}

// Main execution
async function run() {
  console.log('🎯 Adding Employwell to case-studies model...\n')
  
  const currentEntry = await getCurrentCaseStudies()
  
  if (!currentEntry) {
    console.log('❌ Could not fetch current case studies data')
    return
  }
  
  // Check if Employwell already exists
  const studies = currentEntry.data?.studies || []
  if (employwellExists(studies)) {
    console.log('ℹ️ Employwell case study already exists in the model')
    console.log('📝 Current studies:')
    studies.forEach((study, index) => {
      console.log(`  ${index + 1}. ${study.title}`)
    })
    return
  }
  
  console.log('\n' + '='.repeat(50))
  const result = await addEmploywellToExisting(currentEntry)
  
  if (result) {
    console.log('\n🎉 Success! Employwell case study has been added to Builder.io')
    console.log('📝 All case studies:')
    result.data?.studies?.forEach((study, index) => {
      console.log(`  ${index + 1}. ${study.title}`)
    })
  } else {
    console.log('\n💥 Failed to add case study. Check the errors above.')
  }
}

run()