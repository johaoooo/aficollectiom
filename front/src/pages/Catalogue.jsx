import { useParams, Link } from 'react-router-dom'
import { subBrands } from '../data/products'
import { ShoppingCart, ArrowLeft, WhatsappLogo } from '@phosphor-icons/react'

export default function Catalogue() {
  const { id } = useParams()
  const brand = subBrands.find(b => b.id === id) || subBrands[0]

  return (
    <main className="min-h-screen pt-24 pb-20 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#008753] mb-6 transition-colors">
            <ArrowLeft size={16} /> Accueil
          </Link>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-3 h-10 rounded-full" style={{ backgroundColor: brand.color }} />
            <h1 className="font-display text-4xl md:text-5xl font-black text-[#1A1A1A]">{brand.name}</h1>
          </div>
          <p className="text-gray-500 ml-7">{brand.tagline}</p>
        </div>

        {/* Nav sous-marques */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-12">
          {subBrands.map(b => (
            <Link key={b.id} to={`/catalogue/${b.id}`}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all
                ${b.id === brand.id
                  ? 'text-white shadow-lg'
                  : 'bg-white text-gray-500 hover:text-[#008753] border border-gray-100'}`}
              style={b.id === brand.id ? { backgroundColor: brand.color } : {}}>
              {b.name}
            </Link>
          ))}
        </div>

        {/* Grille produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brand.products.map(product => (
            <div key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100
                hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">

              {/* Placeholder image */}
              <div className="h-48 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: brand.color + '15' }}>
                <div className="text-6xl opacity-20 font-display font-black"
                  style={{ color: brand.color }}>
                  {brand.name.slice(0,2)}
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                  bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-5">
                <h3 className="font-display font-bold text-[#1A1A1A] mb-1">{product.name}</h3>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg" style={{ color: brand.color }}>
                    {product.price.toLocaleString('fr-FR')} FCFA
                  </span>
                  <a href={`https://wa.me/22901960622 87?text=Bonjour, je suis intéressé(e) par ${product.name} (${brand.name})`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-white
                      px-3 py-2 rounded-full transition-all hover:scale-105"
                    style={{ backgroundColor: brand.color }}>
                    <WhatsappLogo size={14} weight="fill" />
                    Commander
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
