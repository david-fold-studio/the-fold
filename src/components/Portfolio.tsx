'use client'

import { useState } from 'react'

export default function Portfolio() {
  const [activeCategory, setActiveCategory] =
    useState('all')

  const categories = [
    'all',
    'web',
    'mobile',
    'branding',
  ]

  const projects = [
    {
      title: 'E-commerce Platform',
      category: 'web',
      image: '/api/placeholder/400/300',
      description:
        'Modern e-commerce solution with seamless UX',
    },
    {
      title: 'Mobile Banking App',
      category: 'mobile',
      image: '/api/placeholder/400/300',
      description:
        'Secure and intuitive banking experience',
    },
    {
      title: 'Brand Identity System',
      category: 'branding',
      image: '/api/placeholder/400/300',
      description:
        'Complete brand identity for tech startup',
    },
    {
      title: 'Corporate Website',
      category: 'web',
      image: '/api/placeholder/400/300',
      description:
        'Professional website for consulting firm',
    },
    {
      title: 'Fitness App UI',
      category: 'mobile',
      image: '/api/placeholder/400/300',
      description:
        'Motivating fitness tracking application',
    },
    {
      title: 'Restaurant Branding',
      category: 'branding',
      image: '/api/placeholder/400/300',
      description:
        'Full branding package for fine dining',
    },
  ]

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter(
          project =>
            project.category === activeCategory
        )

  return (
    <section
      id='portfolio'
      className='bg-white py-20'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl'>
            Our Portfolio
          </h2>
          <p className='mx-auto mb-8 max-w-2xl text-xl text-gray-600'>
            Explore our latest work and see how
            we've helped brands achieve their
            goals
          </p>

          {/* Filter buttons */}
          <div className='flex flex-wrap justify-center gap-4'>
            {categories.map(category => (
              <button
                key={category}
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`rounded-full px-6 py-2 font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category
                  .charAt(0)
                  .toUpperCase() +
                  category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio grid */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {filteredProjects.map(
            (project, index) => (
              <div
                key={index}
                className='group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 transition-all duration-300 hover:shadow-2xl'
              >
                {/* Placeholder for image */}
                <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200'>
                  <div className='text-6xl opacity-50'>
                    {project.category === 'web' &&
                      '🌐'}
                    {project.category ===
                      'mobile' && '📱'}
                    {project.category ===
                      'branding' && '🎨'}
                  </div>
                </div>

                {/* Overlay */}
                <div className='absolute inset-0 flex items-end bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <div className='p-6 text-white'>
                    <h3 className='mb-2 text-xl font-bold'>
                      {project.title}
                    </h3>
                    <p className='text-gray-200'>
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
