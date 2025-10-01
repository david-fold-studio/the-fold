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

export const metadata: Metadata = {
  title: 'Multi-Location Dental Practice Scaling | AI-Powered Solutions | The Fold',
  description: 'Transform your dental practice operations with custom AI solutions. Achieve DSO-level efficiency while maintaining independence. 20% growth with 50% fewer hires.',
  keywords: [
    'dental practice management',
    'AI dental solutions',
    'multi-location dental',
    'practice automation',
    'dental analytics',
    'custom software',
    'The Fold'
  ],
}

export default function DentalPitchPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <Hero
        data={{
          title: "Multi-Location Dental Practice Scaling Consultation",
          subtitle: "Achieve DSO-level efficiency while maintaining independence. Custom AI solutions that deliver 20% growth with 50% fewer new hires.",
          videoSrc: "/video-background.mp4",
          primaryButton: {
            text: 'Schedule a Call',
            variant: 'primary',
            size: 'md'
          },
          charOverrides: [],
          lineBreaks: [],
          subtitleLineBreaks: []
        }}
      />

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
          title="Proven Results in Healthcare"
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

        {/* Your Specific Situation Section */}
        <FAQ
          data={{
            eyebrowText: "YOUR SPECIFIC SITUATION",
            title: `"Manpower" is your #1 bottleneck and you want "20% annual growth" - let's talk about that specifically:`,
            paragraphs: [],
            faqs: [
              {
                question: "Which roles are hardest to fill across your 10 locations?",
                answer: ""
              },
              {
                question: "How much time does your staff spend, on average, doing low value tasks such as manual data entry or repetitive tasks such as follow-ups for billing?",
                answer: ""
              },
              {
                question: "How long does it take for you to hear about a problem at one of your locations?",
                answer: ""
              },
              {
                question: "To hit 20% growth, how many new staff would you traditionally need to hire?",
                answer: ""
              },
              {
                question: "What if you could achieve that growth with 50% fewer new hires through automation?",
                answer: ""
              },
              {
                question: "What would an extra $30K per provider annually in revenue enable?",
                answer: ""
              }
            ]
          }}
        />

        {/* Manpower-Focused Tech Solutions Section */}
        <PitchSection
          id="tech-solutions"
          eyebrowText="MANPOWER-FOCUSED TECH SOLUTIONS"
          title="10 Locations"
          subtitle="Custom solutions designed specifically for multi-location practice challenges"
          className="py-20"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <ServiceCard
              title="Real-Time Staff & Capacity Dashboard"
              description="• The opportunity: With 10 locations, you might be managing staffing blindly. • What we could build: Live dashboard showing patient volume, staff schedules, and capacity across all 10 locations. • UX focus: Simple visual interface showing which locations need help vs. have excess capacity. • Manpower impact: Optimize staff allocation in real-time, reduce overtime at busy locations"
            />
            <ServiceCard
              title="Automated Patient Routing System"
              description="• The opportunity: When one location is overbooked, patients should automatically see options at less busy locations. • What we could build: Smart scheduling interface that suggests alternative locations based on real-time capacity. • UX focus: Seamless patient experience - Austin Central is full, but Austin North has availability tomorrow at 2pm. • Manpower impact: Balance patient load across locations without manual coordination"
            />
            <ServiceCard
              title="Cross-Location Performance Analytics"
              description="• The insight: You may not know which locations are most efficient or why. • What we could build: Performance comparison dashboard showing patients-per-staff-hour, revenue-per-employee across all 10 locations. • UX focus: Clear visualizations showing outliers and trends, drill-down to identify best practices. • Manpower impact: Identify and replicate high-efficiency workflows from top performers"
            />
            <ServiceCard
              title="Centralized Administrative Automation"
              description="• The opportunity: 10 locations doing insurance verification manually = massive waste. • What you'd build: Automated insurance verification system + centralized patient follow-up workflows. • UX focus: Simple interfaces for staff to handle exceptions, automated routing of routine tasks. • Manpower impact: Eliminate 40-50 hours weekly of manual administrative work across all locations"
            />
            <ServiceCard
              title="Voice-Activated Charting System"
              description="• The opportunity: Dentists probably spend 10-20 minutes per patient on charting across your 10 locations. • What we could build: Voice-activated charting system that converts spoken notes into structured chart entries. • UX focus: Hands-free documentation during procedures, auto-suggests billing codes, mobile-friendly interface. • Manpower impact: Save 10-15 minutes per patient = 2-3 additional appointment slots daily per provider"
            />
            <ServiceCard
              title="Smart Clinical Templates"
              description="• The insight: Routine procedures get documented the same way every time, but dentists recreate notes from scratch. • What we could build: Pre-populated charting templates based on appointment type with dropdown customization. • UX focus: One-click documentation for standard procedures, easy customization for unique cases. • Manpower impact: Reduce charting time by 60-70% for routine appointments"
            />
          </div>
        </PitchSection>

        {/* Industry Context Section */}
        <PitchSection
          id="industry"
          eyebrowText="INDUSTRY CONTEXT"
          title="DSO Advantages & The Independence Alternative"
          subtitle="Your manpower challenge isn't unique - here's what top performers are doing"
          className="py-20"
          backgroundColor="var(--color-grey-900)"
        >
          <MetricsTable />

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <ContentCard
              title="Documented DSO Advantages"
              description="Reimbursement Rates: 5-15% higher from PPO plans. Overhead Reduction: 20-30% through centralized services. Technology Access: Enterprise systems costing $500K-2M+ annually."
              showImage={false}
            />
            <ContentCard
              title="The Trade-off"
              description="These advantages traditionally required giving up ownership and control of your practice operations and strategic decisions."
              showImage={false}
            />
            <ContentCard
              title="Our Solution"
              description="Custom systems that deliver DSO-level efficiency while maintaining your independence and full control of your roadmap."
              showImage={false}
            />
          </div>
        </PitchSection>

        {/* AI Landscape Section */}
        <PitchSection
          id="ai-landscape"
          eyebrowText="THE AI OPPORTUNITY"
          title="Administrative AI: The Untapped Layer"
          subtitle="Beyond patient engagement lies operational transformation"
          className="py-20"
        >
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="p-8 rounded-xl border" style={{
              background: 'var(--gradient-subtle)',
              borderColor: 'var(--color-grey-800)'
            }}>
              <h3 className="h3 mb-4">Layer 1: Patient Management</h3>
              <p className="body-md mb-4 text-green-400">✓ Already Solved</p>
              <ul className="space-y-2 body-sm">
                <li>• NexHealth scheduling & reminders</li>
                <li>• Automated patient communication</li>
                <li>• Online booking and payments</li>
              </ul>
            </div>

            <div className="p-8 rounded-xl border -mt-4" style={{
              background: 'var(--gradient-subtle)',
              borderColor: 'var(--color-grey-700)'
            }}>
              <h3 className="h3 mb-4">Layer 2: Operations & Analytics</h3>
              <p className="body-md mb-4 text-blue-400">⚡ The Gap (Our Focus)</p>
              <ul className="space-y-2 body-sm">
                <li>• Cross-location performance comparison</li>
                <li>• Staff productivity optimization</li>
                <li>• Predictive capacity planning</li>
                <li>• Automated workflow orchestration</li>
              </ul>
            </div>

            <div className="p-8 rounded-xl border" style={{
              background: 'var(--gradient-subtle)',
              borderColor: 'var(--color-grey-800)'
            }}>
              <h3 className="h3 mb-4">Layer 3: Clinical AI</h3>
              <p className="body-md mb-4 text-orange-400">🔮 Emerging</p>
              <ul className="space-y-2 body-sm">
                <li>• AI imaging and diagnostics</li>
                <li>• Treatment planning assistance</li>
                <li>• Outcome prediction</li>
              </ul>
            </div>
          </div>
        </PitchSection>

        {/* Administrative AI Benefits */}
        <Benefits
          data={{
            eyebrowText: "PROVEN RESULTS",
            title: "Administrative AI ROI",
            paragraphs: ["Real-world performance data from successful deployment case studies drawn from Overjet, VideaHealth, DentalRobot, and Zentist case studies."],
            benefits: [
              {
                title: "400% ROI",
                description: "400% ROI with immediate impact",
                icon: "BarChart3"
              },
              {
                title: "Back-Office Reduction",
                description: "50-75% reduction in back-office requirements",
                icon: "TrendingDown"
              },
              {
                title: "Rev. Cycle Automation",
                description: "87% automation of revenue cycle management and patient communications",
                icon: "Bot"
              }
            ]
          }}
        />

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