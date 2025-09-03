'use client'

import SectionHeader from './SectionHeader'
import ContentCard from './ContentCard'
import { Button } from './ui/button'
import type { ArticlesData } from '@/lib/data/types'
import { articlesData } from '@/app/(pages)/homepage/articles/data'

interface ArticlesProps {
  data?: ArticlesData
}

export default function Articles({ data = articlesData }: ArticlesProps) {

  return (
    <section className='bg-black py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16'>
          <SectionHeader
            eyebrowText={data.eyebrowText}
            title={data.title}
            paragraphs={data.paragraphs}
            alignment="center"
            maxWidth="max-w-2xl"
          />
        </div>

        <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-3'>
          {data.articles.map((article, index) => (
            <ContentCard
              key={index}
              title={article.title}
              description={article.description}
              image={article.image}
              alt={article.alt}
              buttonText="Read through"
              buttonVariant="outline"
              buttonSize="sm"
              href={article.link}
            />
          ))}
        </div>

        <div className='text-center'>
          <Button
            variant='outline'
            size='lg'
            onClick={() => window.open('https://ineffable-employee-445106.framer.app/articles', '_blank')}
          >
            Read More Articles
          </Button>
        </div>

      </div>
    </section>
  )
}
