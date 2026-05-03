import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight } from '@phosphor-icons/react'

export default function Panier() {
  const isLoggedIn = false
  const cartItems = []

  if (!isLoggedIn || cartItems.length === 0) {
    return (
      <main className="min-h-screen pt-12 pb-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-2 mb-2">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#008753]" />
              <ShoppingBag size={20} className="text-[#008753]" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#E8112D]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">Votre panier</h1>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <ShoppingBag size={48} weight="duotone" className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">Votre panier est vide</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">Découvrez nos produits et ajoutez-les à votre panier</p>
            <Link to="/catalogue" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#008753] to-[#006b42] text-white shadow-lg hover:scale-105 transition">Explorer les produits <ArrowRight size={16} /></Link>
          </motion.div>

          <div className="mt-10">
            <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-4 text-center">Vous pourriez aimer</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
                  <div className="w-full h-32 rounded-lg bg-gradient-to-br from-[#008753]/20 to-[#008753]/5 mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Sac Macramé Royal</h4>
                  <p className="text-xs text-gray-500">35 000 FCFA</p>
                  <Link to="/catalogue/afisac" className="mt-2 inline-block text-sm text-[#008753] font-semibold hover:underline">Découvrir</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-12 pb-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">Mon panier</h1>
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8">
          <p className="text-gray-500 text-center py-10">Contenu du panier à venir...</p>
        </div>
      </div>
    </main>
  )
}
