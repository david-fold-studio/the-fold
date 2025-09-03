'use client'

import EyebrowHeader from './EyebrowHeader'
import { Button } from './ui/button'

export default function Pricing() {
  const pricingOptions = [
    {
      option: 'OPTION 1',
      title: 'Two Week Sprint',
      description:
        'Fast-track your dev projects without compromising quality.',
      price: '$12,995',
      period: '/flat fee',
      features: [
        "You're hiring a six-person, well oiled machine",
        '24 years of combined experience',
        'Proven track record (164 projects done)',
        'No meetings needed',
        'Single investment, multiple rewards',
      ],
      buttonText: 'Get Started',
    },
    {
      option: 'OPTION 2',
      title: 'Monthly Subscription',
      description:
        'Fast-track your dev projects without compromising quality.',
      price: '$19,995',
      period: '/monthly',
      features: [
        "You're hiring a six-person, well oiled machine",
        '24 years of combined experience',
        'Proven track record (164 projects done)',
        'We can meet sometimes',
        '6 senior designers for the price of 1',
      ],
      buttonText: 'Get Going',
    },
  ]

  return (
    <section
      id='pricing'
      style={{
        backgroundColor:
          'var(--color-black-solid)',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        <div className='mb-16 text-center'>
          <div style={{ marginBottom: '40px' }}>
            <EyebrowHeader text="Pricing" />
          </div>

          <h2
            style={{
              fontSize: '48px',
              fontWeight:
                'var(--font-weight-medium)',
              color: 'var(--color-white-solid)',
              marginBottom: '24px',
              lineHeight: '56px',
              letterSpacing: '-0.96px',
            }}
          >
            Premium work, premium price
          </h2>
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <p
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                color: 'var(--color-grey-80)',
                marginBottom: '8px',
              }}
            >
              Here's what you can expect if you
              choose to work with us.
            </p>
            <p
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                color: 'var(--color-grey-80)',
              }}
            >
              Everything starts with a quick intro
              call and it goes from there.
            </p>
          </div>
        </div>

        {/* Showreel images */}
        <div
          className='flex justify-center'
          style={{
            marginBottom: '64px',
          }}
        >
          <div
            className='relative w-full overflow-hidden rounded-2xl'
            style={{
              maxWidth: '600px',
              aspectRatio: '16/9',
              borderWidth:
                'var(--stroke-weight-1)',
              borderColor: 'var(--color-grey-800)',
            }}
          >
            <img
              src='https://framerusercontent.com/images/Ijrh4KEyi7EPvHAuaQepFy3SsQ.jpg'
              alt='Pricing showcase'
              className='h-full w-full object-cover'
            />
          </div>
        </div>

        <div
          className='grid grid-cols-1 gap-8 md:grid-cols-2'
          style={{
            marginTop: '64px',
          }}
        >
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              className='rounded-2xl'
              style={{
                backgroundColor:
                  'var(--color-grey-900)',
                borderWidth:
                  'var(--stroke-weight-1)',
                borderColor:
                  'var(--color-grey-800)',
                padding: '32px',
              }}
            >
              <div className='mb-6'>
                <div
                  className='inline-flex items-center rounded-full'
                  style={{
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    borderWidth:
                      'var(--stroke-weight-1)',
                    borderColor:
                      'var(--color-grey-600)',
                    backgroundColor:
                      'var(--color-grey-850)',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight:
                        'var(--font-weight-medium)',
                      color:
                        'var(--color-grey-66)',
                      letterSpacing: '1.2px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {option.option}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '28px',
                    fontWeight:
                      'var(--font-weight-medium)',
                    color:
                      'var(--color-white-solid)',
                    marginBottom: '8px',
                    lineHeight: '36px',
                  }}
                >
                  {option.title}
                </h3>
                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: 'var(--color-grey-66)',
                    marginBottom: '24px',
                  }}
                >
                  {option.description}
                </p>

                <div
                  className='flex items-baseline'
                  style={{
                    marginBottom: '32px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '32px',
                      fontWeight:
                        'var(--font-weight-medium)',
                      color:
                        'var(--color-white-solid)',
                    }}
                  >
                    {option.price}
                  </span>
                  <span
                    style={{
                      fontSize: '16px',
                      color:
                        'var(--color-grey-66)',
                      marginLeft: '4px',
                    }}
                  >
                    {option.period}
                  </span>
                </div>
              </div>

              <div
                style={{
                  marginBottom: '32px',
                }}
              >
                {option.features.map(
                  (feature, fIndex) => (
                    <div
                      key={fIndex}
                      className='flex items-start'
                      style={{
                        marginBottom: '16px',
                      }}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          marginTop: '2px',
                          marginRight: '12px',
                          color:
                            'var(--color-grey-66)',
                        }}
                      >
                        <svg
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M20 6 9 17l-5-5' />
                        </svg>
                      </div>
                      <span
                        style={{
                          fontSize: '16px',
                          lineHeight: '24px',
                          color:
                            'var(--color-grey-66)',
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  )
                )}
              </div>

              <Button variant='outline' size='md' className='w-full'>
                {option.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
