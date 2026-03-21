import detailsJson from './details.json?raw'

const details = JSON.parse(detailsJson)

const projectImageModules = import.meta.glob('../assets/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
})

const imagesByFileName = Object.fromEntries(
  Object.entries(projectImageModules).map(([path, image]) => [path.split('/').pop(), image])
)

const fallbackImage = imagesByFileName['benefits-energy.jpg']

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
})

const formatProjectDate = (value) => {
  if (!value) return 'Date unavailable'

  const [year, month] = value.split('-').map(Number)

  if (!year || !month) return value

  return dateFormatter.format(new Date(Date.UTC(year, month - 1, 1)))
}

const inferProjectType = (title) => {
  const normalizedTitle = title.toLowerCase()

  if (normalizedTitle.includes('commercial')) return 'Commercial'
  if (normalizedTitle.includes('residential')) return 'Residential'

  return 'Installation'
}

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const sortedDetails = [...details].sort((left, right) => right.date.localeCompare(left.date))

export const allProjects = sortedDetails.map((project, index) => {
  const title = (project.Project_name ?? `Project ${index + 1}`).replace(/>+$/, '').trim()
  const pictureNames = Array.isArray(project.Pictures) ? project.Pictures : []
  const gallery = pictureNames.map((name) => imagesByFileName[name]).filter(Boolean)

  return {
    id: slugify(title) || `project-${index + 1}`,
    title,
    location: project.location ?? 'Location unavailable',
    rawDate: project.date ?? '',
    dateLabel: formatProjectDate(project.date),
    description: project.description ?? '',
    type: inferProjectType(title),
    image: gallery[0] ?? fallbackImage,
    gallery,
    pictureNames,
    photoCount: pictureNames.length,
  }
})

const emptyProjectFallback = {
  id: 'project-fallback',
  title: 'Project details coming soon',
  location: 'Nigeria',
  rawDate: '',
  dateLabel: 'Updating',
  description: 'Recent installation details will appear here shortly.',
  type: 'Installation',
  image: fallbackImage,
  gallery: fallbackImage ? [fallbackImage] : [],
  pictureNames: [],
  photoCount: fallbackImage ? 1 : 0,
}

export const featuredProject = allProjects[0] ?? emptyProjectFallback
export const projects = allProjects.slice(1)

const uniqueLocations = new Set(allProjects.map((project) => project.location)).size
const documentedPhotos = allProjects.reduce((total, project) => total + project.photoCount, 0)

export const projectStats = [
  { label: 'Projects Delivered', value: `${allProjects.length}` },
  { label: 'Locations Covered', value: `${uniqueLocations}` },
  { label: 'Documented Photos', value: `${documentedPhotos}` },
]
