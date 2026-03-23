import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const ProjectGalleryModal = ({ isOpen, images, title, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const totalImages = images.length

  // Sync state with initialIndex prop when it changes
  useEffect(() => {
    if (currentIndex !== initialIndex) {
      setCurrentIndex(initialIndex)
    }
  }, [initialIndex])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'ArrowLeft' && totalImages > 1) {
        setCurrentIndex((index) => (index - 1 + totalImages) % totalImages)
      }

      if (event.key === 'ArrowRight' && totalImages > 1) {
        setCurrentIndex((index) => (index + 1) % totalImages)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose, totalImages])

  useEffect(() => {
    if (!isOpen || totalImages < 2) return

    const nextIndex = (currentIndex + 1) % totalImages
    const previousIndex = (currentIndex - 1 + totalImages) % totalImages
    const preloadNext = new Image()
    const preloadPrevious = new Image()

    preloadNext.src = images[nextIndex]
    preloadPrevious.src = images[previousIndex]
  }, [currentIndex, images, isOpen, totalImages])

  if (!isOpen || !totalImages) return null

  const goPrevious = () => {
    setIsImageLoading(true)
    setCurrentIndex((index) => (index - 1 + totalImages) % totalImages)
  }

  const goNext = () => {
    setIsImageLoading(true)
    setCurrentIndex((index) => (index + 1) % totalImages)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/10 p-4 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image gallery`}
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/70"
          aria-label="Close image gallery"
        >
          <X size={20} />
        </button>

        {totalImages > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrevious}
              className="absolute left-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/70"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/70"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        ) : null}

        <div className="relative flex min-h-[320px] items-center justify-center sm:min-h-[420px]">
          {isImageLoading ? (
            <div
              className="absolute inset-0 mx-auto h-full max-h-[76vh] w-full max-w-full animate-pulse rounded-2xl bg-[linear-gradient(110deg,rgba(255,255,255,0.12),rgba(255,255,255,0.2),rgba(255,255,255,0.12))]"
              aria-hidden="true"
            />
          ) : null}

          <img
            src={images[currentIndex]}
            alt={`${title} image ${currentIndex + 1}`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            className={`mx-auto block max-h-[76vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-opacity duration-200 ${
              isImageLoading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl bg-[#123830] px-3 py-2 text-sm text-white">
          <p className="truncate pr-4">{title}</p>
          <p>
            {currentIndex + 1} / {totalImages}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProjectGalleryModal
