import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const serviceOptions = [
  'Solar and Inverter System Installation',
  'Electric Fence and Barb Wire Installation',
  'CCTV Installation',
  'Office Intercom Installation',
  'Sales of Solar and Inverter Accessories',
]

const ContactSection = () => {
  const shouldReduceMotion = useReducedMotion()
  const [isSubjectOpen, setIsSubjectOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const subjectMenuRef = useRef(null)

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
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subjectMenuRef.current && !subjectMenuRef.current.contains(event.target)) {
        setIsSubjectOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsSubjectOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <section id="contact" className="bg-[#f3f6f4] px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
      <motion.div
        className="mx-auto max-w-[700px] rounded-[2rem] border border-[#123830]/10 bg-white/85 p-6 shadow-[0_14px_48px_rgba(0,0,0,0.08)] backdrop-blur sm:p-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.form className="space-y-4" onSubmit={(event) => event.preventDefault()} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
          <motion.label variants={fadeInUp} className="block text-sm font-semibold text-[#123830]">
            Name
            <input
              type="text"
              placeholder="Your full name"
              className="mt-2 w-full rounded-xl border border-[#123830]/15 bg-white px-4 py-3 text-sm text-[#123830] outline-none ring-[#123830]/30 transition focus:ring-2"
            />
          </motion.label>

          <motion.label variants={fadeInUp} className="block text-sm font-semibold text-[#123830]">
            Email
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-[#123830]/15 bg-white px-4 py-3 text-sm text-[#123830] outline-none ring-[#123830]/30 transition focus:ring-2"
            />
          </motion.label>

          <motion.label variants={fadeInUp} className="block text-sm font-semibold text-[#123830]">
            Subject
            <div className="relative mt-2" ref={subjectMenuRef}>
              <input type="hidden" name="subject" value={selectedService} />
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl border border-[#123830]/15 bg-white px-4 py-3 text-left text-sm font-medium text-[#123830] outline-none ring-[#123830]/30 transition focus:ring-2"
                aria-haspopup="listbox"
                aria-expanded={isSubjectOpen}
                onClick={() => setIsSubjectOpen((open) => !open)}
              >
                <span className={selectedService ? 'text-[#123830]' : 'text-[#123830]/60'}>
                  {selectedService || 'Select a service'}
                </span>
                <ChevronDown size={16} className={`text-[#123830]/75 transition-transform ${isSubjectOpen ? 'rotate-180' : ''}`} />
              </button>

              <div
                className={`absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-[#123830]/12 bg-[#f3f6f4] p-2 shadow-[0_18px_44px_rgba(0,0,0,0.14)] transition-all duration-200 ${isSubjectOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}
              >
                <ul className="max-h-64 space-y-1 overflow-y-auto" role="listbox" aria-label="Service subject options">
                  {serviceOptions.map((service) => (
                    <li key={service}>
                      <button
                        type="button"
                        className={`w-full rounded-xl px-3 py-2.5 text-left text-sm leading-5 transition ${
                          selectedService === service
                            ? 'bg-[#123830] font-medium text-white shadow-[0_10px_24px_rgba(8,30,24,0.26)]'
                            : 'text-[#123830] hover:bg-[#dbe8e3]'
                        }`}
                        role="option"
                        aria-selected={selectedService === service}
                        onClick={() => {
                          setSelectedService(service)
                          setIsSubjectOpen(false)
                        }}
                      >
                        {service}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.label>

          <motion.label variants={fadeInUp} className="block text-sm font-semibold text-[#123830]">
            Message
            <textarea
              rows={5}
              placeholder="Tell us about your project"
              className="mt-2 w-full resize-none rounded-xl border border-[#123830]/15 bg-white px-4 py-3 text-sm text-[#123830] outline-none ring-[#123830]/30 transition focus:ring-2"
            />
          </motion.label>

          <motion.button
            variants={fadeInUp}
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#153728] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0f2a20]"
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
          >
            Send message
            <ArrowRight size={15} />
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  )
}

export default ContactSection
