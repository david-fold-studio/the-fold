interface BenefitItemProps {
  title: string
  description: string
  icon?: string
}

export default function BenefitItem({ title, description, icon }: BenefitItemProps) {
  return (
    <div className="flex flex-col gap-3 py-8 pl-6 relative">
      <div className="flex items-center gap-2 relative">
        {icon && <img src={icon} alt="" className="w-5 h-5" />}
        <h3 className="h3">{title}</h3>
        {/* Small left border next to icon */}
        <div 
          className="absolute left-[-25px] top-0 bottom-0 w-px" 
          style={{ backgroundColor: 'var(--color-azure-85)' }}
        />
      </div>
      <p className="body-md text-[var(--color-grey-600)] whitespace-pre-line">
        {description}
      </p>
    </div>
  )
}