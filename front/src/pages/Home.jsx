import { Link } from 'react-router-dom'
import {
  ArrowRight, Needle, WhatsappLogo
} from '@phosphor-icons/react'
import Hero from '../components/sections/Hero'
import Categories from '../components/sections/Categories'
import Collections from '../components/sections/Collections'
import WhyUs from '../components/sections/WhyUs'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      
      {/* CATEGORIES */}
      <Categories />

      {/* COLLECTIONS */}
      <Collections />

      {/* POURQUOI NOUS CHOISIR */}
      <WhyUs />

      {/* CTA FORMATIONS */}
      <section className="py-20 bg-gradient-to-br from-[#1A1A1A] to-[#0a2e1a] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl
            bg-[#FCD116]/20 border border-[#FCD116]/30 mb-6 mx-auto">
            <Needle size={32} weight="duotone" className="text-[#FCD116]" />
          </div>
          <span className="inline-block text-[#FCD116] text-xs font-bold tracking-widest uppercase mb-3">
            Centre de Formation Dorcas
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black mb-4 leading-tight">
            Apprenez un savoir-faire<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCD116] to-[#E8112D]">
              qui dure toute une vie
            </span>
          </h2>
          <p className="text-white/50 text-sm max-w-xl mx-auto mb-8">
            4 filières professionnelles certifiantes. Formation intensive avec Mme TOSSA Afiavi.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/formations"
              className="inline-flex items-center justify-center gap-2 bg-[#FCD116] text-[#1A1A1A]
                px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all">
              Voir les formations
              <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/2290196062287" target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20
                text-white px-6 py-3 rounded-xl font-semibold text-sm
                hover:border-[#25D366] hover:text-[#25D366] transition-all">
              <WhatsappLogo weight="fill" size={16} />
              S'inscrire via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
