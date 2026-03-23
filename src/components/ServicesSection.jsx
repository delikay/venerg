import { BatteryCharging, ChartNoAxesCombined, ShieldCheck, Sun, Wrench } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const services = [
  {
    title: 'Solar and Inverter System Installation',
    description: 'Professional setup of solar panels, inverters, and power backup systems for homes and businesses.',
    icon: Sun,
  },
  {
    title: 'Electric Fence and Barb Wire Installation',
    description: 'Reliable perimeter security installation for residential, commercial, and industrial properties.',
    icon: ShieldCheck,
  },
  {
    title: 'CCTV Installation',
    description: 'Strategic camera placement and complete surveillance setup for better visibility and security.',
    icon: ChartNoAxesCombined,
  },
  {
    title: 'Office Intercom Installation',
    description: 'Clear and efficient internal communication systems for offices, facilities, and multi-room spaces.',
    icon: Wrench,
  },
  {
    title: 'Sales of Solar and Inverter Accessories',
    description: 'Quality accessories including cables, batteries, controllers, and essential components.',
    icon: BatteryCharging,
  },
]

const ServicesSection = () => {
  const shouldReduceMotion = useReducedMotion()

  const contentVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const cardsContainerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(160deg,#ecf3ef_0%,#f4f8f6_42%,#e8f1ec_100%)] px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.58)_0%,transparent_48%,rgba(18,56,48,0.05)_100%)]" />
      <div className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(20,76,61,0.26),_transparent_68%)]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(28,116,85,0.18),_transparent_68%)]" />

      <div className="relative mx-auto max-w-[1120px]">
        <motion.div
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          variants={contentVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex rounded-full border border-[#123830]/20 bg-white/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#123830]">
              Services
            </span>
            <h2 className="text-[clamp(2.1rem,5vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#123830]">
              Complete power and security services for homes and businesses
            </h2>
          </div>

        </motion.div>

        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map(({ title, description, icon: Icon }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/65 bg-[linear-gradient(155deg,rgba(255,255,255,0.96)_0%,rgba(246,251,249,0.92)_58%,rgba(234,242,238,0.9)_100%)] p-6 shadow-[0_16px_46px_rgba(10,34,27,0.10)] backdrop-blur-sm"
              transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.75 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -8,
                      scale: 1.01,
                      borderColor: 'rgba(18,56,48,0.24)',
                      boxShadow: '0 24px 56px rgba(9,30,24,0.17)',
                    }
              }
              style={shouldReduceMotion ? undefined : { transformOrigin: 'center bottom' }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0)_52%,rgba(15,42,33,0.06)_100%)] opacity-75 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-7 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(18,56,48,0.34),transparent)]" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(19,66,54,0.2)_0%,_transparent_70%)] opacity-60 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" />

              <div className="relative z-10 mb-7 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#123830]/12 bg-[radial-gradient(circle_at_30%_20%,#2f6c5b_0%,#123830_68%)] text-white shadow-[0_10px_24px_rgba(18,56,48,0.24)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                <Icon size={20} />
              </div>

              <h3 className="relative z-10 text-[1.08rem] font-semibold leading-7 tracking-[-0.01em] text-[#102f29]">{title}</h3>
              <p className="relative z-10 mt-3 text-sm leading-7 text-[#1b463c]/85">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
