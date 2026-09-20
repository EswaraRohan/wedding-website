import { useState, useEffect, useRef } from 'react'
import './index.css'
import jayaMangalam from './assets/jaya-mangalam.mp3'
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
  const [scratched, setScratched] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const wasPlayingRef = useRef(false)

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused || audio.muted) {
      audio.muted = false
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    const handleVisibility = () => {
      const audio = audioRef.current
      if (!audio) return

      if (document.hidden) {
        wasPlayingRef.current = !audio.paused && !audio.muted
        if (wasPlayingRef.current) audio.pause()
      } else if (wasPlayingRef.current) {
        audio.muted = false
        audio.play().then(() => setIsPlaying(true)).catch(() => {})
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

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
    if (!opened || !scratched) return
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
  }, [opened, scratched])

  return (
    <div style={{ width: '100%' }}>
      <audio ref={audioRef} src={jayaMangalam} loop preload="auto" aria-hidden="true" />
      {/* Splash screen - shown until "Open Invitation" is clicked */}
      {!opened && <WelcomeScreen onOpen={() => setOpened(true)} />}

      {/* Main site - rendered behind splash so it is ready instantly */}
      {scratched && <Navbar isPlaying={isPlaying} onToggleAudio={toggleAudio} />}
      <Hero
        onAudioStart={() => {
          const audio = audioRef.current
          if (!audio || !audio.paused) return
          audio.muted = false
          audio.play().then(() => setIsPlaying(true)).catch(() => {})
        }}
        onReveal={() => { setScratched(true);window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) }}
      />
      {scratched && (
        <>
          <Details />
          <MeetCouple />
          <Gallery />
          <Family />
          <VenueMap />
        </>
      )}
    </div>
  )
}
