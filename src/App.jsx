import { useEffect, useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Details from './components/Details'
import MeetCouple from './components/MeetCouple'
import Gallery from './components/Gallery'
import Family from './components/Family'
import VenueMap from './components/VenueMap'

export default function App() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (open) window.scrollTo(0, 0)
  }, [open])

  useEffect(() => {
    if (!open) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [open])

  if (!open) return <WelcomeScreen onOpen={() => setOpen(true)} />

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Details />
        <MeetCouple />
        <Gallery />
        <Family />
        <VenueMap />
      </main>
    </>
  )
}
