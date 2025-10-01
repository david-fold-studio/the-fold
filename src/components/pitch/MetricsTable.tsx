'use client'

interface MetricsTableProps {
  className?: string
}

export default function MetricsTable({ className = '' }: MetricsTableProps) {
  const metricsData = [
    {
      metric: 'Annual Revenue per Dentist',
      independent: '$700-900K*',
      dso: '$800K-1.2M*',
      opportunity: '?'
    },
    {
      metric: 'Collection Rate',
      independent: '94.3%*',
      dso: '96-98%*',
      opportunity: '?'
    },
    {
      metric: 'Chair Utilization',
      independent: '65-75%*',
      dso: '80-85%*',
      opportunity: '?'
    },
    {
      metric: 'Admin Overhead',
      independent: 'Baseline*',
      dso: '30-40% lower*',
      opportunity: '?'
    }
  ]

  return (
    <div className={`overflow-hidden rounded-xl border ${className}`} style={{
      backgroundColor: 'var(--color-grey-900)',
      borderColor: 'var(--color-grey-800)'
    }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: 'var(--color-grey-850)' }}>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--color-white-solid)' }}>
                Metric
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--color-white-solid)' }}>
                Independent Groups<br />
                <span className="text-sm font-normal opacity-75">(10-15 locations)</span>
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--color-white-solid)' }}>
                DSOs<br />
                <span className="text-sm font-normal opacity-75">(15+ locations)</span>
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--color-blue-400)' }}>
                Your Opportunity
              </th>
            </tr>
          </thead>
          <tbody>
            {metricsData.map((row, index) => (
              <tr
                key={index}
                className="border-t transition-colors hover:bg-gray-800/50"
                style={{ borderColor: 'var(--color-grey-800)' }}
              >
                <td className="px-6 py-4 font-medium" style={{ color: 'var(--color-grey-100)' }}>
                  {row.metric}
                </td>
                <td className="px-6 py-4" style={{ color: 'var(--color-grey-300)' }}>
                  {row.independent}
                </td>
                <td className="px-6 py-4" style={{ color: 'var(--color-grey-300)' }}>
                  {row.dso}
                </td>
                <td className="px-6 py-4 font-medium" style={{ color: 'var(--color-blue-400)' }}>
                  {row.opportunity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t" style={{
        backgroundColor: 'var(--color-grey-850)',
        borderColor: 'var(--color-grey-800)'
      }}>
        <p className="text-sm" style={{ color: 'var(--color-grey-400)' }}>
          *Illustrative ranges based on industry analysis - exact metrics vary by practice
        </p>
      </div>

      <div className="px-6 py-6 border-t" style={{ borderColor: 'var(--color-grey-800)' }}>
        <h4 className="font-semibold mb-3" style={{ color: 'var(--color-white-solid)' }}>
          Question: Which of these metrics do you track across locations?
        </h4>
        <p className="text-sm mb-4" style={{ color: 'var(--color-grey-300)' }}>
          <strong>The Challenge:</strong> These advantages traditionally required giving up ownership and control
        </p>
        <p className="text-sm" style={{ color: 'var(--color-blue-400)' }}>
          <strong>Our Solution:</strong> Custom systems that deliver DSO-level efficiency while maintaining your independence
        </p>
      </div>
    </div>
  )
}