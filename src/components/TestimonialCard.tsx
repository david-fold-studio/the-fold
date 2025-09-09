// This defines what information each testimonial card needs to display
interface TestimonialCardProps {
  name: string    // The person's name who gave the testimonial
  title: string   // Their job title or role
  quote: string   // The actual testimonial text they provided
}

// This is the main component that creates a single testimonial card
export default function TestimonialCard({ name, title, quote }: TestimonialCardProps) {
  return (
    // Main container for the testimonial card with rounded corners, padding, and border
    <div
      className='rounded-2xl p-8 border group hover:animate-pulse-border'
      style={{
        backgroundColor: 'var(--color-grey-850)', // Dark grey background color
        borderColor: 'var(--color-grey-800)',     // Slightly lighter grey for the border
      } as React.CSSProperties}
    >
      {/* Inner container that arranges content vertically with spacing */}
      <div className='flex flex-col space-y-6 h-100%'>
        {/* Quote section - takes up available space */}
        <div className='h-100%'>
          <p className='body-md leading-relaxed' style={{ color: 'var(--color-body-strong)' }}>
            "{quote}" {/* Display the testimonial quote with quotation marks */}
          </p>
        </div>
        
        {/* Author information section with a top border separator */}
        <div className='border-t pt-6 h-fit' style={{ borderColor: 'var(--color-grey-800)' }}>
          {/* Person's name displayed as a heading */}
          <h4 className='h3' style={{ color: 'var(--color-body-strong)' }}>
            {name}
          </h4>
          {/* Person's title/role in smaller, uppercase text with extra letter spacing */}
          <p className='body-sm uppercase' style={{ color: 'var(--color-body-base)', letterSpacing: '1.8px' }}>
            {title}
          </p>
        </div>
      </div>
    </div>
  )
}