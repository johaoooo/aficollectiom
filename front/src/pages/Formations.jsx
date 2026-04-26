import { formations } from '../data/products'
import { CheckCircle, Clock, CurrencyDollar, WhatsappLogo, GraduationCap } from '@phosphor-icons/react'

export default function Formations() {
  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#FAF6F0]">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full
            bg-[#008753]/10 mb-6">
            <GraduationCap size={32} weight="duotone" className="text-[#008753]" />
          </div>
          <p className="text-[#008753] font-semibold tracking-widest uppercase text-sm mb-3">Centre Dorcas</p>
          <h1 className="font-display text-4xl md:text-5xl font-black text-[#1A1A1A] mb-4">
            Formations Certifiantes
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Des filières professionnelles conçues par Mme TOSSA Afiavi, 35 ans d'expertise au service de votre avenir artisanal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {formations.map((f, i) => {
            const colors = ['#008753', '#FCD116', '#E8112D', '#008753']
            const color = colors[i]
            return (
              <div key={f.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100
                hover:shadow-xl transition-all duration-300">
                <div className="h-2" style={{ backgroundColor: color }} />
                <div className="p-8">
                  <h2 className="font-display text-2xl font-bold text-[#1A1A1A] mb-6">{f.name}</h2>

                  <div className="space-y-3 mb-8">
                    {f.specialties.map(s => (
                      <div key={s} className="flex items-center gap-3">
                        <CheckCircle weight="fill" size={18} style={{ color }} className="shrink-0" />
                        <span className="text-sm text-gray-600">{s}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-600">{f.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full px-4 py-2"
                      style={{ backgroundColor: color + '15' }}>
                      <CurrencyDollar size={16} style={{ color }} />
                      <span className="text-sm font-bold" style={{ color }}>{f.price}</span>
                    </div>
                  </div>

                  <a href="https://wa.me/22901960622 87?text=Bonjour, je souhaite m'inscrire à la formation"
                    target="_blank" rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                      font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                    style={{ backgroundColor: color }}>
                    <WhatsappLogo size={18} weight="fill" />
                    S'inscrire via WhatsApp
                  </a>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </main>
  )
}
