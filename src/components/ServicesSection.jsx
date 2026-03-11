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
    <section className="relative overflow-hidden bg-[#f3f6f4] px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(20,76,61,0.24),_transparent_68%)]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(28,116,85,0.16),_transparent_68%)]" />

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
          className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map(({ title, description, icon: Icon }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-3xl border border-[#123830]/10 bg-white/70 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur"
              transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.75 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -10,
                      scale: 1.015,
                      borderColor: 'rgba(18,56,48,0.30)',
                      boxShadow: '0 22px 56px rgba(0,0,0,0.16)',
                    }
              }
              style={shouldReduceMotion ? undefined : { transformOrigin: 'center bottom' }}
            >
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[76%] bg-[linear-gradient(to_top,_rgba(8,30,24,0.58)_0%,_rgba(18,56,48,0.36)_40%,_rgba(18,56,48,0.14)_64%,_transparent_100%)] opacity-0 transition-all duration-500 group-hover:h-[90%] group-hover:opacity-100" />

              <div className="mb-6 inline-flex rounded-2xl bg-[#123830] p-3 text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <Icon size={20} />
              </div>

              <h3 className="relative z-10 text-xl font-semibold text-[#123830]">{title}</h3>
              <p className="relative z-10 mt-3 text-sm leading-7 text-[#123830]/85">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
