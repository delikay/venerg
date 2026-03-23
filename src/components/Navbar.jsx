import { useEffect, useState, useCallback } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import logo from '../assets/logo.png'

const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/#contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState(() => {
    const path = window.location.pathname.replace(/\/+$/, '') || '/'
    if (path === '/projects') return '/projects'
    return `/${window.location.hash || '#home'}`
  })
  const shouldReduceMotion = useReducedMotion()

  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const isProjectsPage = normalizedPath === '/projects'

  // Determine active link
  const getActiveLink = useCallback(() => {
    if (isProjectsPage) return '/projects'
    const hash = window.location.hash || '#home'
    return `/${hash}`
  }, [isProjectsPage])

  useEffect(() => {
    const handleHashChange = () => setActiveHash(getActiveLink())
    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('popstate', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('popstate', handleHashChange)
    }
  }, [getActiveLink])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  const navTransition = { duration: shouldReduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }

  return (
    <header
      className="sticky top-0 z-[70] w-full"
      style={{
        paddingTop: isScrolled ? '0.5rem' : '1rem',
        transition: 'padding-top 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        <motion.nav
          layout={!shouldReduceMotion}
          transition={navTransition}
          className={`relative flex items-center justify-between rounded-2xl border px-5 py-3 transition-all duration-300 ease-out ${isScrolled
              ? 'border-white/20 bg-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-2xl'
              : 'border-[#123830]/8 bg-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl'
            }`}
        >
          {/* ── Logo ── */}
          <a
            href="/#home"
            aria-label="Home"
            className="relative z-10 flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <img src={logo} alt="Venergi logo" className="h-8 w-auto sm:h-9" />
          </a>

          {/* ── Desktop Nav Links ── */}
          <ul className="absolute inset-0 hidden items-center justify-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = activeHash === item.href

              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`relative rounded-xl px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 ${isActive
                        ? 'text-[#123830]'
                        : 'text-[#123830]/60 hover:text-[#123830]'
                      }`}
                  >
                    {item.label}

                    {/* Animated underline indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-[#123830]"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="relative z-10 hidden items-center gap-3 md:flex">
            <motion.a
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#123830] px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-[#0f2a20]"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            >
              Let's Talk
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <motion.button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#123830]/12 bg-white/60 text-[#123830] backdrop-blur transition-colors hover:bg-white/90 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-panel"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? 'close' : 'open'}
                initial={shouldReduceMotion ? undefined : { rotate: -90, opacity: 0, scale: 0.8 }}
                animate={shouldReduceMotion ? undefined : { rotate: 0, opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="inline-flex"
              >
                {isOpen ? (
                  <X size={18} strokeWidth={2.5} aria-hidden="true" />
                ) : (
                  <Menu size={18} strokeWidth={2.5} aria-hidden="true" />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* ── Mobile Menu ── */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.button
                  type="button"
                  aria-label="Close menu backdrop"
                  className="fixed inset-0 z-40 bg-[#051510]/30 backdrop-blur-sm md:hidden"
                  initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setIsOpen(false)}
                />

                {/* Panel */}
                <motion.div
                  id="mobile-nav-panel"
                  className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 md:hidden"
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: -16, scale: 0.96 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.97 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="overflow-hidden rounded-2xl border border-white/30 bg-white/90 p-2 shadow-[0_24px_48px_rgba(0,0,0,0.16)] backdrop-blur-2xl">
                    <ul className="space-y-0.5">
                      {navItems.map((item, index) => {
                        const active =
                          (item.href === '/projects' && isProjectsPage) ||
                          activeHash === item.href

                        return (
                          <motion.li
                            key={item.label}
                            initial={shouldReduceMotion ? undefined : { opacity: 0, x: -12 }}
                            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                            transition={{
                              duration: shouldReduceMotion ? 0 : 0.25,
                              delay: shouldReduceMotion ? 0 : 0.04 * index,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <a
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-all duration-200 ${active
                                  ? 'bg-[#123830] text-white'
                                  : 'text-[#123830] hover:bg-[#123830]/6'
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                {active && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#e1f941]" />
                                )}
                                <span>{item.label}</span>
                              </div>
                              <span
                                className={`text-[11px] font-medium tabular-nums tracking-[0.15em] ${active ? 'text-white/50' : 'text-[#123830]/30'
                                  }`}
                              >
                                {String(index + 1).padStart(2, '0')}
                              </span>
                            </a>
                          </motion.li>
                        )
                      })}
                    </ul>

                    {/* Mobile CTA */}
                    <motion.div
                      className="mt-1.5 border-t border-[#123830]/8 px-2 pb-1 pt-2.5"
                      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.3,
                        delay: shouldReduceMotion ? 0 : 0.2,
                      }}
                    >
                      <a
                        href="/#contact"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#123830] px-4 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#0f2a20]"
                      >
                        Let's Talk
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </header>
  )
}

export default Navbar
