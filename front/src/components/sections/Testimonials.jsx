import { motion } from 'framer-motion'
import { Star, Quotes, User } from '@phosphor-icons/react'

const testimonials = [
  {
    id: 1,
    name: 'Fatou Sow',
    role: 'Collectionneuse',
    location: 'Dakar, Sénégal',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 5,
    text: 'Les sacs macramé AFI Collection sont magnifiques ! La qualité est exceptionnelle et chaque pièce est unique.'
  },
  {
    id: 2,
    name: 'Jean-Marc Dubois',
    role: 'Designer',
    location: 'Paris, France',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    rating: 5,
    text: 'Une découverte extraordinaire. Les tissus sont d\'une finesse incomparable. Un savoir-faire unique.'
  },
  {
    id: 3,
    name: 'Aissatou Diallo',
    role: 'Artisane formée',
    location: 'Cotonou, Bénin',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    rating: 5,
    text: 'Grâce à la formation au Centre Dorcas, j\'ai appris le métier. Aujourd\'hui je vis de ma passion.'
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008753]/10 mb-4">
            <Star size={14} weight="fill" className="text-[#FCD116]" />
            <span className="text-xs font-semibold tracking-wider text-[#008753] uppercase">Avis clients</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            Ce qu'ils disent de nous
          </h2>
          <p className="text-gray-500 text-sm mt-2">Des clients et artisanes satisfaits</p>
        </motion.div>

        {/* Grille des témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Étoiles */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} weight="fill" className="text-[#FCD116]" />
                ))}
              </div>
              
              {/* Citation */}
              <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-5">
                "{t.text}"
              </p>
              
              {/* Auteur */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 rounded-full bg-[#008753]/10 flex items-center justify-center overflow-hidden">
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={18} className="text-[#008753]" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role} • {t.location}</p>
                </div>
                <Quotes size={20} className="ml-auto text-[#008753]/30" weight="fill" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note globale */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCD116]/10">
            <Star size={14} weight="fill" className="text-[#FCD116]" />
            <Star size={14} weight="fill" className="text-[#FCD116]" />
            <Star size={14} weight="fill" className="text-[#FCD116]" />
            <Star size={14} weight="fill" className="text-[#FCD116]" />
            <Star size={14} weight="fill" className="text-[#FCD116]" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">4.9/5</span>
            <span className="text-xs text-gray-500">(128 avis)</span>
          </div>
        </div>
      </div>
    </section>
  )
}
