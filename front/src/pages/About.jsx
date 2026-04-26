import { distinctions } from '../data/products'
import { Trophy, Heart, Star, Globe } from '@phosphor-icons/react'

export default function About() {
  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#FAF6F0]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Hero about */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
          <div>
            <p className="text-[#008753] font-semibold tracking-widest uppercase text-sm mb-4">Notre Histoire</p>
            <h1 className="font-display text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6 leading-tight">
              Mme TOSSA Afiavi<br />
              <span className="text-[#008753]">Gbèssito Honorine</span>
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6">
              Née le 16 mai 1969 à Savè, Mme TOSSA est une artisane de renommée nationale et internationale,
              forte de plus de <strong>35 années d'expérience</strong> dans le macramé, la teinture de pagne et le tissage.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Elle a fondé AFI Collection le 14 septembre 2015 à Zoundja, Abomey-Calavi, avec pour mission
              de valoriser le patrimoine artisanal béninois et de transmettre ces savoir-faire aux générations futures.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Depuis 2009, elle dirige le <strong>Centre de Formation et de Perfectionnement Dorcas</strong>
              et préside de nombreuses organisations régionales et continentales dédiées à l'artisanat
              et à l'agripreneuriat féminin.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#008753]/10 to-[#FCD116]/10 rounded-3xl p-12
            flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="font-display text-8xl font-black text-[#008753]/20 mb-4">AFI</div>
              <p className="text-[#008753] font-semibold italic font-display">
                "L'art béninois, tissé à la main"
              </p>
            </div>
          </div>
        </div>

        {/* Valeurs */}
        <div className="mb-24">
          <h2 className="font-display text-3xl font-black text-[#1A1A1A] text-center mb-12">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Heart weight="duotone" size={32} />, title: "Authenticité", desc: "Chaque pièce est une œuvre unique, reflétant l'âme du Bénin", color: "#E8112D" },
              { icon: <Star weight="duotone" size={32} />, title: "Excellence", desc: "35 ans de savoir-faire au service de la qualité artisanale", color: "#FCD116" },
              { icon: <Globe weight="duotone" size={32} />, title: "Transmission", desc: "Former la prochaine génération d'artisans africains", color: "#008753" },
            ].map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 text-center hover:shadow-lg transition-all">
                <div className="flex justify-center mb-4" style={{ color: v.color }}>{v.icon}</div>
                <h3 className="font-display text-xl font-bold text-[#1A1A1A] mb-3">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Distinctions */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <Trophy weight="duotone" size={32} className="text-[#FCD116]" />
            <h2 className="font-display text-3xl font-black text-[#1A1A1A]">Distinctions honorifiques</h2>
          </div>
          <div className="space-y-4">
            {distinctions.map((d, i) => (
              <div key={i} className="flex items-center gap-6 bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all">
                <div className="shrink-0 w-16 h-16 rounded-full bg-[#FCD116]/20 flex items-center justify-center">
                  <span className="font-display font-black text-[#FCD116] text-sm">{d.year}</span>
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A1A]">{d.title}</p>
                  <p className="text-sm text-gray-400">{d.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
