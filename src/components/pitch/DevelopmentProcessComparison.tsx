'use client'

import PitchSection from './PitchSection'
import TimelineRail from '@/components/ui/timeline-rail'

export default function DevelopmentProcessComparison() {
  return (
    <PitchSection
      id="approach"
      eyebrowText="HOW WE WORK"
      title="Traditional vs. Modern Development"
      subtitle="See the difference in workflow efficiency and handoff overhead"
      className="py-20"
      backgroundColor="var(--color-grey-900)"
      alignment="left"
      maxWidth="max-w-none"
    >
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[1500px]">
          <div className="grid md:grid-rows-3 gap-16">
            {/* Developer Led Design */}
            <div>
              <h3 className="h4 mb-12" style={{ color: 'var(--color-grey-200)' }}>
                Developer-Executed Design: Low Empathy, Low Cost, Some Noise
              </h3>
              <div className="pb-4 pt-4">
                <div>
                  <TimelineRail
              size='sm'
              gapClassName='justify-between gap-16'
              lineThickness={2}
              lineColorClass='bg-zinc-800'
              dotClass='bg-zinc-600'
              dotActiveClass='bg-zinc-100'
              labelAngle={0}
              items={[
                {
                  label: 'Development',
                  caption: 'Developer starts designing by gathering requirements and (usually) builds the easiest thing they can'
                },
                {
                  label: 'Handoff (Noise)',
                  caption: 'Developer hands off to a QA tester (if they have one) to find bugs and issues',
                  dotColor: 'bg-orange-400',
                  labelColor: 'text-orange-400'
                },
                {
                  label: 'Testing',
                  caption: 'QA tests and documents all bugs and inconsistencies, then passes them back to the developer to fix (another chance for noise)'
                },
                {
                  label: 'Handoff (Noise)',
                  caption: 'QA tester hands feedback and bug reports back to developer for fixes',
                  dotColor: 'bg-orange-400',
                  labelColor: 'text-orange-400'
                },
                {
                  label: 'Deployment',
                  caption: 'Developer deploys the app'
                },
              ]}
            />
            </div>
          </div>
        </div>

        {/* Design with Handoff */}
        <div>
          <h3 className="h4 mb-12" style={{ color: 'var(--color-grey-200)' }}>
            Design with Handoff: High Empathy, High Cost, Loads of Noise
          </h3>
          <div className="pb-4 pt-4">
            <div>
              <TimelineRail
              size='sm'
              gapClassName='justify-between gap-16'
              lineThickness={2}
              lineColorClass='bg-zinc-800'
              dotClass='bg-zinc-600'
              dotActiveClass='bg-zinc-100'
              labelAngle={0}
              items={[
                {
                  label: 'Research',
                  caption: 'UX Researcher conducts full research study and develops artifacts and reports to share with designers and stakeholders'
                },
                {
                  label: 'Handoff (Noise)',
                  caption: 'Researcher hands off to designers, trying to communicate the first hand information they heard during research',
                  dotColor: 'bg-orange-400',
                  labelColor: 'text-orange-400'
                },
                {
                  label: 'Design',
                  caption: 'Designer Designs and tests a prototype, which is usually a series of images linked together by clickable buttons'
                },
                {
                  label: 'Handoff (Noise)',
                  caption: 'Designer hands off to development and tries to document all their specific decisions to the developer, hoping they\'re achievable',
                  dotColor: 'bg-orange-400',
                  labelColor: 'text-orange-400'
                },
                {
                  label: 'Development',
                  caption: 'Developer builds the app, often misunderstanding requirements and making compromises along the way'
                },
                {
                  label: 'Handoff (Noise)',
                  caption: 'Requirements are passed on to QA tester. Hopefully, they are extensive enough to cover all edge cases',
                  dotColor: 'bg-orange-400',
                  labelColor: 'text-orange-400'
                },
                {
                  label: 'Testing',
                  caption: 'Developer tests and documents all bugs and inconsistencies, then passes them back to the developer to fix (another chance for noise)'
                },
                {
                  label: 'Deployment',
                  caption: 'Developer deploys the app'
                },
              ]}
            />
            </div>
          </div>
        </div>

        {/* The Fold Process */}
        <div>
          <h3 className="h4 mb-12" style={{ color: 'var(--color-grey-200)' }}>
            The Fold's Enhanced Process: High Empathy, Low Cost, Minimal Noise
          </h3>
          <div className="pb-4 pt-4">
            <div>
              <TimelineRail
              size='sm'
              gapClassName='justify-between gap-16'
              lineThickness={1}
              lineColorClass='bg-[#c1dcef]'
              dotClass='bg-[#c1dcef]'
              dotActiveClass='bg-[#c1dcef]'
              labelAngle={0}
              items={[
                {
                  label: 'Research & Strategy',
                  caption: 'Design engineer conducts user research with technical architect consultation and AI assistance for rapid insights',
                  dotColor: 'bg-[#c1dcef]'
                },
                {
                  label: 'Design & Build',
                  caption: 'Design engineer designs and builds working app with frontend engineer input and AI-powered optimization',
                  dotColor: 'bg-[#c1dcef]'
                },
                {
                  label: 'Test',
                  caption: 'Design engineer tests functionality and user experience with technical architect guidance for quality assurance',
                  dotColor: 'bg-[#c1dcef]'
                },
                {
                  label: 'Deployment',
                  caption: 'Design engineer deploys solution with AI assistance for rapid delivery and monitoring',
                  dotColor: 'bg-[#c1dcef]'
                },
              ]}
              />
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </PitchSection>
  )
}
