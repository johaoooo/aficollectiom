import { Images, Camera } from '@phosphor-icons/react'

const placeholders = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  label: ['Sac Macramé', 'Pagne Teint', 'Chaussures', 'Robe Cérémonie', 'Tissus', 'Accessoires',
    'Atelier', 'Formation', 'Foire Abidjan', 'Foire Lomé', 'Cérémonie', 'Collection'][i],
  color: ['#008753','#FCD116','#E8112D'][i % 3],
}))

export default function Galerie() {
  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <div className="flex justify-center mb-6 text-[#008753]">
            <Images size={40} weight="duotone" />
          </div>
          <p className="text-[#008753] font-semibold tracking-widest uppercase text-sm mb-3">Portfolio</p>
          <h1 className="font-display text-4xl md:text-5xl font-black text-[#1A1A1A] mb-4">Notre Galerie</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Créations artisanales, événements et foires nationales et internationales.
          </p>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {placeholders.map(p => (
            <div key={p.id}
              className="break-inside-avoid rounded-xl overflow-hidden border border-gray-100
                bg-white hover:shadow-lg transition-all group cursor-pointer">
              <div className="flex items-center justify-center relative"
                style={{
                  backgroundColor: p.color + '10',
                  height: `${140 + (p.id % 3) * 60}px`
                }}>
                <Camera size={32} style={{ color: p.color + '60' }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                  bg-gradient-to-t from-black/40 to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-semibold">{p.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 p-8 bg-white rounded-2xl border border-dashed border-gray-200">
          <Camera size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">
            Les photos des créations réelles seront ajoutées par AFI Collection.
          </p>
        </div>

      </div>
    </main>
  )
}
