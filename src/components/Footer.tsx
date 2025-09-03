export default function Footer() {
  return (
    <footer className='border-t border-gray-800 bg-black py-16 text-white'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-8 grid grid-cols-1 gap-8 md:grid-cols-4'>
          {/* Brand */}
          <div className='col-span-1 md:col-span-2'>
            <h3 className='mb-4 text-2xl font-bold'>
              Highflier
            </h3>
            <p className='mb-6 max-w-md text-gray-400'>
              AI and automation agency
              specializing in transforming
              businesses with cutting-edge
              technology solutions.
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-gray-700'
              >
                <span className='text-sm'>
                  📘
                </span>
              </a>
              <a
                href='#'
                className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-gray-700'
              >
                <span className='text-sm'>
                  📷
                </span>
              </a>
              <a
                href='#'
                className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-gray-700'
              >
                <span className='text-sm'>
                  🐦
                </span>
              </a>
              <a
                href='#'
                className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-gray-700'
              >
                <span className='text-sm'>
                  💼
                </span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className='mb-4 text-lg font-semibold text-white'>
              Services
            </h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-gray-400 transition-colors hover:text-white'
                >
                  Web Applications
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 transition-colors hover:text-white'
                >
                  Landing Pages & Websites
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 transition-colors hover:text-white'
                >
                  iOS Applications
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 transition-colors hover:text-white'
                >
                  QA Testing
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className='mb-4 text-lg font-semibold text-white'>
              Company
            </h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-gray-400 transition-colors hover:text-white'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 transition-colors hover:text-white'
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 transition-colors hover:text-white'
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 transition-colors hover:text-white'
                >
                  Articles
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 pt-8'>
          <div className='flex flex-col items-center justify-between md:flex-row'>
            <p className='mb-4 text-sm text-gray-400 md:mb-0'>
              © 2024 Highflier. All rights
              reserved.
            </p>
            <div className='flex space-x-6'>
              <a
                href='#'
                className='text-sm text-gray-400 transition-colors hover:text-white'
              >
                Privacy Policy
              </a>
              <a
                href='#'
                className='text-sm text-gray-400 transition-colors hover:text-white'
              >
                Terms of Service
              </a>
              <a
                href='#'
                className='text-sm text-gray-400 transition-colors hover:text-white'
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
