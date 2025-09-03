interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export default function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  className = ''
}: AccordionItemProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border ${className}`}
      style={{
        background: 'var(--gradient-subtle)',
        borderColor: 'var(--color-grey-800)',
      }}
    >
      <button
        onClick={onToggle}
        className='flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-800/50'
      >
        <span className='font-medium text-white'>
          {question}
        </span>
        <div className='h-6 w-6 text-gray-400'>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`transition-transform ${isOpen ? 'rotate-45' : ''}`}
          >
            <path d='M18 6 6 18M6 6l12 12' />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className='px-6 pb-4'>
          <p className='leading-relaxed text-gray-400'>
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}