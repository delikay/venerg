import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import AboutSection from './components/AboutSection'
import ProjectSection from './components/ProjectSection'
import ContactSection from './components/ContactSection'
import FooterSection from './components/FooterSection'
import ProjectsPage from './pages/ProjectsPage'

const HomePage = () => {
  return (
    <main className="min-h-screen" id="home">
      <Navbar />

      <HeroSection />
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <ProjectSection />
      <div id="contact">
        <ContactSection />
      </div>
      <FooterSection />
    </main>
  )
}

const App = () => {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'

  if (normalizedPath === '/projects') {
    return <ProjectsPage />
  }

  return <HomePage />
}

export default App
