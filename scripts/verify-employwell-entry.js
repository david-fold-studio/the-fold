// Verify Employwell entry was created in case-studies model
const BUILDER_PRIVATE_KEY = 'bpk-df1977f31d5941bbb246fbfa065f7e0c'

async function checkCaseStudies() {
  try {
    console.log('🔍 Checking case-studies entries...')
    
    const response = await fetch('https://builder.io/api/v1/content/case-studies', {
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
      }
    })
    
    console.log('📡 Status:', response.status)
    const text = await response.text()
    
    if (text.startsWith('<!doctype') || text.startsWith('<html')) {
      console.log('❌ Got HTML response instead of JSON')
      return false
    }
    
    try {
      const data = JSON.parse(text)
      console.log('✅ Got JSON response!')
      console.log('📊 Total entries:', data.results?.length || 0)
      
      if (data.results) {
        console.log('\n📝 Case studies found:')
        data.results.forEach((entry, index) => {
          console.log(`  ${index + 1}. ${entry.name}`)
          if (entry.name.includes('Employwell')) {
            console.log(`     🎯 EMPLOYWELL FOUND! ID: ${entry.id}`)
          }
        })
      }
      
      return data.results?.some(entry => entry.name.includes('Employwell'))
    } catch (e) {
      console.log('❌ Response not valid JSON:', text.substring(0, 200))
      return false
    }
  } catch (error) {
    console.error('❌ Error checking entries:', error.message)
    return false
  }
}

// Also try the model-specific endpoint
async function checkModelEntries() {
  try {
    console.log('\n🔍 Checking model-specific entries...')
    
    const response = await fetch('https://builder.io/api/v1/content', {
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
      }
    })
    
    console.log('📡 Status:', response.status)
    const text = await response.text()
    
    if (text.startsWith('<!doctype') || text.startsWith('<html')) {
      console.log('❌ Got HTML response')
      return false
    }
    
    try {
      const data = JSON.parse(text)
      console.log('✅ Got JSON response!')
      console.log('📊 Total content entries:', data.results?.length || 0)
      
      const employwellEntries = data.results?.filter(entry => 
        entry.name?.includes('Employwell') || 
        entry.data?.title?.includes('Employwell')
      ) || []
      
      if (employwellEntries.length > 0) {
        console.log('\n🎯 Employwell entries found:')
        employwellEntries.forEach((entry, index) => {
          console.log(`  ${index + 1}. ${entry.name} (ID: ${entry.id})`)
          console.log(`     Model: ${entry.modelId}`)
        })
      }
      
      return employwellEntries.length > 0
    } catch (e) {
      console.log('❌ Response not valid JSON')
      return false
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    return false
  }
}

async function runVerification() {
  console.log('🎯 Verifying Employwell case study creation...\n')
  
  const found1 = await checkCaseStudies()
  const found2 = await checkModelEntries()
  
  if (found1 || found2) {
    console.log('\n🎉 SUCCESS! Employwell case study was created in Builder.io!')
  } else {
    console.log('\n⚠️  Could not verify creation - check Builder.io dashboard directly')
    console.log('Visit: https://builder.io/content')
  }
}

runVerification()