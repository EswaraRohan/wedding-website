import { useEffect, useState } from 'react'
import Countdown from './Countdown'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const id = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(id) }, [])
  return (
    <section id="home" className="hero">
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="hero-content" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)' }}>
        <p className="hero-eyebrow"><span />Wedding Invitation<span /></p>
        <div className="hero-name">Katyayani</div>
        <div className="hero-and">&amp;</div>
        <div className="hero-name hero-name-last">Siva Teja</div>

        <div className="countdown-wrap">
          <div className="countdown-glow" />
          <div className="countdown-card">
            <div className="inner-frame" />
            {['tl','tr','bl','br'].map(c => <span key={c} className={`corner ${c}`}>❈</span>)}
            <div className="top-ornament">❈ ❈ ❈</div>
            <div className="watermark">✺</div>
            <p className="wedding-date">Wednesday · November 25 · 2026</p>
            <div className="date-divider"><div /><span>✦</span><div /></div>
            <p className="venue-line">📍 Somisetty Tanish Convention · Kurnool</p>
            <Countdown targetDate="2026-11-25T00:00:00" />
            <div className="shimmer" />
          </div>
        </div>
      </div>
      <div className="scroll-indicator"><div /><span>scroll</span></div>
    </section>
  )
}
