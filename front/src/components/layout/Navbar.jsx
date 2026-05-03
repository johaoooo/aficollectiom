import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  List, X, House, GridFour, GraduationCap,
  Images, Info, ChatCircleDots, ShoppingCart, CalendarBlank
} from '@phosphor-icons/react'
import DarkModeToggle from '../ui/DarkModeToggle'

const links = [
  { label: 'Accueil',    href: '/',           icon: House },
  { label: 'Catalogues', href: '/catalogue',  icon: GridFour },
  { label: 'Formations', href: '/formations', icon: GraduationCap },
  { label: 'Événements', href: '/evenements', icon: CalendarBlank },
  { label: 'Galerie',    href: '/galerie',    icon: Images },
  { label: 'À propos',   href: '/a-propos',   icon: Info },
  { label: 'Contact',    href: '/contact',    icon: ChatCircleDots },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const lastY = useRef(0)
  const location = useLocation()
  const cartCount = 0

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > lastY.current && y > 100)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
        className={`
          fixed inset-x-0 top-0 z-[100] flex justify-center
          transition-all duration-500 ease-[cubic-bezier(.25,.8,.25,1)]
          ${hidden ? '-translate-y-[120%]' : 'translate-y-0'}
        `}
      >
        <div className="mx-3 sm:mx-6 mt-0">
          <div
            className={`
              rounded-b-2xl overflow-hidden w-fit transition-all duration-500
              backdrop-blur-xl border border-white/20 dark:border-white/10
              ${scrolled
                ? 'bg-white/70 dark:bg-[#022c1e]/80 shadow-xl shadow-black/10 dark:shadow-black/30'
                : 'bg-white/50 dark:bg-[#022c1e]/60 shadow-lg shadow-black/5'
              }
            `}
          >
            <div className="w-fit mx-auto px-4 sm:px-6 flex items-center justify-between h-[62px]">

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="shrink-0 mr-6">
                <Link to="/" className="block">
                  <img src="/lo.svg" alt="AFI Collection" className="h-9 w-auto object-contain" />
                </Link>
              </motion.div>

              <nav className="hidden lg:flex items-center gap-1">
                {links.map(({ label, href, icon: Icon }) => {
                  const active = isActive(href)
                  const isHovered = hoveredLink === href
                  const showText = active || isHovered
                  return (
                    <Link
                      key={href}
                      to={href}
                      onMouseEnter={() => setHoveredLink(href)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className={`relative flex items-center gap-[7px] px-3 py-2 rounded-xl text-[13px] font-[500] transition-all duration-200 outline-none
                        ${active
                          ? 'text-[#008753] dark:text-[#4ade80]'
                          : 'text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="activeBg"
                          className="absolute inset-0 rounded-xl bg-[#008753]/10 dark:bg-[#008753]/25 border border-[#008753]/20 dark:border-[#008753]/30"
                          transition={{ type: 'spring', duration: 0.4 }}
                        />
                      )}
                      {isHovered && !active && (
                        <motion.span
                          layoutId="hoverBg"
                          className="absolute inset-0 rounded-xl bg-black/5 dark:bg-white/8"
                          transition={{ type: 'spring', duration: 0.3 }}
                        />
                      )}
                      <Icon
                        weight={active ? 'fill' : 'regular'}
                        size={17}
                        className={`relative z-10 shrink-0 transition-colors duration-200 ${
                          active
                            ? 'text-[#008753] dark:text-[#4ade80]'
                            : 'text-gray-700 dark:text-white'
                        }`}
                      />
                      <AnimatePresence mode="wait">
                        {showText && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="relative z-10 overflow-hidden whitespace-nowrap"
                          >
                            {label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  )
                })}
              </nav>

              <div className="hidden lg:flex items-center gap-2 ml-4">
                <DarkModeToggle />

                <Link to="/panier" className="relative flex items-center justify-center w-9 h-9 rounded-xl text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white hover:bg-black/8 dark:hover:bg-white/10 transition-all duration-200">
                  <ShoppingCart size={18} weight="regular" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E8112D] text-white text-[9px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <div className="w-px h-4 bg-gray-300 dark:bg-white/20" />

                <Link
                  to="/connexion"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-[500] text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200"
                >
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  className="px-4 py-2 rounded-xl text-[13px] font-semibold text-white
                    bg-gradient-to-r from-[#008753] to-[#006b42]
                    hover:from-[#009960] hover:to-[#007a4d]
                    shadow-md shadow-[#008753]/25 hover:shadow-[#008753]/40
                    hover:scale-105 transition-all duration-200"
                >
                  S'inscrire
                </Link>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <DarkModeToggle />
                <Link to="/panier" className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-700 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition">
                  <ShoppingCart size={18} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E8112D] text-white text-[9px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button onClick={() => setOpen(!open)} className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-700 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition">
                  {open ? <X size={18} /> : <List size={18} />}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-2"
              >
                <div className="rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-[#022c1e]/90 border border-white/30 dark:border-white/10 shadow-xl px-3 py-3">
                  {links.map(({ label, href, icon: Icon }) => {
                    const active = isActive(href)
                    return (
                      <Link
                        key={href}
                        to={href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                          ${active
                            ? 'text-[#008753] dark:text-[#4ade80] bg-[#008753]/10 dark:bg-[#008753]/20'
                            : 'text-gray-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/10'
                          }`}
                      >
                        <Icon
                          size={18}
                          weight={active ? 'fill' : 'regular'}
                          className={active ? 'text-[#008753] dark:text-[#4ade80]' : 'text-gray-700 dark:text-white'}
                        />
                        {label}
                      </Link>
                    )
                  })}
                  <div className="h-px bg-gray-200 dark:bg-white/10 my-2" />
                  <Link
                    to="/connexion"
                    className="flex items-center justify-center gap-2 py-3 border border-gray-200 dark:border-white/15 rounded-xl text-sm text-gray-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/inscription"
                    className="flex items-center justify-center gap-2 py-3 mt-2 rounded-xl text-sm font-semibold text-white
                      bg-gradient-to-r from-[#008753] to-[#006b42] shadow-md shadow-[#008753]/25"
                  >
                    S'inscrire
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <div className="h-[78px]" />
    </>
  )
}
