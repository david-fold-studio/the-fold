'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
    })
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id='contact'
      className='bg-gradient-to-br from-purple-50 to-pink-50 py-20'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl'>
            Get In Touch
          </h2>
          <p className='mx-auto max-w-2xl text-xl text-gray-600'>
            Ready to start your next project?
            Let's create something amazing
            together
          </p>
        </div>

        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
          {/* Contact Form */}
          <div className='rounded-3xl bg-white p-8 shadow-xl'>
            <form
              onSubmit={handleSubmit}
              className='space-y-6'
            >
              <div>
                <label
                  htmlFor='name'
                  className='mb-2 block text-sm font-medium text-gray-700'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500'
                  placeholder='Your name'
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='mb-2 block text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500'
                  placeholder='your@email.com'
                />
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='mb-2 block text-sm font-medium text-gray-700'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className='w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500'
                  placeholder='Tell us about your project...'
                />
              </div>

              <button
                type='submit'
                className='w-full rounded-lg bg-black py-4 font-semibold text-white transition-colors hover:bg-gray-800'
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className='space-y-8'>
            <div className='rounded-3xl bg-white p-8 shadow-xl'>
              <h3 className='mb-6 text-2xl font-bold text-gray-900'>
                Contact Information
              </h3>

              <div className='space-y-4'>
                <div className='flex items-center space-x-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-purple-100'>
                    <span className='text-xl text-purple-600'>
                      📧
                    </span>
                  </div>
                  <div>
                    <p className='font-medium text-gray-900'>
                      Email
                    </p>
                    <p className='text-gray-600'>
                      hello@highflier.com
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-pink-100'>
                    <span className='text-xl text-pink-600'>
                      📞
                    </span>
                  </div>
                  <div>
                    <p className='font-medium text-gray-900'>
                      Phone
                    </p>
                    <p className='text-gray-600'>
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100'>
                    <span className='text-xl text-blue-600'>
                      📍
                    </span>
                  </div>
                  <div>
                    <p className='font-medium text-gray-900'>
                      Location
                    </p>
                    <p className='text-gray-600'>
                      San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='rounded-3xl bg-white p-8 shadow-xl'>
              <h3 className='mb-4 text-xl font-bold text-gray-900'>
                Follow Us
              </h3>
              <div className='flex space-x-4'>
                <a
                  href='#'
                  className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-purple-100'
                >
                  <span className='text-xl'>
                    📘
                  </span>
                </a>
                <a
                  href='#'
                  className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-pink-100'
                >
                  <span className='text-xl'>
                    📷
                  </span>
                </a>
                <a
                  href='#'
                  className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-blue-100'
                >
                  <span className='text-xl'>
                    🐦
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
