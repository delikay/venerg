import detailsJson from './details.json?raw'

const details = JSON.parse(detailsJson)

const projectImageModules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
})

const normalizedImageEntries = Object.entries(projectImageModules).map(([path, image]) => {
  const normalizedPath = path.replace(/\\/g, '/').replace('../assets/', '')
  return [normalizedPath, image]
})

const imagesByRelativePath = new Map(normalizedImageEntries)
const imagesByFileName = new Map(
  normalizedImageEntries.map(([relativePath, image]) => [relativePath.split('/').pop(), image])
)

const normalizePictureName = (value = '') =>
  value
    .replace(/\\/g, '/')
    .replace(/^\.?\//, '')
    .replace(/^assets\//, '')
    .trim()

const splitFileName = (value) => {
  const normalized = normalizePictureName(value)
  const extensionSeparatorIndex = normalized.lastIndexOf('.')

  if (extensionSeparatorIndex <= 0) {
    return {
      base: normalized,
      extension: '',
    }
  }

  return {
    base: normalized.slice(0, extensionSeparatorIndex),
    extension: normalized.slice(extensionSeparatorIndex + 1),
  }
}

const getImageByCandidates = (candidates) => {
  for (const candidateValue of candidates) {
    const candidate = normalizePictureName(candidateValue)

    if (!candidate) continue

    if (imagesByRelativePath.has(candidate)) {
      return imagesByRelativePath.get(candidate)
    }

    const fileName = candidate.split('/').pop()

    if (imagesByFileName.has(fileName)) {
      return imagesByFileName.get(fileName)
    }
  }

  return null
}

const getFullImageCandidates = (pictureName) => {
  const normalized = normalizePictureName(pictureName)
  const fileName = normalized.split('/').pop()

  return [
    `projects/full/${normalized}`,
    `projects/full/${fileName}`,
    `full/${normalized}`,
    `full/${fileName}`,
    `projects/${normalized}`,
    `projects/${fileName}`,
    normalized,
  ]
}

const getThumbImageCandidates = (pictureName) => {
  const normalized = normalizePictureName(pictureName)
  const fileName = normalized.split('/').pop()
  const { base, extension } = splitFileName(normalized)
  const thumbFileNames = extension
    ? [`${base}-thumb.${extension}`, `${base}.thumb.${extension}`, `${base}_thumb.${extension}`]
    : []

  return [
    `projects/thumbs/${normalized}`,
    `projects/thumbs/${fileName}`,
    `thumbs/${normalized}`,
    `thumbs/${fileName}`,
    ...thumbFileNames.map((name) => `projects/thumbs/${name}`),
    ...thumbFileNames.map((name) => `thumbs/${name}`),
    ...thumbFileNames,
    normalized,
  ]
}

const resolveProjectImageSet = (pictureName) => {
  const fullImage = getImageByCandidates(getFullImageCandidates(pictureName))
  const thumbImage = getImageByCandidates(getThumbImageCandidates(pictureName)) ?? fullImage

  if (!fullImage && !thumbImage) return null

  return {
    name: normalizePictureName(pictureName),
    full: fullImage ?? thumbImage,
    thumb: thumbImage ?? fullImage,
  }
}

const fallbackImageName = 'benefits-energy.jpg'
const fallbackFullImage = getImageByCandidates(getFullImageCandidates(fallbackImageName))
const fallbackThumbImage = getImageByCandidates(getThumbImageCandidates(fallbackImageName)) ?? fallbackFullImage

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
const usedProjectIds = new Set()

const getUniqueProjectId = (project, index, title) => {
  const baseId =
    slugify(`${title}-${project.date ?? ''}-${project.location ?? ''}`) || `project-${index + 1}`

  if (!usedProjectIds.has(baseId)) {
    usedProjectIds.add(baseId)
    return baseId
  }

  let suffix = 2
  let candidate = `${baseId}-${suffix}`

  while (usedProjectIds.has(candidate)) {
    suffix += 1
    candidate = `${baseId}-${suffix}`
  }

  usedProjectIds.add(candidate)
  return candidate
}

export const allProjects = sortedDetails.map((project, index) => {
  const title = (project.Project_name ?? `Project ${index + 1}`).replace(/>+$/, '').trim()
  const pictureNames = Array.isArray(project.Pictures) ? project.Pictures : []
  const galleryImages = pictureNames.map((name) => resolveProjectImageSet(name)).filter(Boolean)

  return {
    id: getUniqueProjectId(project, index, title),
    title,
    location: project.location ?? 'Location unavailable',
    rawDate: project.date ?? '',
    dateLabel: formatProjectDate(project.date),
    description: project.description ?? '',
    type: inferProjectType(title),
    image: galleryImages[0]?.thumb ?? fallbackThumbImage,
    gallery: galleryImages.map((image) => image.full).filter(Boolean),
    galleryThumbs: galleryImages.map((image) => image.thumb).filter(Boolean),
    pictureNames,
    photoCount: galleryImages.length,
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
  image: fallbackThumbImage,
  gallery: fallbackFullImage ? [fallbackFullImage] : [],
  galleryThumbs: fallbackThumbImage ? [fallbackThumbImage] : [],
  pictureNames: [],
  photoCount: fallbackFullImage ? 1 : 0,
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
