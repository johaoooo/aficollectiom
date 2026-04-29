import Hero from '../components/sections/Hero'
import Categories from '../components/sections/Categories'
import Collections from '../components/sections/Collections'
import WhyUs from '../components/sections/WhyUs'
import TrainingCTA from '../components/sections/TrainingCTA'

export default function Home() {
  return (
    <main className="overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Hero />
      
      {/* Categories avec bords arrondis */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none border border-gray-200 dark:border-white/10">
          <Categories />
        </div>
      </div>

      {/* Collections avec bords arrondis */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none border border-gray-200 dark:border-white/10">
          <Collections />
        </div>
      </div>

      {/* WhyUs avec bords arrondis */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none border border-gray-200 dark:border-white/10">
          <WhyUs />
        </div>
      </div>

      {/* TrainingCTA avec bords arrondis */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <TrainingCTA />
        </div>
      </div>
    </main>
  )
}
