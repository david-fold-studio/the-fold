'use client'

import PitchSection from './PitchSection'
import TeamCard from '@/components/TeamCard'

export default function TeamSection() {
  return (
    <PitchSection
      id="team"
      eyebrowText="WHO WE ARE"
      title="Our Team"
      subtitle="Cross-industry software expertise with proven success across multiple industries"
      className="py-20"
    >
      <div className="grid md:grid-cols-4 gap-8">
        <TeamCard
          name="David de Jong"
          title="Founder & Design Technologist w/ AI Superpowers"
          description="Agency background bringing cross-industry insights as competitive advantage. Specializes in user experience optimization and AI-driven workflow automation."
          avatar="/images/david-dejong-headshot.jpeg"
        />
        <TeamCard
          name="Blake Davidson"
          title="Technical Lead"
          description="10+ years software development, built industry-leading practice management software. Masters complex integrations, scalable architecture, and compliance requirements."
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
  )
}
