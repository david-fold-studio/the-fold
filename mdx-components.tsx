import type { MDXComponents } from 'mdx/types'
import PitchPricing from '@/components/pitch/PitchPricing'
import ROICalculator from '@/components/pitch/ROICalculator'
import PitchCTA from '@/components/pitch/PitchCTA'
import PitchSection from '@/components/pitch/PitchSection'
import PitchStats from '@/components/pitch/PitchStats'
import PitchTestimonials from '@/components/pitch/PitchTestimonials'
import MetricsTable from '@/components/pitch/MetricsTable'
import SectionHeader from '@/components/SectionHeader'
import TimelineRail from '@/components/ui/timeline-rail'
import Benefits from '@/components/Benefits'
import TeamCard from '@/components/TeamCard'

// Custom components that will be available in MDX files
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Pitch-specific components
    PitchPricing,
    ROICalculator,
    PitchCTA,
    PitchSection,
    PitchStats,
    PitchTestimonials,
    MetricsTable,
    SectionHeader,
    TimelineRail,
    Benefits,
    TeamCard,

    // Custom HTML element styling with constrained width
    h1: ({ children }) => <h1 className="h1 mb-6 mx-auto max-w-[800px] px-6">{children}</h1>,
    h2: ({ children }) => <h2 className="h2 mb-4 mx-auto max-w-[800px] px-6">{children}</h2>,
    h3: ({ children }) => <h3 className="h3 mb-3 mx-auto max-w-[800px] px-6">{children}</h3>,
    p: ({ children }) => <p className="body-md mb-4 mx-auto max-w-[800px] px-6">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 mx-auto max-w-[800px] px-6">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 mx-auto max-w-[800px] px-6">{children}</ol>,
    li: ({ children }) => <li className="body-md">{children}</li>,
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6 mx-auto max-w-[800px] px-6">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="border-b border-grey-700">{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr className="border-b border-grey-800">{children}</tr>,
    th: ({ children }) => (
      <th className="text-left py-3 px-4 font-semibold body-sm text-grey-300">{children}</th>
    ),
    td: ({ children }) => <td className="py-3 px-4 body-sm text-grey-400">{children}</td>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gold-500 pl-4 italic my-4 text-grey-300 mx-auto max-w-[800px] px-6">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-grey-900 px-2 py-1 rounded text-sm font-mono text-gold-400">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-grey-900 p-4 rounded-lg overflow-x-auto mb-4 mx-auto max-w-[800px] px-6">
        {children}
      </pre>
    ),
    hr: () => <hr className="border-grey-800 my-8 mx-auto max-w-[800px]" />,

    ...components,
  }
}
