import Articles from '@/components/Articles'
import Benefits from '@/components/Benefits'
import CaseStudies from '@/components/CaseStudies'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Pricing from '@/components/Pricing'
import Process from '@/components/Process'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import { faqData } from './homepage/faq/data'

export default function Home() {
  return (
    <div className="relative">
      {/* Background image positioned below hero */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          marginTop: '100vh', // Position below hero section
        }}
      >
        <img
          src='https://framerusercontent.com/images/7V66gGSCkC8V90au7XpqPz7gas.png'
          alt='Background'
          className='h-full w-full object-cover'
        />
      </div>
      
      <main
        className='min-h-screen flex flex-col items-center w-full gap-16 relative z-10'
        style={{
          backgroundColor:
            'var(--color-black-solid)',
          color: 'var(--color-white-solid)',
        }}
      >
        <Navigation />
        <Hero />
        <Benefits />
        <CaseStudies />
        <Services />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQ data={faqData} />
        {/* <Articles /> */}
        <Footer />
      </main>
    </div>
  )
}
