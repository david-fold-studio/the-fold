import ProcessCard from './ProcessCard'
import SectionHeader from './SectionHeader'

export default function Process() {
  const processSteps = [
    {
      phase: "01. DISCOVERY",
      title: "Understanding Your Vision",
      description: [
        "We begin by diving deep into your business goals, target audience, and project requirements.",
        "Through collaborative workshops and strategic planning sessions, we align our approach with your vision."
      ]
    },
    {
      phase: "02. STRATEGY",
      title: "Planning & Architecture",
      description: [
        "Our team develops a comprehensive strategy, including technical architecture and design systems.",
        "We create detailed project roadmaps and timelines to ensure transparent communication throughout."
      ]
    },
    {
      phase: "03. DESIGN",
      title: "Visual Identity & UX",
      description: [
        "We craft intuitive user experiences and stunning visual designs that reflect your brand.",
        "Every element is designed with both aesthetics and functionality in mind."
      ]
    },
    {
      phase: "04. DEVELOPMENT",
      title: "Build & Integration",
      description: [
        "Our developers bring designs to life using modern technologies and best practices.",
        "We ensure scalability, performance, and seamless integration with your existing systems."
      ]
    },
    {
      phase: "05. LAUNCH",
      title: "Testing & Deployment",
      description: [
        "Rigorous testing across all devices and browsers ensures a flawless user experience.",
        "We handle the complete deployment process and provide ongoing support and maintenance."
      ]
    }
  ]

  return (
    <section className='bg-black py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16'>
          <SectionHeader
            eyebrowText="HOW WE WORK"
            title="Our Process"
            paragraphs={[
              "A proven methodology that transforms ideas into exceptional digital experiences"
            ]}
            alignment="center"
            maxWidth="max-w-[600px]"
          />
        </div>

        <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-8'>
          {processSteps.map((step, index) => (
            <ProcessCard
              key={index}
              phase={step.phase}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
