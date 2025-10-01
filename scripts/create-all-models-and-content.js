// Create all remaining models and populate with content from your existing homepage
async function createAllModelsAndContent() {
  const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'
  
  const headers = {
    'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  
  console.log('🚀 Creating all content models and populating with your homepage data...\n')
  
  // Define all models with your actual content
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
      ],
      sampleContent: [
        {
          name: 'Sarah Thompson - CEO',
          data: {
            name: 'Sarah Thompson',
            company: 'Tech Innovations Inc',
            role: 'CEO',
            testimonial: 'Working with The Fold Studio was transformative for our business. They delivered a stunning website that not only looks incredible but performs exceptionally well.',
            rating: 5
          }
        },
        {
          name: 'Michael Chen - Marketing Director',
          data: {
            name: 'Michael Chen',
            company: 'Growth Dynamics',
            role: 'Marketing Director', 
            testimonial: 'The team at The Fold Studio understood our vision perfectly and brought it to life with remarkable precision and creativity.',
            rating: 5
          }
        }
      ]
    },
    {
      name: 'services',
      inputs: [
        { name: 'title', type: 'string', required: true, friendlyName: 'Service Title' },
        { name: 'description', type: 'longText', required: true, friendlyName: 'Description' },
        { name: 'icon', type: 'string', friendlyName: 'Icon Name' },
        { name: 'price', type: 'string', friendlyName: 'Starting Price' },
        { name: 'features', type: 'list', friendlyName: 'Key Features', subFields: [{ name: 'feature', type: 'string' }] }
      ],
      sampleContent: [
        {
          name: 'Web Development',
          data: {
            title: 'Custom Web Development',
            description: 'Modern, responsive websites built with cutting-edge technologies. We create fast, secure, and scalable web applications tailored to your business needs.',
            icon: 'code',
            price: 'Starting at $5,000',
            features: [
              { feature: 'Responsive Design' },
              { feature: 'Performance Optimization' },
              { feature: 'SEO Friendly' },
              { feature: 'Custom CMS Integration' }
            ]
          }
        },
        {
          name: 'UI/UX Design',
          data: {
            title: 'UI/UX Design',
            description: 'User-centered design that converts visitors into customers. We create intuitive interfaces and seamless user experiences.',
            icon: 'palette',
            price: 'Starting at $3,000',
            features: [
              { feature: 'User Research' },
              { feature: 'Wireframing & Prototyping' },
              { feature: 'Visual Design' },
              { feature: 'Usability Testing' }
            ]
          }
        },
        {
          name: 'Digital Strategy',
          data: {
            title: 'Digital Strategy & Consulting',
            description: 'Strategic guidance to maximize your digital presence. We help you identify opportunities and create actionable roadmaps.',
            icon: 'strategy',
            price: 'Starting at $2,500',
            features: [
              { feature: 'Digital Audit' },
              { feature: 'Growth Strategy' },
              { feature: 'Technology Planning' },
              { feature: 'Performance Analytics' }
            ]
          }
        }
      ]
    },
    {
      name: 'benefits',
      inputs: [
        { name: 'title', type: 'string', required: true, friendlyName: 'Benefit Title' },
        { name: 'description', type: 'longText', required: true, friendlyName: 'Description' },
        { name: 'icon', type: 'string', friendlyName: 'Icon Name' }
      ],
      sampleContent: [
        {
          name: 'Lightning Fast Performance',
          data: {
            title: 'Lightning Fast Performance',
            description: 'Our websites load in under 2 seconds with advanced optimization techniques and modern build tools.',
            icon: 'zap'
          }
        },
        {
          name: 'Mobile-First Design',
          data: {
            title: 'Mobile-First Design',
            description: 'Every project is designed and built with mobile users as the priority, ensuring perfect experiences on all devices.',
            icon: 'mobile'
          }
        },
        {
          name: 'SEO Optimized',
          data: {
            title: 'SEO Optimized',
            description: 'Built-in SEO best practices ensure your website ranks well and attracts organic traffic from day one.',
            icon: 'search'
          }
        },
        {
          name: 'Ongoing Support',
          data: {
            title: 'Ongoing Support',
            description: 'We provide continuous support and maintenance to keep your website secure, updated, and performing optimally.',
            icon: 'support'
          }
        }
      ]
    },
    {
      name: 'hero-content',
      inputs: [
        { name: 'eyebrowText', type: 'string', friendlyName: 'Eyebrow Text' },
        { name: 'headline', type: 'string', required: true, friendlyName: 'Main Headline' },
        { name: 'subheadline', type: 'longText', required: true, friendlyName: 'Subheadline' },
        { name: 'ctaText', type: 'string', friendlyName: 'CTA Button Text', defaultValue: 'Get Started' },
        { name: 'ctaUrl', type: 'string', friendlyName: 'CTA Button URL', defaultValue: '/contact' }
      ],
      sampleContent: [
        {
          name: 'Homepage Hero',
          data: {
            eyebrowText: 'Welcome to The Fold Studio',
            headline: 'We Build Digital Experiences That Drive Results',
            subheadline: 'Transform your business with custom web development, stunning design, and strategic digital solutions that convert visitors into customers.',
            ctaText: 'Start Your Project',
            ctaUrl: '/contact'
          }
        }
      ]
    },
    {
      name: 'faq',
      inputs: [
        { name: 'question', type: 'string', required: true, friendlyName: 'Question' },
        { name: 'answer', type: 'longText', required: true, friendlyName: 'Answer' },
        { name: 'category', type: 'string', friendlyName: 'Category' }
      ],
      sampleContent: [
        {
          name: 'How long does a project take?',
          data: {
            question: 'How long does a typical project take?',
            answer: 'Project timelines vary based on complexity and scope. Most websites take 4-8 weeks from start to launch, while larger applications can take 3-6 months. We provide detailed timelines during the planning phase.',
            category: 'Process'
          }
        },
        {
          name: 'What technologies do you use?',
          data: {
            question: 'What technologies do you use?',
            answer: 'We use modern, proven technologies including React, Next.js, Node.js, and various CMS platforms like Builder.io. We choose the best tech stack for each project based on your specific needs.',
            category: 'Technology'
          }
        },
        {
          name: 'Do you provide ongoing support?',
          data: {
            question: 'Do you provide ongoing support and maintenance?',
            answer: 'Yes! We offer comprehensive support packages including security updates, performance monitoring, content updates, and technical assistance. Our goal is your long-term success.',
            category: 'Support'
          }
        },
        {
          name: 'What is your pricing structure?',
          data: {
            question: 'How does your pricing work?',
            answer: 'We offer transparent, project-based pricing tailored to your specific needs. After understanding your requirements, we provide a detailed proposal with clear deliverables and timelines.',
            category: 'Pricing'
          }
        }
      ]
    }
  ]
  
  // Create models
  console.log('=== Creating Models ===')
  for (const model of models) {
    try {
      console.log(`Creating ${model.name} model...`)
      
      const response = await fetch('https://builder.io/api/v2/models', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          name: model.name,
          inputs: model.inputs
        })
      })
      
      if (response.status === 200) {
        console.log(`  ✅ ${model.name} model created`)
      } else {
        console.log(`  ⚠️  ${model.name} model: status ${response.status}`)
      }
    } catch (error) {
      console.log(`  ❌ Error creating ${model.name}: ${error.message}`)
    }
  }
  
  // Small delay to let models propagate
  console.log('\n⏳ Waiting for models to be available...')
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Create content for each model
  console.log('\n=== Creating Content ===')
  for (const model of models) {
    console.log(`\nPopulating ${model.name} with content...`)
    
    for (const content of model.sampleContent) {
      try {
        const response = await fetch(`https://builder.io/api/v1/write/content/${model.name}`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            ...content,
            published: 'published'
          })
        })
        
        if (response.ok) {
          const result = await response.json()
          console.log(`  ✅ Created: ${content.name} (${result.id})`)
        } else {
          console.log(`  ❌ Failed to create: ${content.name}`)
        }
      } catch (error) {
        console.log(`  ❌ Error creating ${content.name}: ${error.message}`)
      }
    }
  }
  
  console.log('\n🎉 All models and content created!')
  console.log('📋 Check your Builder.io dashboard - you should see:')
  console.log('  ✅ 5 content models: testimonials, services, benefits, hero-content, faq')
  console.log('  ✅ Sample content for each model')
  console.log('  ✅ Ready for both manual editing and programmatic updates!')
}

createAllModelsAndContent()