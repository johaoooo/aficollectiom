import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  List, X, House, GridFour, GraduationCap,
  Images, Info, ChatCircleDots, SignIn, UserPlus
} from '@phosphor-icons/react'
import DarkModeToggle from '../ui/DarkModeToggle'

const links = [
  { label: 'Accueil',    href: '/',                icon: House },
  { label: 'Catalogues', href: '/catalogue',       icon: GridFour },
  { label: 'Formations', href: '/formations',      icon: GraduationCap },
  { label: 'Galerie',    href: '/galerie',         icon: Images },
  { label: 'À propos',   href: '/a-propos',        icon: Info },
  { label: 'Contact',    href: '/contact',         icon: ChatCircleDots },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const lastY = useRef(0)
  const location = useLocation()

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
        <div className="mx-3 sm:mx-6 mt-3">
          <div
            className={`
              rounded-2xl overflow-hidden w-fit
              transition-all duration-500
              ${scrolled
                ? 'bg-white/95 dark:bg-[#07150D]/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,.12),0_0_0_1px_rgba(0,0,0,.07)] dark:shadow-[0_8px_32px_rgba(0,0,0,.55),0_0_0_1px_rgba(255,255,255,.07)]'
                : 'bg-white/90 dark:bg-[#07150D]/90 backdrop-blur-xl shadow-[0_2px_16px_rgba(0,0,0,.07),0_0_0_1px_rgba(0,0,0,.05)] dark:shadow-[0_2px_16px_rgba(0,0,0,.35),0_0_0_1px_rgba(255,255,255,.05)]'
              }
            `}
          >
            <div className="w-fit mx-auto px-4 sm:px-6 flex items-center justify-between h-[62px]">

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="shrink-0 mr-6"
              >
                <Link to="/" className="block outline-none focus:ring-2 focus:ring-[#008753]/50 rounded-lg">
                  <img
                    src="/lo.svg"
                    alt="AFI Collection"
                    className="h-9 w-auto object-contain transition-all duration-300"
                  />
                </Link>
              </motion.div>

              <nav className="hidden lg:flex items-center gap-4" aria-label="Navigation principale">
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
                      aria-current={active ? 'page' : undefined}
                      className={`
                        relative flex items-center gap-[7px] px-3 py-2 rounded-xl
                        text-[13px] font-[500] tracking-[.01em]
                        transition-all duration-200 group outline-none
                        focus-visible:ring-2 focus-visible:ring-[#008753]/50
                        ${active
                          ? 'text-[#008753] dark:text-[#2ECC85]'
                          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                        }
                      `}
                    >
                      {active && (
                        <motion.span
                          layoutId="activeBg"
                          className="absolute inset-0 rounded-xl bg-[#008753]/[.08] dark:bg-[#008753]/[.14] ring-1 ring-inset ring-[#008753]/20 dark:ring-[#2ECC85]/20"
                          transition={{ type: 'spring', duration: 0.4 }}
                        />
                      )}
                      
                      {!active && (
                        <span className="absolute inset-0 rounded-xl bg-transparent group-hover:bg-black/[.04] dark:group-hover:bg-white/[.05] transition-colors duration-150" />
                      )}

                      <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 overflow-hidden">
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      </span>

                      <Icon
                        weight={active ? 'fill' : 'regular'}
                        size={18}
                        className={`
                          relative z-10 shrink-0
                          transition-all duration-300
                          ${active
                            ? 'text-[#008753] dark:text-[#2ECC85]'
                            : 'text-gray-600 dark:text-gray-400 group-hover:text-[#008753] dark:group-hover:text-[#2ECC85]'
                          }
                        `}
                      />
                      
                      <AnimatePresence mode="wait">
                        {showText && (
                          <motion.span
                            initial={{ opacity: 0, width: 0, x: -5 }}
                            animate={{ opacity: 1, width: 'auto', x: 0 }}
                            exit={{ opacity: 0, width: 0, x: -5 }}
                            transition={{ duration: 0.2 }}
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

              <div className="hidden lg:flex items-center gap-2">
                <DarkModeToggle />
                <div className="w-px h-4 bg-gradient-to-b from-transparent via-gray-300 dark:via-white/20 to-transparent" />
                <Link
                  to="/connexion"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-[500] text-gray-700 dark:text-gray-300 hover:bg-black/[.05] dark:hover:bg-white/[.07] hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                >
                  <SignIn size={15} weight="duotone" />
                  Connexion
                </Link>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/inscription"
                    className="group relative flex items-center gap-[7px] px-4 py-[9px] rounded-xl overflow-hidden text-[13px] font-[600] text-white tracking-[.015em] bg-gradient-to-r from-[#008753] to-[#006b42] hover:from-[#00764A] hover:to-[#005a38] shadow-[0_2px_16px_rgba(0,135,83,.38)] hover:shadow-[0_4px_24px_rgba(0,135,83,.48)] transition-all duration-300"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <UserPlus size={14} weight="bold" className="relative z-10" />
                    <span className="relative z-10">S'inscrire</span>
                  </Link>
                </motion.div>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <DarkModeToggle />
                <button
                  onClick={() => setOpen(v => !v)}
                  aria-label={open ? 'Fermer' : 'Menu'}
                  aria-expanded={open}
                  className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-black/[.05] dark:hover:bg-white/[.08] transition-all duration-200"
                >
                  <motion.span
                    className="absolute"
                    initial={false}
                    animate={{ opacity: open ? 1 : 0, rotate: open ? 0 : 90, scale: open ? 1 : 0.75 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} weight="bold" />
                  </motion.span>
                  <motion.span
                    className="absolute"
                    initial={false}
                    animate={{ opacity: open ? 0 : 1, rotate: open ? -90 : 0, scale: open ? 0.75 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <List size={18} weight="bold" />
                  </motion.span>
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
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden mt-2"
              >
                <div className="rounded-2xl bg-white/95 dark:bg-[#07150D]/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,.13),0_0_0_1px_rgba(0,0,0,.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,.55),0_0_0_1px_rgba(255,255,255,.06)] px-3 py-3">
                  <div className="space-y-0.5">
                    {links.map(({ label, href, icon: Icon }, i) => {
                      const active = isActive(href)
                      return (
                        <motion.div
                          key={href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03, duration: 0.2 }}
                        >
                          <Link
                            to={href}
                            className={`flex items-center gap-3 px-4 py-[10px] rounded-xl text-[14px] font-[500] transition-all duration-200 ${active
                              ? 'bg-[#008753]/[.09] text-[#008753] dark:bg-[#008753]/[.15] dark:text-[#2ECC85]'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-black/[.04] dark:hover:bg-white/[.05]'
                            }`}
                          >
                            <Icon
                              weight={active ? 'fill' : 'regular'}
                              size={18}
                              className={active ? 'text-[#008753] dark:text-[#2ECC85]' : 'text-gray-500 dark:text-gray-400'}
                            />
                            {label}
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent my-3 mx-1"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-2 px-1"
                  >
                    <Link
                      to="/connexion"
                      className="flex items-center justify-center gap-2 py-[10px] rounded-xl text-[13.5px] font-[500] border border-gray-200 dark:border-white/[.1] text-gray-700 dark:text-gray-300 hover:border-[#008753] hover:text-[#008753] dark:hover:border-[#2ECC85] dark:hover:text-[#2ECC85] transition-all duration-200"
                    >
                      <SignIn size={15} weight="duotone" />
                      Connexion
                    </Link>
                    <Link
                      to="/inscription"
                      className="group relative flex items-center justify-center gap-2 py-[10px] rounded-xl overflow-hidden text-[13.5px] font-[600] text-white bg-gradient-to-r from-[#008753] to-[#006b42] hover:from-[#00764A] hover:to-[#005a38] shadow-[0_2px_14px_rgba(0,135,83,.35)] active:scale-[.98] transition-all duration-200"
                    >
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <UserPlus size={15} weight="bold" className="relative z-10" />
                      <span className="relative z-10">S'inscrire</span>
                    </Link>
                  </motion.div>
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
