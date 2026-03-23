import { useState } from 'react'
import { ArrowRight, CalendarDays, Images, MapPin } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import ProjectGalleryModal from './ProjectGalleryModal'
import { featuredProject, projects, projectStats } from '../data/projects'

const ProjectSection = () => {
  const [activeGallery, setActiveGallery] = useState(null)
  const shouldReduceMotion = useReducedMotion()

  const openGallery = (project, startIndex = 0) => {
    if (!project.gallery.length) return

    setActiveGallery({
      title: project.title,
      images: project.gallery,
      startIndex,
    })
  }

  const closeGallery = () => {
    setActiveGallery(null)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
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
    <section id="projects" className="bg-[#f7faf8] px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-[#123830]/20 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#123830]">
              Projects
            </span>
            <h2 className="max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#123830]">
              Recent inverter, battery, and solar installations across homes and commercial sites
            </h2>
          </div>

          <a
            href="/projects"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#153728] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0f2a20]"
          >
            See all projects
            <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div
          className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.article variants={fadeInUp} className="group relative overflow-hidden rounded-3xl bg-[#123830] text-white">
            <button
              type="button"
              onClick={() => openGallery(featuredProject)}
              className="block w-full text-left"
              aria-label={`Open ${featuredProject.title} photo gallery`}
            >
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width="1120"
                height="512"
                className="h-[28rem] w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 sm:h-[32rem]"
              />
            </button>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07140f] via-[#0e2b22]/55 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Featured {featuredProject.type} Installation
              </p>
              <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">{featuredProject.title}</h3>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/90">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={14} />
                  {featuredProject.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={14} />
                  {featuredProject.dateLabel}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Images size={14} />
                  {featuredProject.photoCount} photos
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85">{featuredProject.description}</p>
              {featuredProject.photoCount > 1 ? (
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                  Click image to view all photos
                </p>
              ) : null}
            </div>
          </motion.article>

          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {projectStats.map((stat) => (
              <motion.div variants={fadeInUp} key={stat.label} className="rounded-2xl border border-[#123830]/12 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#123830]/70">{stat.label}</p>
                <p className="mt-3 text-4xl font-semibold leading-none text-[#123830]">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.slice(0, 3).map((project, index) => (
            <motion.article
              variants={fadeInUp}
              key={project.id}
              className="overflow-hidden rounded-3xl border border-[#123830]/10 bg-white shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
            >
              <button
                type="button"
                onClick={() => openGallery(project)}
                className="relative block w-full text-left"
                aria-label={`Open ${project.title} photo gallery`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="eager"
                  decoding="async"
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  width="400"
                  height="176"
                  className="h-44 w-full object-cover"
                />
                {project.photoCount > 1 ? (
                  <span className="absolute bottom-3 right-3 rounded-full bg-[#04120d]/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                    View all {project.photoCount}
                  </span>
                ) : null}
              </button>
              <div className="space-y-3 p-5">
                <h3 className="text-xl font-semibold leading-tight text-[#123830]">{project.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#123830]/80">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} />
                    {project.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    {project.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Images size={14} />
                    {project.photoCount} photos
                  </span>
                </div>
                <p className="text-sm leading-6 text-[#123830]/80">{project.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {activeGallery ? (
        <ProjectGalleryModal
          isOpen
          images={activeGallery.images}
          title={activeGallery.title}
          initialIndex={activeGallery.startIndex}
          onClose={closeGallery}
        />
      ) : null}
    </section>
  )
}

export default ProjectSection
