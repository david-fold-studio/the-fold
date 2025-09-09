interface ProcessCardProps {
  phase: string
  title: string
  description: string[]
}

export default function ProcessCard({ phase, title, description }: ProcessCardProps) {
  return (
    <div
      className='rounded-2xl p-8 border group transition-all duration-300'
      style={{
        background: 'var(--gradient-subtle)',
        borderColor: 'var(--color-grey-800)',
      }}
    >
      <div className='flex flex-col space-y-6'>
        <div 
          className='inline-flex w-fit items-center rounded-full px-3 py-1.5 border transition-all duration-300 group-hover:border-white'
          style={{
            backgroundColor: 'var(--color-grey-850)',
            borderColor: 'var(--color-grey-700)',
          }}
        >
          <span className='badge-text' style={{ color: 'var(--color-body-strong)' }}>
            {phase}
          </span>
        </div>

        <div>
          <h3 className='h3 mb-4' style={{ color: 'var(--color-body-strong)' }}>
            {title}
          </h3>
          <div className='space-y-3'>
            {description.map((paragraph, index) => (
              <p key={index} className='body-md' style={{ color: 'var(--color-body-strong)' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}