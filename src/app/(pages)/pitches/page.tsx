import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ContentCard from '@/components/ContentCard'
import TeamCard from '@/components/TeamCard'
import ServiceCard from '@/components/ServiceCard'
import { Button } from '@/components/ui/button'
import PitchSection from '@/components/pitch/PitchSection'
import MetricsTable from '@/components/pitch/MetricsTable'
import PitchStats from '@/components/pitch/PitchStats'
import PitchTestimonials from '@/components/pitch/PitchTestimonials'
import CaseStudies from '@/components/CaseStudies'
import TimelineRail from '@/components/ui/timeline-rail'
import FAQ from '@/components/FAQ'
import Benefits from '@/components/Benefits'
import type { Metadata } from 'next'
import { heroData } from '@/app/(pages)/homepage/hero/data'

export const metadata: Metadata = {
  title: 'Custom Software Solutions | AI-Powered Development | The Fold',
  description: 'AI-driven custom software solutions tailored to your needs, built faster and cheaper than ever with user experience at the core.',
  keywords: [
    'custom software development',
    'AI solutions',
    'software engineering',
    'user experience',
    'automation',
    'The Fold'
  ],
}

export default function PitchesPage() {
  // Override hero data to link to team section instead of benefits
  const pitchesHeroData = {
    ...heroData,
    secondaryButton: {
      ...heroData.secondaryButton!,
      href: "#team"
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section - Override to link to team section */}
      <Hero data={pitchesHeroData} />

      <main className="pt-0" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Team Section */}
        <PitchSection
          id="team"
          eyebrowText="WHO WE ARE"
          title="Our Team"
          subtitle="Cross-industry software expertise with proven healthcare success"
          className="py-20"
        >
          <div className="grid md:grid-cols-4 gap-8">
            <TeamCard
              name="David de Jong"
              title="Founder & Design Technologist w/ AI Superpowers"
              description="Agency background bringing cross-industry insights as competitive advantage. Specializes in user experience optimization and AI-driven workflow automation for healthcare practices."
              avatar="/images/david-dejong-headshot.jpeg"
            />
            <TeamCard
              name="Blake Davidson"
              title="Technical Lead"
              description="10+ years software development, built industry-leading allergy practice management software, extensive HIPAA compliance experience. Masters complex healthcare integrations and compliance requirements."
              avatar="/images/blake-davidson-headshot.jpeg"
            />
            <TeamCard
              name="Chris Greathouse"
              title="Director of Sales"
              description="Chris is a true connector of people. He has an extensive background in fundraising, executive coaching and real estate. He loves to help people achieve their greatest dreams and successes."
              avatar="/images/chris-greathouse-headshot.jpeg"
            />
            <TeamCard
              name="+ More"
              title="Specialist Advisors"
              description="We augment our core team with specialist advisors to help with graphic design, frontend development, AI/ML engineering, copywriting, and QA testing as needed for your project."
              avatar="users-icon"
              isSpecialCard={true}
            />
          </div>
        </PitchSection>

        {/* Benefits Section */}
        <Benefits
          data={{
            eyebrowText: "WHY US?",
            title: "You'll love working with the Fold.",
            paragraphs: ["We balance the empathy-driven approach of experience design with the economical savings afforded by cutting-edge AI engineering technologies."],
            benefits: [
              {
                title: "Custom Solutions",
                description: "Custom solutions built specifically for your needs (not one-size-fits-no-one)",
                icon: "HandHeart"
              },
              {
                title: "Transparent Pricing",
                description: "Pre-scoped estimates with time & materials billing",
                icon: "BookOpen"
              },
              {
                title: "Value-First Delivery",
                description: "Sprint-based delivery - lowest hanging fruit first, value delivered early",
                icon: "Gem"
              },
              {
                title: "Flexible Engagement",
                description: "You can cancel at any point",
                icon: "IterationCw"
              }
            ]
          }}
        />

        {/* Case Studies Section */}
        <CaseStudies
          eyebrowText="RECENT SUCCESS"
          title="Proven Results across industries"
          paragraphs={["Real impact from custom software solutions"]}
          limit={2}
        />

        {/* Development Approach Section */}
        <PitchSection
          id="approach"
          eyebrowText="HOW WE WORK"
          title="Traditional vs. Modern Development"
          subtitle="See the difference in workflow efficiency and handoff overhead"
          className="py-20 mx-12"
          backgroundColor="var(--color-grey-900)"
          alignment="left"
          maxWidth="max-w-none"
        >
          <div className="grid md:grid-rows-3 gap-16 mx-auto">
            {/* Developer Led Design */}
            <div className='mr-24'>
              <h3 className="h4 mb-6"
              style={{
                color: 'var(--color-grey-200)'
              }}>Developer-Executed Design: Low Empathy, Low Cost, Some Noise</h3>
              <div className="mt-8">
                <TimelineRail
                  size='sm'
                  gapClassName='justify-between'
                  lineThickness={2}
                  lineColorClass='bg-zinc-800'
                  dotClass='bg-zinc-600'
                  dotActiveClass='bg-zinc-100'
                  labelAngle={0}
                  items={[
                    { label: 'Development', caption: 'Developer starts designing by gathering requirements and (usually) builds the easiest thing they can' },
                    { label: 'Handoff (Noise)', caption: 'Developer hands off to a QA tester (if they have one) to find bugs and issues', dotColor: 'bg-orange-400', labelColor: 'text-orange-400'},
                    { label: 'Testing', caption: 'QA tests and documents all bugs and inconsistencies, then passes them back to the developer to fix (another chance for noise)' },
                    { label: 'Handoff (Noise)', caption: 'QA tester hands feedback and bug reports back to developer for fixes', dotColor: 'bg-orange-400', labelColor: 'text-orange-400'},
                    { label: 'Deployment', caption: 'Developer deploys the app' },
                  ]}
                />
              </div>
            </div>

            {/* Design with Handoff */}
            <div className='mr-24'>
              <h3 className="h4 mb-6" style={{
                color: 'var(--color-grey-200)'
              }}>Design with Handoff: High Empathy, High Cost, Loads of Noise</h3>
              <div className="mt-8">
                <TimelineRail
                  size='sm'
                  gapClassName='justify-between'
                  lineThickness={2}
                  lineColorClass='bg-zinc-800'
                  dotClass='bg-zinc-600'
                  dotActiveClass='bg-zinc-100'
                  labelAngle={0}
                  items={[
                    { label: 'Research', caption: 'UX Researcher conducts full research study and develops artifacts and reports to share with designers and stakeholders' },
                    { label: 'Handoff (Noise)', caption: 'Researcher hands off to designers, trying to communicate the first hand information they heard during research', dotColor: 'bg-orange-400', labelColor: 'text-orange-400' },
                    { label: 'Design', caption: 'Designer Designs and tests a prototype, which is usually a series of images linked together by clickable buttons' },
                    { label: 'Handoff (Noise)', caption: 'Designer hands off to development and tries to document all their specific decisions to the developer, hoping they\'re achievable', dotColor: 'bg-orange-400', labelColor: 'text-orange-400' },
                    { label: 'Development', caption: 'Developer builds the app, often misunderstanding requirements and making compromises along the way' },
                    { label: 'Handoff (Noise)', caption: 'Requirements are passed on to QA tester. Hopefully, they are extensive enough to cover all edge cases', dotColor: 'bg-orange-400', labelColor: 'text-orange-400' },
                    { label: 'Testing', caption: 'Developer tests and documents all bugs and inconsistencies, then passes them back to the developer to fix (another chance for noise)' },
                    { label: 'Deployment', caption: 'Developer deploys the app' },
                  ]}
                />
              </div>
            </div>

            {/* The Fold Process */}
            <div className='mr-24'>
              <h3 className="h4 mb-6" style={{
                color: 'var(--color-grey-200)'
              }}>The Fold's Enhanced Process: High Empathy, Low Cost, Minimal Noise</h3>
              <div className="mt-8">
                <TimelineRail
                  size='sm'
                  gapClassName='justify-between'
                  lineThickness={1}
                  lineColorClass='bg-[#c1dcef]'
                  dotClass='bg-[#c1dcef]'
                  dotActiveClass='bg-[#c1dcef]'
                  labelAngle={0}
                  items={[
                    { label: 'Research & Strategy', caption: 'Design engineer conducts user research with technical architect consultation and AI assistance for rapid insights', dotColor: 'bg-[#c1dcef]' },
                    { label: 'Design & Build', caption: 'Design engineer designs and builds working app with frontend engineer input and AI-powered optimization', dotColor: 'bg-[#c1dcef]' },
                    { label: 'Test', caption: 'Design engineer tests functionality and user experience with technical architect guidance for quality assurance', dotColor: 'bg-[#c1dcef]' },
                    { label: 'Deployment', caption: 'Design engineer deploys solution with AI assistance for rapid delivery and monitoring', dotColor: 'bg-[#c1dcef]' },
                  ]}
                />
              </div>
            </div>
          </div>
        </PitchSection>

        {/* Testimonials Section */}
        <PitchTestimonials />

        {/* Next Steps Section */}
        <PitchSection
          id="next-steps"
          eyebrowText="READY TO START?"
          title="How We Typically Engage"
          subtitle="Three-phase approach to transform your operations"
          className="py-20"
        >
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <ServiceCard
              title="1. Deep Diagnostic"
              description="Technology stack and workflow analysis"
            />
            <ServiceCard
              title="2. Implementation Roadmap"
              description="Detailed plan with ROI projections"
            />
            <ServiceCard
              title="3. Design, Build & Deploy"
              description="Sprint-based delivery with early value"
            />
          </div>

          <div className="text-center">
            <p className="body-lg mb-8">Investment: Significantly less than the revenue opportunities we uncover</p>
            <p className="body-md mb-8">Timeline: First insights within 2-3 weeks</p>
          </div>
        </PitchSection>
      </main>
    </div>
  )
}
