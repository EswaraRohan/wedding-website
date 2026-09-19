import { useState, useEffect } from 'react'
import './index.css'
import WelcomeScreen from './components/WelcomeScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MeetCouple from './components/MeetCouple'
import Details from './components/Details'
import Gallery from './components/Gallery'
import Family from './components/Family'
import VenueMap from './components/VenueMap'

export default function App() {
  const [opened, setOpened] = useState(false)

  // Lock body scroll while welcome screen is showing; scroll to top when dismissed
  useEffect(() => {
    if (!opened) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    return () => document.body.classList.remove('no-scroll')
  }, [opened])

  // Set up IntersectionObserver for scroll-reveal after welcome dismissed
  useEffect(() => {
    if (!opened) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    // Small delay to let components render
    const timer = setTimeout(() => {
      document.querySelectorAll('[data-animate]').forEach((el) => {
        observer.observe(el)
      })
    }, 200)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [opened])

  return (
    <div style={{ width: '100%' }}>
      {/* Splash screen - shown until "Open Invitation" is clicked */}
      {!opened && <WelcomeScreen onOpen={() => setOpened(true)} />}

      {/* Main site - rendered behind splash so it is ready instantly */}
      <Navbar />
      <Hero />
      <Details />
      <MeetCouple />
      <Gallery />
      <Family />
      <VenueMap />
    </div>
  )
}
