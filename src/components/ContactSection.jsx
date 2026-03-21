import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

const serviceOptions = [
  'Solar and Inverter System Installation',
  'Electric Fence and Barb Wire Installation',
  'CCTV Installation',
  'Office Intercom Installation',
  'Sales of Solar and Inverter Accessories',
]

const ContactSection = () => {
  const shouldReduceMotion = useReducedMotion()
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitState, setSubmitState] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const contactEmail = 'venergielectric@gmail.com'
  const submitEndpoint = `https://formsubmit.co/ajax/${contactEmail}`

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

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitState('loading')
    setSubmitMessage('')

    try {
      const response = await fetch(submitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          service: formState.service,
          message: formState.message,
          _subject: `New website enquiry: ${formState.service}`,
          _captcha: 'false',
        }),
      })

      const payload = await response.json().catch(() => null)
      if (!response.ok || payload?.success === false || payload?.success === 'false') {
        throw new Error('Submission failed')
      }

      setFormState({
        name: '',
        email: '',
        service: '',
        message: '',
      })
      setSubmitState('success')
      setSubmitMessage('Message sent successfully. We will get back to you shortly.')
    } catch {
      setSubmitState('error')
      setSubmitMessage(
        `We could not send your message right now. Please email us directly at ${contactEmail}.`,
      )
    }
  }

  return (
    <section id="contact" className="bg-[#f3f6f4] px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
      <motion.div
        className="mx-auto max-w-[700px] rounded-[2rem] border border-[#123830]/10 bg-white/85 p-6 shadow-[0_14px_48px_rgba(0,0,0,0.08)] backdrop-blur sm:p-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.form
          className="space-y-4"
          onSubmit={handleSubmit}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.label variants={fadeInUp} className="block text-sm font-semibold text-[#123830]">
            Name
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formState.name}
              onChange={handleChange}
              autoComplete="name"
              minLength={2}
              required
              className="mt-2 w-full rounded-xl border border-[#123830]/15 bg-white px-4 py-3 text-sm text-[#123830] outline-none ring-[#123830]/30 transition focus:ring-2"
            />
          </motion.label>

          <motion.label variants={fadeInUp} className="block text-sm font-semibold text-[#123830]">
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formState.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="mt-2 w-full rounded-xl border border-[#123830]/15 bg-white px-4 py-3 text-sm text-[#123830] outline-none ring-[#123830]/30 transition focus:ring-2"
            />
          </motion.label>

          <motion.label variants={fadeInUp} className="block text-sm font-semibold text-[#123830]">
            Service
            <select
              name="service"
              value={formState.service}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-[#123830]/15 bg-white px-4 py-3 text-sm text-[#123830] outline-none ring-[#123830]/30 transition focus:ring-2"
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </motion.label>

          <motion.label variants={fadeInUp} className="block text-sm font-semibold text-[#123830]">
            Message
            <textarea
              name="message"
              rows={5}
              placeholder="Tell us about your project"
              value={formState.message}
              onChange={handleChange}
              minLength={20}
              required
              className="mt-2 w-full resize-none rounded-xl border border-[#123830]/15 bg-white px-4 py-3 text-sm text-[#123830] outline-none ring-[#123830]/30 transition focus:ring-2"
            />
          </motion.label>

          <motion.button
            variants={fadeInUp}
            type="submit"
            disabled={submitState === 'loading'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#153728] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0f2a20]"
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
          >
            {submitState === 'loading' ? 'Sending...' : 'Send message'}
            <ArrowRight size={15} />
          </motion.button>

          {submitMessage && (
            <motion.p
              variants={fadeInUp}
              className={`text-sm ${submitState === 'error' ? 'text-red-600' : 'text-[#123830]/85'}`}
              role="status"
              aria-live="polite"
            >
              {submitMessage}
            </motion.p>
          )}
        </motion.form>
      </motion.div>
    </section>
  )
}

export default ContactSection
