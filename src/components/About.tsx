export default function About() {
  return (
    <section
      id='about'
      className='bg-gradient-to-br from-gray-50 to-purple-50 py-20'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          <div>
            <h2 className='mb-6 text-4xl font-bold text-gray-900 md:text-5xl'>
              About Highflier
            </h2>

            <p className='mb-6 text-xl leading-relaxed text-gray-600'>
              We're a creative bubble agency that
              believes in the power of innovative
              design and strategic thinking to
              transform businesses.
            </p>

            <p className='mb-8 leading-relaxed text-gray-600'>
              With over 5 years of experience in
              the digital space, we've helped
              hundreds of brands create meaningful
              connections with their audiences
              through thoughtful design and
              strategic digital solutions.
            </p>

            <div className='mb-8 grid grid-cols-2 gap-8'>
              <div>
                <div className='mb-2 text-3xl font-bold text-purple-600'>
                  150+
                </div>
                <div className='text-gray-600'>
                  Projects Completed
                </div>
              </div>
              <div>
                <div className='mb-2 text-3xl font-bold text-pink-600'>
                  50+
                </div>
                <div className='text-gray-600'>
                  Happy Clients
                </div>
              </div>
              <div>
                <div className='mb-2 text-3xl font-bold text-blue-600'>
                  5+
                </div>
                <div className='text-gray-600'>
                  Years Experience
                </div>
              </div>
              <div>
                <div className='mb-2 text-3xl font-bold text-green-600'>
                  24/7
                </div>
                <div className='text-gray-600'>
                  Support
                </div>
              </div>
            </div>

            <button className='rounded-full bg-black px-8 py-4 font-semibold text-white transition-colors hover:bg-gray-800'>
              Learn More
            </button>
          </div>

          <div className='relative'>
            <div className='relative z-10 rounded-3xl bg-white p-8 shadow-2xl'>
              <div className='space-y-4'>
                <div className='flex items-center space-x-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-purple-100'>
                    <span className='font-bold text-purple-600'>
                      1
                    </span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>
                      Strategy
                    </h4>
                    <p className='text-sm text-gray-600'>
                      We start with understanding
                      your goals
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-pink-100'>
                    <span className='font-bold text-pink-600'>
                      2
                    </span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>
                      Design
                    </h4>
                    <p className='text-sm text-gray-600'>
                      Creative solutions that
                      stand out
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100'>
                    <span className='font-bold text-blue-600'>
                      3
                    </span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>
                      Development
                    </h4>
                    <p className='text-sm text-gray-600'>
                      Bringing designs to life
                      with code
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                    <span className='font-bold text-green-600'>
                      4
                    </span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>
                      Launch
                    </h4>
                    <p className='text-sm text-gray-600'>
                      Deploy and optimize for
                      success
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className='absolute -right-4 -top-4 -z-10 h-full w-full rounded-3xl bg-gradient-to-br from-purple-200 to-pink-200'></div>
          </div>
        </div>
      </div>
    </section>
  )
}
