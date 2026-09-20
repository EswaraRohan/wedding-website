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

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }

  const unlockAudio = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.play().then(() => {
      audio.pause()
      audio.currentTime = 0
    }).catch(() => {})
  }

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
      {!opened && <WelcomeScreen onOpen={() => { unlockAudio(); setOpened(true) }} />}

      {/* Main site - rendered behind splash so it is ready instantly */}
      {scratched && <Navbar isPlaying={isPlaying} onToggleAudio={toggleAudio} />}
      <Hero onReveal={() => {
        setScratched(true)
        audioRef.current?.play().catch(() => {})
      }} />
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
