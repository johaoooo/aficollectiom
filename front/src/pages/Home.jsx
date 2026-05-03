import Hero from '../components/sections/Hero'
import Categories from '../components/sections/Categories'
import Collections from '../components/sections/Collections'
import WhyUs from '../components/sections/WhyUs'
import VideoTestimonials from '../components/sections/VideoTestimonials'
import Partners from '../components/sections/Partners'
import TrainingCTA from '../components/sections/TrainingCTA'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-2xl overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
          <Categories />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-2xl overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
          <Collections />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-2xl overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
          <WhyUs />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-2xl overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
          <VideoTestimonials />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Partners />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <TrainingCTA />
        </div>
      </div>
    </main>
  )
}
