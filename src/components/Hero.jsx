import { useEffect, useState } from 'react'

function useCountdown(targetDate) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate) - new Date()
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])
  return time
}
function pad(n) { return String(n).padStart(2, '0') }

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const id = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(id) }, [])
  const { days, hours, minutes, seconds } = useCountdown('2026-11-25T00:00:00')
  const units = [
    { label: 'Days', value: days },
    { label: 'Hrs', value: pad(hours) },
    { label: 'Min', value: pad(minutes) },
    { label: 'Sec', value: pad(seconds) },
  ]

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
            <div className="countdown-boxes">
              {units.map(({ label, value }) => (
                <div className="count-box" key={label}>
                  <div className="count-value">{value}</div>
                  <div className="count-label">{label}</div>
                </div>
              ))}
            </div>
            <div className="shimmer" />
          </div>
        </div>
      </div>
      <div className="scroll-indicator"><div /><span>scroll</span></div>
    </section>
  )
}
