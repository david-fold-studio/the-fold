'use client'

import { Zap, Target, TrendingUp, Shield, Users, BarChart, Calendar, Clock } from 'lucide-react'

interface PitchStatsProps {
  title: string
  description: string
  icon?: 'zap' | 'target' | 'trending-up' | 'shield' | 'users' | 'bar-chart' | 'calendar' | 'clock'
  highlight?: string
  className?: string
}

const iconMap = {
  'zap': Zap,
  'target': Target,
  'trending-up': TrendingUp,
  'shield': Shield,
  'users': Users,
  'bar-chart': BarChart,
  'calendar': Calendar,
  'clock': Clock,
}

export default function PitchStats({
  title,
  description,
  icon = 'zap',
  highlight,
  className = ''
}: PitchStatsProps) {
  const IconComponent = iconMap[icon]

  return (
    <div className={`p-6 rounded-xl border transition-all duration-300 hover:border-blue-500/50 ${className}`} style={{
      background: 'var(--gradient-subtle)',
      borderColor: 'var(--color-grey-800)'
    }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <IconComponent className="w-4 h-4 text-blue-400" />
        </div>
        <h3 className="h4" style={{ color: 'var(--color-white-solid)' }}>
          {title}
        </h3>
      </div>

      <p className="body-sm mb-3" style={{ color: 'var(--color-grey-300)' }}>
        {description}
      </p>

      {highlight && (
        <div className="pt-3 border-t" style={{ borderColor: 'var(--color-grey-800)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--color-blue-400)' }}>
            {highlight}
          </p>
        </div>
      )}
    </div>
  )
}