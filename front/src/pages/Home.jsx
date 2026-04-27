import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight, Trophy, Needle, Bag, TShirt,
  Sneaker, Scissors, Swatches, Sparkle,
  WhatsappLogo, ArrowUpRight, CheckCircle, Play
} from '@phosphor-icons/react'
import { subBrands } from '../data/products'
import Hero from '../components/sections/Hero'

const brandIcons = {
  'afisac':        <Bag weight="duotone" size={26} />,
  'afi-pagne':     <Swatches weight="duotone" size={26} />,
  'afi-chaussure': <Sneaker weight="duotone" size={26} />,
  'afi-vetement':  <TShirt weight="duotone" size={26} />,
  'afi-tissu':     <Scissors weight="duotone" size={26} />,
  'afi-mode':      <Sparkle weight="duotone" size={26} />,
}

const distinctions = [
  'Prix Africain Artisanat 2026',
  'Ambassadrice GRAAD GLOBAL Londres 2025',
  '500+ Artisans Formés',
  '10+ Pays Couverts',
  "35 Ans d'Expertise",
  'Centre Dorcas depuis 2009',
]

/* Reusable fade-in-up on scroll */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#FAF8F5]">
      <Hero />

      {/* ── MARQUEE DISTINCTIONS ── */}
      <div className="relative bg-[#0D1F14] py-4 overflow-hidden border-y border-[#008753]/30">
        <div className="absolute inset-0 bg-[#008753]/5" />
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-0 shrink-0">
              {distinctions.map((t, j) => (
                <span key={j} className="inline-flex items-center gap-3 px-8 text-white/80 text-xs font-semibold tracking-wide uppercase">
                  <span className="w-1 h-1 rounded-full bg-[#FCD116] shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── COLLECTIONS ── */}
      <section className="py-32 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">

          <FadeUp className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="text-[#008753] text-xs font-bold tracking-[0.25em] uppercase block mb-3">
                  Nos Collections
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-black text-[#0D1F14] leading-tight">
                  Six univers<br />artisanaux
                </h2>
              </div>
              <p className="text-[#666] max-w-xs leading-relaxed text-sm md:text-right">
                Chaque collection reflète un savoir-faire unique,<br className="hidden md:block" />
                transmis de génération en génération au Bénin.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {subBrands.map((brand, idx) => (
              <FadeUp key={brand.id} delay={idx * 0.07}>
                <Link to={`/catalogue/${brand.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-gray-100
                    hover:shadow-xl hover:shadow-black/8 transition-all duration-500 hover:-translate-y-1.5 h-full">

                  {/* Card header */}
                  <div className="relative h-36 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${brand.color}15 0%, ${brand.color}30 100%)` }}>
                    {/* Subtle pattern */}
                    <div className="absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, ${brand.color} 0, ${brand.color} 1px, transparent 0, transparent 50%)`,
                        backgroundSize: '12px 12px'
                      }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center
                        group-hover:scale-110 group-hover:rotate-3 transition-all duration-400"
                        style={{ color: brand.color }}>
                        {brandIcons[brand.id]}
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full
                      bg-white/80 backdrop-blur-sm text-gray-500">
                      {brand.products.length} produits
                    </div>
                    {/* Bottom color bar animation */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                      style={{ backgroundColor: brand.color }} />
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-lg font-black text-[#0D1F14] mb-1">{brand.name}</h3>
                    <p className="text-sm text-gray-400 mb-5 leading-relaxed">{brand.tagline}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-300 font-medium">
                        Dès {Math.min(...brand.products.map(p => p.price)).toLocaleString('fr-FR')} FCFA
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold transition-all duration-200 group-hover:gap-2"
                        style={{ color: brand.color }}>
                        Explorer
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FONDATRICE ── */}
      <section className="py-32 bg-[#0D1F14] text-white relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FCD116' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#008753]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FCD116]/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <FadeUp>
              <span className="text-[#FCD116] text-xs font-bold tracking-[0.25em] uppercase block mb-4">
                La Fondatrice
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-black leading-tight mb-6">
                Mme TOSSA Afiavi<br />
                <span className="text-[#008753]">Gbèssito Honorine</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 text-sm md:text-base max-w-lg">
                Artisane de renommée internationale avec{' '}
                <strong className="text-white">35 ans d'expérience</strong>, fondatrice du Centre Dorcas,
                présidente d'organisations continentales et détentrice de{' '}
                <strong className="text-white">12 distinctions</strong> nationales et internationales.
              </p>

              <div className="space-y-3 mb-10">
                {[
                  "Prix Africain de l'Artisanat 2026 — Togo",
                  'Ambassadrice GRAAD GLOBAL — Londres, 2025',
                  'Directrice Centre Dorcas depuis 2009',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-5 h-5 rounded-full bg-[#008753]/20 border border-[#008753]/40
                      flex items-center justify-center shrink-0 group-hover:bg-[#008753]/40 transition-colors">
                      <CheckCircle weight="fill" size={12} className="text-[#008753]" />
                    </div>
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/a-propos"
                className="inline-flex items-center gap-2 border border-[#008753] text-[#008753]
                  px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#008753] hover:text-white
                  transition-all duration-300 group">
                Lire sa biographie
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeUp>

            {/* Right — card */}
            <FadeUp delay={0.15}>
              <div className="relative max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-3xl border border-[#008753]/20" />
                <div className="absolute -inset-8 rounded-3xl border border-[#FCD116]/10" />

                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                  {/* Photo placeholder */}
                  <div className="w-28 h-28 rounded-full mx-auto mb-5 overflow-hidden
                    ring-2 ring-[#008753]/50 ring-offset-4 ring-offset-[#0D1F14] bg-[#008753]/20
                    flex items-center justify-center">
                    <img src="/log.jpeg" alt="AFI Collection"
                      className="w-full h-full object-contain"
                      style={{ mixBlendMode: 'screen' }} />
                  </div>
                  <div className="font-display text-xl font-black text-white mb-1">Mme TOSSA Afiavi</div>
                  <p className="text-[#008753] text-xs font-semibold tracking-wide uppercase mb-6">Fondatrice & PDG</p>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                    {[{ v: '35+', l: 'Ans' }, { v: '12', l: 'Prix' }, { v: '500+', l: 'Formés' }].map((s, i) => (
                      <div key={i}>
                        <div className="font-display text-2xl font-black text-[#FCD116]">{s.v}</div>
                        <div className="text-[11px] text-white/40 mt-0.5">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── GALERIE TEASER ── */}
      <section className="py-32 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <span className="text-[#008753] text-xs font-bold tracking-[0.25em] uppercase block mb-3">Galerie</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#0D1F14]">
              L'artisanat en images
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['/afi.jpeg', '/afi2.jpeg', '/afi7.jpeg'].map((src, i) => (
                <div key={i}
                  className={`relative overflow-hidden rounded-2xl group cursor-pointer
                    ${i === 0 ? 'md:row-span-2 aspect-[4/5] md:aspect-auto' : 'aspect-square'}`}>
                  <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300
                    flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center
                      opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <Play size={16} weight="fill" className="text-[#008753] ml-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/galerie"
                className="inline-flex items-center gap-2 text-[#008753] font-semibold text-sm
                  border border-[#008753]/30 px-6 py-3 rounded-xl hover:bg-[#008753] hover:text-white
                  hover:border-[#008753] transition-all duration-300 group">
                Voir toute la galerie
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA FORMATIONS ── */}
      <section className="relative overflow-hidden bg-[#008753]">
        {/* Angled top edge */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-[#FAF8F5]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }} />

        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FCD116' fill-opacity='1'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/svg%3E")`
          }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center text-white">
          <FadeUp>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl
              bg-white/10 border border-white/20 mb-8 mx-auto">
              <Needle size={32} weight="duotone" className="text-[#FCD116]" />
            </div>
            <span className="text-[#FCD116] text-xs font-bold tracking-[0.25em] uppercase block mb-4">
              Centre de Formation Dorcas
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black mb-6 leading-tight">
              Apprenez un savoir-faire<br />
              <span className="text-[#FCD116]">qui dure toute une vie</span>
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-10 leading-relaxed text-sm md:text-base">
              4 filières professionnelles certifiantes. De 1 à 3 mois de formation intensive
              avec Mme TOSSA Afiavi, artisane primée.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/formations"
                className="inline-flex items-center justify-center gap-2 bg-[#FCD116] text-[#0D1F14]
                  px-8 py-4 rounded-xl font-black text-sm hover:scale-105 transition-all
                  shadow-xl shadow-black/20 group">
                Voir les formations
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://wa.me/2290196062287" target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30
                  text-white px-8 py-4 rounded-xl font-semibold text-sm
                  hover:border-[#25D366] hover:text-[#25D366] transition-all">
                <WhatsappLogo weight="fill" size={16} />
                S'inscrire via WhatsApp
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Angled bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0D1F14]"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* ── CONTACT RAPIDE ── */}
      <section className="py-24 bg-[#0D1F14]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <p className="text-white/30 text-sm mb-4 tracking-widest uppercase">Une question ?</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-8">
              Contactez-nous directement
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/2290196062287" target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white
                  px-6 py-3.5 rounded-xl font-bold text-sm hover:scale-105 transition-all
                  shadow-lg shadow-[#25D366]/30">
                <WhatsappLogo weight="fill" size={18} />
                +229 01 96 06 22 87
              </a>
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20
                  text-white/70 px-6 py-3.5 rounded-xl font-semibold text-sm
                  hover:border-white/50 hover:text-white transition-all">
                Formulaire de contact
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </main>
  )
}
