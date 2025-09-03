import BenefitItem from './BenefitItem'
import SectionHeader from './SectionHeader'
import type { BenefitsData } from '@/lib/data/types'
import { benefitsData } from '@/app/(pages)/homepage/benefits/data'

interface BenefitsProps {
  data?: BenefitsData
}

export default function Benefits({ data = benefitsData }: BenefitsProps) {
  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-[1216px] px-6">
        <div className="flex gap-20 max-lg:flex-col max-lg:gap-12">
          {/* Left Column - Header Content */}
          <div className="flex-1 max-w-[500px]">
            <SectionHeader
              eyebrowText={data.eyebrowText}
              title={data.title}
              paragraphs={data.paragraphs}
              alignment="left"
              className="flex flex-col gap-6"
            />
          </div>

          {/* Right Column - Benefits Grid */}
          <div className="flex-1 max-w-[500px]">
            <div className="grid grid-cols-2 gap-4">
              {data.benefits.map((benefit, index) => (
                <BenefitItem key={index} {...benefit} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
