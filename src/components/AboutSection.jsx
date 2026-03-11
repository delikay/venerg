import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import aboutLeftImage from '../assets/about_solar.jpg'
import aboutCenterImage from '../assets/herobanner2.jpg'
import aboutRightImage from '../assets/about-wind.jpg'

const imageBaseClasses =
  'h-40 w-36 rounded-3xl object-cover shadow-[0_18px_36px_rgba(0,0,0,0.35)] sm:h-52 sm:w-44 lg:h-56 lg:w-48'

const serviceHighlights = [
  'Solar and inverter system installation',
  'Electric fence and barb wire installation',
  'CCTV installation',
  'Office intercom installation',
  'Sales of solar and inverter accessories',
]

const AboutSection = () => {
  const shouldReduceMotion = useReducedMotion()

  const sectionVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const staggerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.section
      className="bg-[#0f3a33] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-14 lg:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div className="mx-auto max-w-[1120px]" variants={staggerVariants}>
        <motion.div variants={fadeInUp} className="max-w-3xl lg:max-w-none space-y-4">
          <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
            About
          </span>
          <h2 className="text-[clamp(2.1rem,5vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            Complete power and<br /> <span className="text-[#f59e0b] lg:ml-30">security services</span> <br /> <span className="lg:ml-20">for homes and businesses.</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-[290px_minmax(0,1fr)] lg:items-end"
          variants={staggerVariants}
        >
          <motion.div className="space-y-6" variants={staggerVariants}>
            <motion.p variants={fadeInUp} className="max-w-[290px] text-base leading-8 text-white/90">
              We provide end-to-end installation and support across solar power, perimeter security, surveillance, and
              communication systems.
            </motion.p>

            <motion.ul variants={staggerVariants} className="space-y-2">
              {serviceHighlights.map((service) => (
                <motion.li
                  key={service}
                  variants={fadeInUp}
                  className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs tracking-[0.02em] text-white/90"
                >
                  {service}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:justify-end" variants={staggerVariants}>
            <motion.img variants={fadeInUp} src={aboutLeftImage} alt="Rows of solar panels" className={`${imageBaseClasses} -rotate-[23deg]`} />
            <motion.img variants={fadeInUp} src={aboutCenterImage} alt="Blue sky over solar array" className={`${imageBaseClasses} -rotate-[24deg]`} />
            <motion.img variants={fadeInUp} src={aboutRightImage} alt="Wind turbines and clean energy" className={`${imageBaseClasses} rotate-[26deg]`} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default AboutSection
