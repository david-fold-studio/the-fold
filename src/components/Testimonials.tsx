'use client'

import EyebrowHeader from './EyebrowHeader'
import { Button } from './ui/button'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Mark Wheels',
      quote:
        'Exceptional creativity and expertise—this dev team consistently delivers top-notch results with impeccable attention to detail.',
      image:
        'https://framerusercontent.com/images/kCcXd5xyDKJSfPdQgI1QNnPKjeU.jpg',
      link: 'https://x.com/peterkonti',
    },
    {
      name: 'Stephen Cheers',
      quote:
        'This product dev team exceeded our expectations, blending innovation and precision to create mindblowingly complex products fast.',
      image:
        'https://framerusercontent.com/images/aRsyxvxZVkPO1NZOEvgoaowKLYM.jpg',
      link: 'https://x.com/peterkonti',
    },
    {
      name: 'Tristan Reals',
      quote:
        'Outstanding service and remarkable talent—this team brings ideas to life with unparalleled quality and professionalism.',
      image:
        'https://framerusercontent.com/images/gII5JvFnR5oD1ECU24nL5adX8k.jpg',
      link: 'https://x.com/peterkonti',
    },
  ]

  return (
    <section
      id='testimonials'
      className='bg-black py-20'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <div className='mb-8'>
            <EyebrowHeader text="Testimonials" />
          </div>

          <h2 className='mb-4 text-4xl font-bold text-white md:text-5xl'>
            Real Humans, Realest Words
          </h2>
          <p className='mx-auto max-w-2xl text-xl text-gray-300'>
            Warning! These folks are our long time
            supporters and they say nice things
            about us all the time, here are some
            of them.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {testimonials.map(
            (testimonial, index) => (
              <div
                key={index}
                className='rounded-2xl border p-6'
                style={{
                  backgroundColor: 'var(--color-grey-900)',
                  borderColor: 'var(--color-grey-800)',
                }}
              >
                <div className='mb-4 h-16 w-16 overflow-hidden rounded-xl border' style={{ borderColor: 'var(--color-grey-800)' }}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className='h-full w-full object-cover'
                  />
                </div>

                <div className='mb-6'>
                  <h4 className='mb-3 text-lg font-bold text-white'>
                    {testimonial.name}
                  </h4>
                  <p className='leading-relaxed text-gray-400'>
                    "{testimonial.quote}"
                  </p>
                </div>

                <Button 
                  variant='outline' 
                  size='md'
                  asChild
                >
                  <a
                    href={testimonial.link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Find him on X
                  </a>
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
