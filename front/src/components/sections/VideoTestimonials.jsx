import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Play, X, Users, Star } from '@phosphor-icons/react'

const testimonials = [
  {
    id: 1,
    name: 'Fatou Sow',
    role: 'Collectionneuse d\'art',
    location: 'Dakar, Sénégal',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/afi.jpeg',
    description: 'Les sacs macramé AFI Collection sont de véritables œuvres d\'art.'
  },
  {
    id: 2,
    name: 'Jean-Marc Dubois',
    role: 'Designer textile',
    location: 'Paris, France',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/afi2.jpeg',
    description: 'Un savoir-faire unique qui mérite d\'être connu dans le monde entier.'
  },
  {
    id: 3,
    name: 'Aissatou Diallo',
    role: 'Artisane formée',
    location: 'Cotonou, Bénin',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/afi7.jpeg',
    description: 'Grâce à la formation, je vis de ma passion aujourd\'hui.'
  }
]

export default function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008753]/10 mb-4">
            <Users size={14} weight="duotone" className="text-[#008753]" />
            <span className="text-xs font-semibold tracking-wider text-[#008753] uppercase">Témoignages vidéo</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            Ils parlent de nous
          </h2>
          <p className="text-gray-500 text-sm mt-2">Découvrez les retours de nos clients en vidéo</p>
        </motion.div>

        {/* Grille des vidéos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(t)}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Miniature */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={t.thumbnail} 
                    alt={t.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Play size={20} weight="fill" className="text-[#008753] ml-1" />
                    </div>
                  </div>
                </div>
                
                {/* Infos */}
                <div className="p-5">
                  <div className="flex gap-0.5 mb-3">
                    <Star size={12} weight="fill" className="text-[#FCD116]" />
                    <Star size={12} weight="fill" className="text-[#FCD116]" />
                    <Star size={12} weight="fill" className="text-[#FCD116]" />
                    <Star size={12} weight="fill" className="text-[#FCD116]" />
                    <Star size={12} weight="fill" className="text-[#FCD116]" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-3 line-clamp-2">
                    "{t.description}"
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="w-8 h-8 rounded-full bg-[#008753]/10 flex items-center justify-center">
                      <span className="text-[#008753] font-bold text-xs">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</h4>
                      <p className="text-xs text-gray-500">{t.role} • {t.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal vidéo */}
        {selectedVideo && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedVideo(null)}>
            <div className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70">
                <X size={18} />
              </button>
              <div className="aspect-video">
                <iframe
                  src={`${selectedVideo.videoUrl}?autoplay=1`}
                  title={selectedVideo.name}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5 bg-gray-900">
                <h3 className="font-bold text-white text-lg">{selectedVideo.name}</h3>
                <p className="text-gray-400 text-sm">{selectedVideo.role} • {selectedVideo.location}</p>
                <p className="text-gray-300 text-sm mt-2">{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
