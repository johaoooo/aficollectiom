import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Info, Hand, Leaf, Users, Sparkle, Heart, Trophy,
  ArrowRight, CheckCircle, MapPin, Calendar, Star
} from '@phosphor-icons/react'
import MiniHero from '../components/ui/MiniHero'

const valeurs = [
  { title: 'Authenticité', description: 'Chaque création est unique, tissée ou teinte à la main avec des techniques traditionnelles.', icon: Hand, color: '#008753' },
  { title: 'Excellence', description: 'Plus de 35 ans d\'expertise au service de la qualité et d\'une précision sans compromis.', icon: Sparkle, color: '#FCD116' },
  { title: 'Transmission', description: 'Formation et autonomisation de plus de 5000 personnes à travers l\'Afrique de l\'Ouest.', icon: Users, color: '#E8112D' },
  { title: 'Durabilité', description: 'Utilisation de matériaux naturels et techniques respectueuses de l\'environnement.', icon: Leaf, color: '#008753' },
]

const distinctions = [
  { title: 'Prix Africain de l\'Artisanat', year: '2026', location: 'Togo', desc: 'Reconnue pour l\'excellence de ses créations', color: '#008753' },
  { title: 'Ambassadrice GRAAD GLOBAL', year: '2025', location: 'Londres, Royaume-Uni', desc: 'Nommée ambassadrice de l\'artisanat africain', color: '#FCD116' },
  { title: 'Prix de l\'Excellence Artisanale', year: '2024', location: 'Bénin', desc: 'Distinction pour la qualité exceptionnelle', color: '#E8112D' },
  { title: 'Médaille d\'Or du Savoir-Faire', year: '2023', location: 'Côte d\'Ivoire', desc: 'Récompense pour la transmission du savoir-faire', color: '#008753' },
]

const stats = [
  { target: 2015, label: 'Fondation', sub: 'Abomey-Calavi', color: '#008753' },
  { target: 35, suffix: '+', label: 'Années', sub: "d'expertise", color: '#FCD116' },
  { target: 5000, suffix: '+', label: 'Personnes', sub: 'formées', color: '#E8112D' },
  { target: 10, suffix: '+', label: 'Pays', sub: 'couverts', color: '#008753' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } })
}

function AnimatedCounter({ target, suffix = '' }) {
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
    let start = 0
    const step = Math.ceil(target / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 2000 / 40)
    return () => clearInterval(timer)
  }, [isVisible, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  return (
    <main className="min-h-screen pt-2 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden p-6 md:p-8 space-y-16">

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

          {/* Histoire */}
          <div className="max-w-2xl mx-auto">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#008753]/10 border border-[#008753]/20 mb-5">
                <Star size={12} weight="fill" className="text-[#FCD116]" />
                <span className="text-xs font-bold tracking-widest text-[#008753] uppercase">Notre histoire</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-5 leading-snug">
                Née d'une passion, <br />
                <span className="text-[#008753]">tissée dans la tradition</span>
              </h2>

              <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                <p>Fondée le <strong className="text-gray-900 dark:text-white">14 septembre 2015</strong> à Zoundja, Abomey-Calavi, par <strong className="text-gray-900 dark:text-white">Mme TOSSA Afiavi Gbèssito Honorine</strong>, artisane de renommée internationale.</p>
                <p>Forte de plus de <strong className="text-gray-900 dark:text-white">35 ans d'expérience</strong>, elle a bâti un écosystème unique alliant création, vente et formation.</p>
                <p>Aujourd'hui, AFI Collection c'est <strong className="text-gray-900 dark:text-white">6 sous-marques</strong>, <strong className="text-gray-900 dark:text-white">5000+ personnes formées</strong>, et des créations présentes dans plus de <strong className="text-gray-900 dark:text-white">10 pays</strong>.</p>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '35+', label: 'Années', color: '#008753' },
                  { value: '12', label: 'Prix', color: '#FCD116' },
                  { value: '5000+', label: 'Formés', color: '#E8112D' },
                ].map(({ value, label, color }) => (
                  <div
                    key={label}
                    className="text-center p-3 rounded-xl border border-black/5 dark:border-white/8 bg-white/60 dark:bg-gray-700/50"
                    style={{ boxShadow: `0 2px 12px ${color}10` }}
                  >
                    <div className="text-xl font-black mb-0.5" style={{ color }}>{value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Valeurs */}
          <div>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#E8112D]/10 mb-3">
                <Heart size={22} weight="fill" className="text-[#E8112D]" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Nos valeurs</h2>
              <div className="flex justify-center items-center gap-2 mt-2">
                <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#008753]" />
                <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Ce qui nous guide</span>
                <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#E8112D]" />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {valeurs.map((v, i) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group relative p-5 rounded-2xl border border-black/5 dark:border-white/8 bg-white/70 dark:bg-gray-700/50 text-center transition-all duration-300"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 12px 28px ${v.color}18`; e.currentTarget.style.borderColor = `${v.color}30` }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)' }}
                >
                  <div className="absolute top-0 left-1/4 right-1/4 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: v.color }} />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"
                    style={{ backgroundColor: `${v.color}12`, color: v.color }}
                  >
                    <v.icon size={24} weight="duotone" />
                  </motion.div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">{v.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Distinctions */}
          <div>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#FCD116]/15 mb-3">
                <Trophy size={22} weight="fill" className="text-[#FCD116]" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Nos distinctions</h2>
              <div className="flex justify-center items-center gap-2 mt-2">
                <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#FCD116]" />
                <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Reconnaissance internationale</span>
                <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#FCD116]" />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {distinctions.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl border border-black/5 dark:border-white/8 bg-white/70 dark:bg-gray-700/50 transition-all duration-300"
                  style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 24px ${item.color}15`; e.currentTarget.style.borderColor = `${item.color}25` }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: `${item.color}12` }}>
                    <Trophy size={20} weight="fill" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={11} className="text-gray-400 shrink-0" />
                      <span className="text-xs text-gray-500">{item.year}</span>
                      <MapPin size={11} className="text-gray-400 shrink-0" />
                      <span className="text-xs text-gray-500 truncate">{item.location}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">{item.desc}</p>
                  </div>
                  <CheckCircle size={20} weight="fill" className="shrink-0 text-[#008753] opacity-60 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#008753]/8 via-transparent to-[#FCD116]/8" />
            <div className="absolute inset-0 border border-[#008753]/10 rounded-2xl" />

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map(({ target, suffix = '', label, sub, color }, i) => (
                <motion.div
                  key={label}
                  variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="group"
                >
                  <div
                    className="text-3xl md:text-4xl font-black mb-1 transition-transform duration-300 group-hover:scale-110"
                    style={{ color }}
                  >
                    <AnimatedCounter target={target} suffix={suffix} />
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{sub}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#008753] to-[#006b42] text-white shadow-lg shadow-[#008753]/20 hover:scale-105 hover:shadow-[#008753]/30 transition-all duration-300"
            >
              Découvrir nos collections <ArrowRight size={15} />
            </Link>
          </motion.div>

        </div>
      </div>
    </main>
  )
}
