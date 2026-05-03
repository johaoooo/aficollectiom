import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Info, Hand, Leaf, Users, Sparkle, Heart, Trophy,
  ArrowRight, CheckCircle, Images
} from '@phosphor-icons/react'
import MiniHero from '../components/ui/MiniHero'

const valeurs = [
  { title: 'Authenticité', description: 'Chaque création est unique, tissée ou teinte à la main avec des techniques traditionnelles.', icon: Hand, color: '#008753' },
  { title: 'Excellence', description: 'Plus de 35 ans d\'expertise au service de la qualité et d\'une précision sans compromis.', icon: Sparkle, color: '#FCD116' },
  { title: 'Transmission', description: 'Formation et autonomisation de plus de 5000 personnes à travers l\'Afrique de l\'Ouest.', icon: Users, color: '#E8112D' },
  { title: 'Durabilité', description: 'Utilisation de matériaux naturels et techniques respectueuses de l\'environnement.', icon: Leaf, color: '#008753' },
]

const distinctions = [
  { title: 'Prix Africain de l\'Artisanat', year: '2026', location: 'Togo', desc: 'Reconnue pour l\'excellence de ses créations' },
  { title: 'Ambassadrice GRAAD GLOBAL', year: '2025', location: 'Londres, Royaume-Uni', desc: 'Nommée ambassadrice de l\'artisanat africain' },
  { title: 'Prix de l\'Excellence Artisanale', year: '2024', location: 'Bénin', desc: 'Distinction pour la qualité exceptionnelle' },
  { title: 'Médaille d\'Or du Savoir-Faire', year: '2023', location: 'Côte d\'Ivoire', desc: 'Récompense pour la transmission du savoir-faire' },
]

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let start = 0, duration = 2000, step = Math.ceil(target / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else { setCount(start) }
    }, duration / 40)
    return () => clearInterval(timer)
  }, [isVisible, target])

  return <span ref={ref}>{count}</span>
}

export default function About() {
  return (
    <main className="min-h-screen pt-8 pb-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden p-6 md:p-8">
          
          <MiniHero
            image="/mmeafi.jpeg"
            icon={Info}
            badge="Notre histoire"
            title="À propos"
            highlight="d'AFI Collection"
            subtitle="L'art béninois, tissé à la main — une maison fondée sur la passion, portée par la tradition"
            searchPlaceholder=""
            onSearch={() => {}}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            <div className="flex justify-center">
              <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-lg">
                <img src="/mmeafi.jpeg" alt="Mme TOSSA Afiavi - Fondatrice d'AFI Collection" className="w-full h-auto object-cover" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Née d'une passion, <br />
                <span className="text-[#008753]">tissée dans la tradition</span>
              </h2>
              <div className="space-y-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                <p>Fondée le <strong className="text-gray-900 dark:text-white">14 septembre 2015</strong> à Zoundja, Abomey-Calavi, par <strong className="text-gray-900 dark:text-white">Mme TOSSA Afiavi Gbèssito Honorine</strong>, artisane de renommée internationale.</p>
                <p>Forte de plus de <strong className="text-gray-900 dark:text-white">35 ans d'expérience</strong>, elle a bâti un écosystème unique alliant création, vente et formation.</p>
                <p>Aujourd'hui, AFI Collection c'est <strong className="text-gray-900 dark:text-white">6 sous-marques</strong>, <strong className="text-gray-900 dark:text-white">5000+ personnes formées</strong>, et des créations présentes dans plus de <strong className="text-gray-900 dark:text-white">10 pays</strong>.</p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="text-center"><div className="text-xl font-black text-[#008753]">35+</div><div className="text-xs text-gray-500">Années</div></div>
                <div className="text-center"><div className="text-xl font-black text-[#FCD116]">12</div><div className="text-xs text-gray-500">Prix</div></div>
                <div className="text-center"><div className="text-xl font-black text-[#E8112D]">5000+</div><div className="text-xs text-gray-500">Formés</div></div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="text-center mb-6">
              <Heart size={24} weight="fill" className="text-[#E8112D] mx-auto mb-2" />
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Nos valeurs</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {valeurs.map((v) => (
                <div key={v.title} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 text-center group hover:scale-105 transition">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${v.color}15` }}>
                    <v.icon size={22} weight="duotone" style={{ color: v.color }} />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{v.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{v.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <div className="text-center mb-6">
              <Trophy size={24} weight="fill" className="text-[#FCD116] mx-auto mb-2" />
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Nos distinctions</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {distinctions.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#FCD116]/10">
                    <Trophy size={18} weight="fill" className="text-[#FCD116]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.year} - {item.location}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <CheckCircle size={18} weight="fill" className="ml-auto text-[#008753]" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-6 bg-gradient-to-r from-[#008753]/10 to-[#FCD116]/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div><div className="text-3xl font-black text-[#008753]"><AnimatedCounter target={2015} /></div><div className="text-sm font-semibold text-gray-900 dark:text-white">Fondation</div><div className="text-xs text-gray-500">Abomey-Calavi</div></div>
              <div><div className="text-3xl font-black text-[#FCD116]"><AnimatedCounter target={35} />+</div><div className="text-sm font-semibold text-gray-900 dark:text-white">Années</div><div className="text-xs text-gray-500">d'expertise</div></div>
              <div><div className="text-3xl font-black text-[#E8112D]"><AnimatedCounter target={5000} />+</div><div className="text-sm font-semibold text-gray-900 dark:text-white">Personnes</div><div className="text-xs text-gray-500">formées</div></div>
              <div><div className="text-3xl font-black text-[#008753]"><AnimatedCounter target={10} />+</div><div className="text-sm font-semibold text-gray-900 dark:text-white">Pays</div><div className="text-xs text-gray-500">couverts</div></div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/catalogue" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#008753] to-[#006b42] text-white shadow-lg hover:scale-105 transition">
              Découvrir nos collections <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
