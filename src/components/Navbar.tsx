import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'

const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/simulator', label: 'المحاكي' },
  { to: '/examples', label: 'أمثلة' },
  { to: '/contact', label: 'تواصل' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'border-b border-line bg-ink-950/80 backdrop-blur'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="FlowMind — الرئيسية">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive ? 'text-text' : 'text-text-dim hover:text-text'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/simulator" className="btn-primary mr-2 px-4 py-2 text-sm">
            ابدأ المحاكاة
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-text-dim hover:text-text md:hidden"
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-ink-900 md:hidden">
          <div className="container-page flex flex-col py-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-[15px] ${
                    isActive ? 'text-text' : 'text-text-dim'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/simulator" className="btn-primary mt-2 mb-2">
              ابدأ المحاكاة
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
