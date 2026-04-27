import { motion } from 'framer-motion';
import { Star, Quotes, Check } from '@phosphor-icons/react';

const testimonials = [
  {
    id: 1,
    name: 'Fatou Sow',
    role: 'Collectionneuse',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    rating: 5,
    text: 'Des sacs magnifiques, d\'une qualité exceptionnelle. Chaque pièce est unique et raconte une histoire.',
    product: 'Sac AFISAC'
  },
  {
    id: 2,
    name: 'Jean Dubois',
    role: 'Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    rating: 5,
    text: 'Les tissus sont d\'une finesse rare. Un savoir-faire authentique qui mérite d\'être connu.',
    product: 'Pagne teint'
  },
  {
    id: 3,
    name: 'Aissatou D.',
    role: 'Artisane',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
    rating: 5,
    text: 'La formation m\'a permis de vivre de ma passion. Un parcours qui change des vies.',
    product: 'Formation'
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête simple */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              <Star size={12} weight="fill" className="text-[#FCD116]" />
              <Star size={12} weight="fill" className="text-[#FCD116]" />
              <Star size={12} weight="fill" className="text-[#FCD116]" />
              <Star size={12} weight="fill" className="text-[#FCD116]" />
              <Star size={12} weight="fill" className="text-[#FCD116]" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">
            Ce qu'ils pensent de nous
          </h2>
          <p className="text-gray-500 text-sm mt-2">Avis vérifiés de clients et artisans</p>
        </div>

        {/* 3 colonnes d'avis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-gray-50 dark:bg-gray-800 rounded-xl p-5 transition-all duration-300 hover:shadow-md">
                
                {/* Guillemet décoratif */}
                <div className="absolute top-3 right-3 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Quotes size={30} weight="fill" />
                </div>
                
                {/* Étoiles */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      weight={i < testimonial.rating ? 'fill' : 'regular'}
                      className={i < testimonial.rating ? 'text-[#FCD116]' : 'text-gray-200 dark:text-gray-600'}
                    />
                  ))}
                </div>
                
                {/* Texte */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                
                {/* Auteur */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-600"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {testimonial.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{testimonial.role}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span className="text-xs text-[#008753] font-medium">{testimonial.product}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note globale discrète */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800">
            <Check size={12} weight="bold" className="text-[#008753]" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              128 clients satisfaits
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
