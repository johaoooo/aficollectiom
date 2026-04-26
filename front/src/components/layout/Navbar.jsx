import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'

const links = [
  { label: 'Accueil',    href: '/' },
  { label: 'Catalogues', href: '/catalogue/afisac' },
  { label: 'Formations', href: '/formations' },
  { label: 'Galerie',    href: '/galerie' },
  { label: 'À propos',   href: '/a-propos' },
  { label: 'Contact',    href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500
      ${scrolled ? 'bg-[#FAF6F0]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-black tracking-tight">
            <span className="text-[#008753]">A</span>
            <span className="text-[#FCD116]">F</span>
            <span className="text-[#E8112D]">I</span>
            <span className="text-[#1A1A1A] ml-1 text-lg font-light">Collection</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} to={l.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-[#008753]
                ${location.pathname === l.href ? 'text-[#008753] border-b-2 border-[#008753]' : 'text-[#1A1A1A]'}`}>
              {l.label}
            </Link>
          ))}
          <Link to="/contact"
            className="bg-[#008753] text-white text-sm font-semibold px-5 py-2.5 rounded-full
              hover:bg-[#006b42] transition-all hover:scale-105">
            Commander
          </Link>
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden text-[#1A1A1A]">
          {open ? <X size={28} /> : <List size={28} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#FAF6F0] border-t border-gray-100 px-6 py-6 flex flex-col gap-4">
          {links.map(l => (
            <Link key={l.href} to={l.href} onClick={() => setOpen(false)}
              className="text-base font-medium text-[#1A1A1A] hover:text-[#008753]">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
