import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import logo from '../assets/logo.png'

const socials = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
]

const quickLinks = ['Home', 'About', 'Services', 'Projects', 'Contact']

const serviceLinks = [
  'Solar & Inverter Installation',
  'Electric Fence / Barb Wire',
  'CCTV Installation',
  'Office Intercom',
  'Solar Accessories Sales',
]

const FooterSection = () => {
  const shouldReduceMotion = useReducedMotion()

  const fadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }

  return (
    <footer className="bg-[#0f3a33] px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-14">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          className="grid gap-10 border-t border-white/15 pt-10 md:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeInUp} className="space-y-5">
            <a href="#" aria-label="Home">
              <img src={logo} alt="Company logo" className="h-8 w-auto sm:h-9" />
            </a>
            <p className="max-w-xs text-sm leading-7 text-white/80">
              Reliable power and security solutions for homes and businesses.
            </p>

            <div className="space-y-3 text-sm text-white/85">
              <p className="inline-flex items-center gap-2">
                <Mail size={14} />
                hello@venergi.com.ng
              </p>
              <p className="inline-flex items-center gap-2">
                <Phone size={14} />
                +234 800 123 4567
              </p>
              <p className="inline-flex items-center gap-2">
                <MapPin size={14} />
                Victoria Island, Lagos
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="transition-opacity hover:opacity-70">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">Services</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="transition-opacity hover:opacity-70">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">Follow Us</h3>
            <div className="flex items-center gap-3">
              {socials.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white hover:text-[#123830]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="text-sm leading-7 text-white/75">
              Open Monday to Saturday, 8:00 AM to 6:00 PM.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-5 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <p>(c) {new Date().getFullYear()} Venergi. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default FooterSection
