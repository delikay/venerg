import { useState } from 'react'
import { CalendarDays, Images, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/FooterSection'
import ProjectGalleryModal from '../components/ProjectGalleryModal'
import { featuredProject, projects, projectStats } from '../data/projects'

const ProjectsPage = () => {
  const [activeGallery, setActiveGallery] = useState(null)

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

  return (
    <main className="min-h-screen bg-[#f7faf8]">
      <Navbar />

      <section className="px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
        <div className="mx-auto max-w-[1120px] space-y-8">
          <div className="space-y-4">
            <a href="/#projects" className="inline-flex text-sm font-medium text-[#123830] transition-opacity hover:opacity-75">
              Back to home
            </a>
            <h1 className="text-[clamp(2.3rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#123830]">
              All Projects
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[#123830]/85">
              Explore our documented inverter, battery, and solar installations across residential and commercial sites.
            </p>
          </div>

          <article className="group relative overflow-hidden rounded-3xl bg-[#123830] text-white">
            <button
              type="button"
              onClick={() => openGallery(featuredProject)}
              className="block w-full text-left"
              aria-label={`Open ${featuredProject.title} photo gallery`}
            >
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                decoding="async"
                fetchPriority="high"
                className="h-[32rem] w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
              />
            </button>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07140f] via-[#0e2b22]/55 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Featured {featuredProject.type} Installation
              </p>
              <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">{featuredProject.title}</h2>
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
          </article>

          <div className="grid gap-4 sm:grid-cols-3">
            {projectStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[#123830]/12 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#123830]/70">{stat.label}</p>
                <p className="mt-3 text-4xl font-semibold leading-none text-[#123830]">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
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
                    loading="lazy"
                    decoding="async"
                    className="h-44 w-full object-cover"
                  />
                  {project.photoCount > 1 ? (
                    <span className="absolute bottom-3 right-3 rounded-full bg-[#04120d]/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                      View all {project.photoCount}
                    </span>
                  ) : null}
                </button>
                <div className="space-y-3 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#123830]/70">{project.type} Installation</p>
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeGallery ? (
        <ProjectGalleryModal
          isOpen
          images={activeGallery.images}
          title={activeGallery.title}
          initialIndex={activeGallery.startIndex}
          onClose={closeGallery}
        />
      ) : null}

      <FooterSection />
    </main>
  )
}

export default ProjectsPage
