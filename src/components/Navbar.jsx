import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import logoImage from '../assets/Logo.png'

const links = [
  { label: 'Home', id: 'home' }, { label: 'Events', id: 'details' },
  { label: 'Couple', id: 'meet-the-couple' }, { label: 'Gallery', id: 'gallery' }, { label: 'Venue', id: 'venue' },
]
export default function Navbar({ isPlaying, onToggleAudio }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false) }
  return <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
    <div className="navbar-inner">
      <button className="logo" onClick={() => scrollTo('home')} aria-label="Go to home">
        <img src={logoImage} alt="Katyayani and Siva Teja" />
      </button>
      <ul className="desktop-nav">{links.map(l => <li key={l.id}><button onClick={() => scrollTo(l.id)}>{l.label}</button></li>)}</ul>
      <button className="navbar-audio" type="button" onClick={onToggleAudio} aria-label={isPlaying ? 'Turn music off' : 'Turn music on'}>
        {isPlaying ? '♪ Off' : '♫ On'}
      </button>
      <button className="mobile-menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={22} /> : <Menu size={22} />}</button>
    </div>
    {open && <div className="mobile-drawer"><ul>{links.map(l => <li key={l.id}><button onClick={() => scrollTo(l.id)}>{l.label}</button></li>)}</ul></div>}
  </nav>
}
