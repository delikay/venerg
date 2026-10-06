import { ArrowRight, BadgeCheck, Building2, ShieldCheck, Wrench } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const trustPoints = [
  {
    title: 'Local expertise',
    description: 'Practical solar and security solutions designed for homes, offices, estates, and commercial properties.',
    icon: Building2,
  },
  {
    title: 'Quality workmanship',
    description: 'Clean installations, careful system design, and dependable setups that are built to last.',
    icon: BadgeCheck,
  },
  {
    title: 'Full-service support',
    description: 'From consultation to installation and long-term support, we keep your systems working reliably.',
    icon: Wrench,
  },
  {
    title: 'Reliable protection',
    description: 'Power stability and security solutions that help protect your property, assets, and everyday operations.',
    icon: ShieldCheck,
  },
]

const stats = [
  { label: 'Local expertise', value: 'Lagos-based' },
  { label: 'Property coverage', value: 'Homes & businesses' },
  { label: 'Support model', value: 'End-to-end' },
  { label: 'Approach', value: 'Tailored' },
]

const process = [
  {
    step: '01',
    title: 'Consultation',
    description: 'We learn about your property, power needs, and security goals before recommending the right setup.',
  },
  {
    step: '02',
    title: 'Design',
    description: 'We recommend a practical and efficient system that matches your space, priorities, and budget.',
  },
  {
    step: '03',
    title: 'Installation',
    description: 'Our team installs your system with attention to safety, quality, and clean finish.',
  },
  {
    step: '04',
    title: 'Support',
    description: 'We stay available after installation so your system continues to work reliably.',
  },
]

const testimonials = [
  {
    quote:
      'The team took the time to understand our power needs and delivered a clean, reliable setup. The process felt professional from start to finish.',
    name: 'Adebayo M.',
    role: 'Homeowner, Lagos',
  },
  {
    quote:
      'We needed a dependable system for our office and property security. Venergi handled the installation carefully and the result has been solid.',
    name: 'Grace O.',
    role: 'Business owner',
  },
  {
    quote:
      'Their attention to detail and clear communication made the project straightforward. We felt informed and confident throughout the process.',
    name: 'Tunde A.',
    role: 'Property manager',
  },
]

const ctaHighlights = [
  'Solar and inverter upgrades',
  'CCTV and perimeter security',
  'Custom system recommendations',
  'Professional installation & support',
]

const serviceAreas = [
  'Lagos State',
  'Ogun State',
  'Oyo State',
  'Abuja (FCT)',
  'Ondo State',
  'Ekiti State',
  'Commercial & residential projects',
]

const TrustSection = () => {
  const shouldReduceMotion = useReducedMotion()

  const fadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
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
    <section className="bg-[#f7faf8] px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
      <div className="mx-auto max-w-[1120px] space-y-14">
        <motion.div
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex rounded-full border border-[#123830]/15 bg-[#ffffff] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#123830]">
              Why choose us
            </span>
            <h2 className="text-[clamp(2rem,5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#123830]">
              Trusted solar and security solutions built for real homes and businesses
            </h2>
          </div>

          <a
            href="/#contact"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#123830]/15 bg-white px-5 py-3 text-sm font-medium text-[#123830] transition-colors hover:bg-[#123830] hover:text-white"
          >
            Request a quote
            <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {trustPoints.map(({ title, description, icon: Icon }) => (
            <motion.article
              key={title}
              variants={fadeInUp}
              className="rounded-[1.7rem] border border-[#123830]/10 bg-white p-6 shadow-[0_12px_32px_rgba(15,58,51,0.06)]"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123830] text-white shadow-[0_10px_24px_rgba(18,56,48,0.2)]">
                <Icon size={20} />
              </div>
              <h3 className="text-xl font-semibold text-[#123830]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#123830]/75">{description}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="grid gap-4 rounded-[2rem] border border-[#123830]/10 bg-[#123830] px-5 py-6 text-white sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map(({ label, value }) => (
            <motion.div key={label} variants={fadeInUp} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">{label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="rounded-[2rem] border border-[#123830]/10 bg-[#eaf3ef] p-6 text-[#123830] shadow-[0_16px_36px_rgba(18,56,48,0.08)] sm:p-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#123830]/70">Service areas</p>
              <h3 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#123830]">
                Serving homes, offices, estates, and commercial properties across Lagos and other states in Nigeria.
              </h3>
            </div>

            <div className="inline-flex rounded-full border border-[#123830]/15 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#123830]">
              Lagos & other states
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-[#123830]/10 bg-white px-3 py-2 text-sm font-medium text-[#123830]/85"
              >
                {area}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="rounded-[2rem] border border-[#123830]/10 bg-[#123830] p-6 text-white shadow-[0_16px_36px_rgba(18,56,48,0.12)] sm:p-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Ready to get started?</p>
              <h3 className="mt-3 text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
                Need a safer, more reliable power or security setup?
              </h3>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#123830] transition-colors hover:bg-[#edf5df]"
              >
                Request a quote
              </a>
              <a
                href="tel:+2348144196054"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Call now
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.14em] text-white/80">
            {ctaHighlights.map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-white/5 px-3 py-2">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#123830]/70">Our process</p>
            <h3 className="mt-3 text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#123830]">
              A simple process designed around your property and priorities
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {process.map(({ step, title, description }) => (
              <div key={step} className="rounded-[1.5rem] border border-[#123830]/10 bg-white p-5 shadow-[0_10px_24px_rgba(15,58,51,0.04)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#123830]/65">{step}</p>
                <h4 className="mt-4 text-xl font-semibold text-[#123830]">{title}</h4>
                <p className="mt-3 text-sm leading-7 text-[#123830]/75">{description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#123830]/70">Testimonials</p>
            <h3 className="mt-3 text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#123830]">
              Homeowners and businesses trust Venergi for dependable service
            </h3>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map(({ quote, name, role }) => (
              <blockquote
                key={name}
                className="rounded-[1.6rem] border border-[#123830]/10 bg-[#f3f8f6] p-6 shadow-[0_10px_22px_rgba(18,56,48,0.04)]"
              >
                <p className="text-base leading-8 text-[#123830]">“{quote}”</p>
                <footer className="mt-6 border-t border-[#123830]/10 pt-4">
                  <p className="font-semibold text-[#123830]">{name}</p>
                  <p className="text-sm text-[#123830]/70">{role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustSection
