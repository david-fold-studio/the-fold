// Test what getCaseStudyBySlug actually returns
const { getCaseStudyBySlug } = require('../src/lib/utils/case-studies.ts')

async function testCaseStudyContent() {
  console.log('🔍 Testing getCaseStudyBySlug for employwell-healthcare...')
  
  try {
    const result = await getCaseStudyBySlug('employwell-healthcare')
    
    if (result) {
      console.log('✅ Found case study!')
      console.log('📋 Title:', result.meta.title)
      console.log('📝 Has content:', !!result.content)
      console.log('📏 Content length:', result.content.length)
      
      if (result.content.length > 0) {
        console.log('📄 Content preview:', result.content.substring(0, 200) + '...')
      } else {
        console.log('❌ Content is empty')
      }
      
      console.log('\n📊 Meta data:')
      console.log('- Slug:', result.meta.slug)
      console.log('- Client:', result.meta.client)
      console.log('- Services:', result.meta.services)
      console.log('- Excerpt:', result.meta.excerpt)
      
    } else {
      console.log('❌ No case study found')
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testCaseStudyContent()