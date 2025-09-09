interface FAQCardProps {
  question: string
  answer: string
}

export default function FAQCard({ question, answer }: FAQCardProps) {
  return (
    <div
      className='rounded-2xl p-8 border group hover:animate-pulse-border'
      style={{
        backgroundColor: 'var(--color-grey-850)',
        borderColor: 'var(--color-grey-800)',
        '--hover-border-color': 'rgb(75, 85, 99)',
      }}
    >
      <div className='flex flex-col space-y-6 h-100%'>
        <div className='h-100%'>
          <h3 className='h3 mb-4' style={{ color: 'var(--color-body-strong)' }}>
            {question}
          </h3>
          <p className='body-md leading-relaxed' style={{ color: 'var(--color-body-base)' }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}