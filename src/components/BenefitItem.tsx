import { Zap, BarChart3, GitMerge, Bot, HandHeart, BookOpen, Gem, IterationCw } from 'lucide-react'

interface BenefitItemProps {
  title: string
  description: string
  icon?: string
}

const iconMap = {
  Lightning: Zap,
  ChartPie: BarChart3,
  ShareNetwork: GitMerge,
  Robot: Bot,
  HandHeart: HandHeart,
  BookOpen: BookOpen,
  Gem: Gem,
  IterationCw: IterationCw
}

export default function BenefitItem({ title, description, icon }: BenefitItemProps) {
  const IconComponent = icon ? iconMap[icon as keyof typeof iconMap] : null

  return (
    <div className="flex flex-col gap-3 py-8 pl-6 relative">
      <div className="flex items-center gap-2 relative">
        {IconComponent && (
          <IconComponent 
            className="w-5 h-5" 
            style={{ color: 'var(--color-azure-85)' }} 
          />
        )}
        <h3 className="h3">{title}</h3>
        {/* Small left border next to icon */}
        <div 
          className="absolute left-[-25px] top-0 bottom-0 w-px" 
          style={{ backgroundColor: 'var(--color-azure-85)' }}
        />
      </div>
      <p className="body-md whitespace-pre-line">
        {description}
      </p>
    </div>
  )
}