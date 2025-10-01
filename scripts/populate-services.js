// Populate services model with your business offerings
async function populateServices() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  
  const headers = {
    'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  
  console.log('🚀 Adding services to your CMS...\n')
  
  const services = [
    {
      name: 'Custom Web Development',
      data: {
        title: 'Custom Web Development',
        description: 'Modern, responsive websites built with cutting-edge technologies. We create fast, secure, and scalable web applications tailored to your business needs using React, Next.js, and the latest web standards.',
        icon: 'code',
        price: 'Starting at $5,000'
      },
      published: 'published'
    },
    {
      name: 'UI/UX Design',
      data: {
        title: 'UI/UX Design',
        description: 'User-centered design that converts visitors into customers. We create intuitive interfaces and seamless user experiences through research, wireframing, prototyping, and rigorous testing.',
        icon: 'palette',
        price: 'Starting at $3,000'
      },
      published: 'published'
    },
    {
      name: 'Digital Strategy & Consulting',
      data: {
        title: 'Digital Strategy & Consulting',
        description: 'Strategic guidance to maximize your digital presence and ROI. We help you identify growth opportunities, optimize user journeys, and create actionable roadmaps for digital transformation.',
        icon: 'target',
        price: 'Starting at $2,500'
      },
      published: 'published'
    },
    {
      name: 'E-commerce Solutions',
      data: {
        title: 'E-commerce Solutions',
        description: 'Complete online stores that drive sales and growth. From product catalogs to payment processing, we build secure, scalable e-commerce platforms that convert browsers into buyers.',
        icon: 'shopping-cart',
        price: 'Starting at $7,500'
      },
      published: 'published'
    },
    {
      name: 'Mobile App Development',
      data: {
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications that engage users. We create iOS and Android apps with seamless performance, intuitive design, and powerful functionality.',
        icon: 'smartphone',
        price: 'Starting at $8,000'
      },
      published: 'published'
    },
    {
      name: 'SEO & Performance Optimization',
      data: {
        title: 'SEO & Performance Optimization',
        description: 'Technical SEO and performance optimization that drives organic traffic. We improve site speed, search rankings, and user experience through data-driven optimization strategies.',
        icon: 'trending-up',
        price: 'Starting at $1,500'
      },
      published: 'published'
    }
  ]
  
  console.log('Creating service entries...')
  
  for (const service of services) {
    try {
      const response = await fetch('https://builder.io/api/v1/write/content/services', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(service)
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log(`✅ Created: ${service.data.title} (ID: ${result.id})`)
      } else {
        const error = await response.text()
        console.log(`❌ Failed to create ${service.data.title}: ${error.substring(0, 100)}`)
      }
    } catch (error) {
      console.log(`❌ Error creating ${service.data.title}: ${error.message}`)
    }
  }
  
  console.log('\n🎉 Services population complete!')
  console.log('📋 Check your Builder.io Content section to see:')
  console.log('  ✅ 6 service offerings with descriptions')
  console.log('  ✅ Lucide icon names for each service')
  console.log('  ✅ Starting prices for each service')
  console.log('  ✅ Professional descriptions ready for your website')
  
  console.log('\n💡 You can now:')
  console.log('  • Edit any service directly in Builder.io')
  console.log('  • Ask me to modify services programmatically')
  console.log('  • Add/remove services as your business grows')
}

populateServices()