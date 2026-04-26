import { Link } from 'react-router-dom'
import { ArrowRight, Star, Users, Package, Globe, Trophy, Needle } from '@phosphor-icons/react'
import { subBrands } from '../data/products'

const stats = [
  { icon: <Star weight="fill" size={22} />,    value: "35+",  label: "Années d'expertise" },
  { icon: <Users weight="fill" size={22} />,   value: "500+", label: "Artisans formés" },
  { icon: <Package weight="fill" size={22} />, value: "1000+",label: "Produits vendus" },
  { icon: <Globe weight="fill" size={22} />,   value: "10+",  label: "Pays couverts" },
]

export default function Home() {
  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center
        bg-gradient-to-br from-[#1A1A1A] via-[#008753]/70 to-[#1A1A1A] text-white">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FCD116' fill-opacity='0.6'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-[#FCD116]/20 border border-[#FCD116]/40
            rounded-full px-4 py-1.5 text-[#FCD116] text-sm font-medium mb-8">
            <Trophy weight="fill" size={14} />
            Prix Africain de l'Artisanat 2026
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-tight mb-6">
            L'art béninois,<br />
            <span className="text-[#FCD116]">tissé à la main</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 font-light">
            Depuis 2015, AFI Collection sublime le patrimoine artisanal du Bénin
            à travers six collections uniques, créées par Mme TOSSA Afiavi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalogue/afisac"
              className="flex items-center justify-center gap-2 bg-[#008753] text-white
                px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#006b42]
                transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#008753]/30">
              Découvrir les collections <ArrowRight size={20} />
            </Link>
            <Link to="/formations"
              className="flex items-center justify-center gap-2 border-2 border-white/30
                text-white px-8 py-4 rounded-full font-semibold text-lg
                hover:border-[#FCD116] hover:text-[#FCD116] transition-all">
              Nos formations
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          <span className="text-xs tracking-widest uppercase">Défiler</span>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#008753] py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center text-white">
              <div className="flex justify-center text-[#FCD116] mb-3">{s.icon}</div>
              <div className="font-display text-4xl font-black mb-1">{s.value}</div>
              <div className="text-sm text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SOUS-MARQUES */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#008753] font-semibold tracking-widest uppercase text-sm mb-3">Nos Collections</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-[#1A1A1A]">Six univers artisanaux</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subBrands.map((brand) => (
            <Link key={brand.id} to={`/catalogue/${brand.id}`}
              className="group relative overflow-hidden rounded-2xl border border-gray-100
                bg-white p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                style={{ backgroundColor: brand.color }} />
              <h3 className="font-display text-xl font-bold text-[#1A1A1A] mb-2">{brand.name}</h3>
              <p className="text-sm text-gray-500 mb-6">{brand.tagline}</p>
              <p className="text-xs font-semibold text-gray-400 mb-4">{brand.products.length} produits disponibles</p>
              <div className="flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: brand.color }}>
                Voir la collection
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA FORMATIONS */}
      <section className="bg-[#1A1A1A] py-24 text-white text-center px-6">
        <div className="flex justify-center mb-6 text-[#FCD116]"><Needle size={40} weight="duotone" /></div>
        <p className="text-[#FCD116] font-semibold tracking-widest uppercase text-sm mb-4">Centre Dorcas</p>
        <h2 className="font-display text-4xl md:text-5xl font-black mb-6">
          Apprenez un savoir-faire<br />qui dure toute une vie
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-10">
          4 filières professionnelles certifiantes pour femmes et jeunes filles.
          De 1 à 3 mois de formation intensive avec Mme TOSSA.
        </p>
        <Link to="/formations"
          className="inline-flex items-center gap-2 bg-[#FCD116] text-[#1A1A1A]
            px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all">
          Voir les formations <ArrowRight size={20} />
        </Link>
      </section>
    </main>
  )
}
