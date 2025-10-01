// Script to import the page model directly via Builder.io API
const fs = require('fs')
const path = require('path')

async function importPageModel() {
  // Read the page model JSON
  const modelPath = path.join(__dirname, '../builder-models/dynamic-page-model.json')
  const modelData = JSON.parse(fs.readFileSync(modelPath, 'utf8'))
  
  // You'll need to get your private API key from Builder.io
  const BUILDER_PRIVATE_KEY = process.env.BUILDER_PRIVATE_KEY
  
  if (!BUILDER_PRIVATE_KEY) {
    console.error('❌ BUILDER_PRIVATE_KEY environment variable is required')
    console.log('Get your private key from: https://builder.io/account/organization')
    process.exit(1)
  }

  try {
    console.log('🚀 Importing page model to Builder.io...')
    
    const response = await fetch('https://builder.io/api/v2/content-types', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modelData)
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`API Error (${response.status}): ${error}`)
    }

    const result = await response.json()
    
    console.log('✅ Page model imported successfully!')
    console.log('📋 Model details:')
    console.log(`   - Name: ${result.name}`)
    console.log(`   - ID: ${result.id}`)
    console.log(`   - Fields: ${result.inputs?.length || 0}`)
    console.log('\n🎯 Next steps:')
    console.log('1. Go to Builder.io Content tab')
    console.log('2. Create a new "page" entry')
    console.log('3. Configure your SEO settings')
    
    return result
  } catch (error) {
    console.error('❌ Import failed:', error.message)
    
    if (error.message.includes('401')) {
      console.log('\n🔑 Authentication issue:')
      console.log('1. Go to https://builder.io/account/organization')
      console.log('2. Copy your Private API Key') 
      console.log('3. Add it to your .env.local file:')
      console.log('   BUILDER_PRIVATE_KEY=your-private-key-here')
    }
    
    process.exit(1)
  }
}

// Run the import
if (require.main === module) {
  importPageModel()
}

module.exports = { importPageModel }