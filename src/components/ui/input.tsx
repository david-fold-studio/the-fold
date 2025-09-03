import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full rounded-full border border-[rgba(255,255,255,0.1)] bg-gradient-to-b from-[#e6e6e61a] to-[#ffffff0d] px-6 py-3 text-base font-[var(--font-family-inter)] text-white transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 hover:border-[rgba(255,255,255,0.15)] focus-visible:border-[rgba(255,255,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
