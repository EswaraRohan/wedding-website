import { useEffect, useRef, useState } from 'react'
import Countdown from './Countdown'

function ScratchOverlay({ onReveal }) {
  const canvasRef = useRef(null)
  const scratchCountRef = useRef(0)
  const drawingRef = useRef(false)
  const revealedRef = useRef(false)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d', { willReadFrequently: true })
    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = window.devicePixelRatio || 1
      canvas.width = Math.max(1, Math.floor(bounds.width * ratio))
      canvas.height = Math.max(1, Math.floor(bounds.height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.globalCompositeOperation = 'source-over'
      context.fillStyle = '#a71932'
      context.fillRect(0, 0, bounds.width, bounds.height)
      context.fillStyle = 'rgba(255, 210, 120, 0.08)'
      for (let x = 14; x < bounds.width; x += 28) {
        for (let y = 14; y < bounds.height; y += 28) {
          context.beginPath()
          context.arc(x, y, 1.5, 0, Math.PI * 2)
          context.fill()
        }
      }
      context.strokeStyle = 'rgba(212, 175, 55, 0.72)'
      context.lineWidth = 1
      context.strokeRect(14, 14, bounds.width - 28, bounds.height - 28)
      context.strokeStyle = 'rgba(212, 175, 55, 0.9)'
      context.lineWidth = 2
      context.beginPath()
      context.moveTo(22, 44); context.lineTo(22, 22); context.lineTo(66, 22)
      context.moveTo(bounds.width - 22, 44); context.lineTo(bounds.width - 22, 22); context.lineTo(bounds.width - 66, 22)
      context.moveTo(22, bounds.height - 44); context.lineTo(22, bounds.height - 22); context.lineTo(66, bounds.height - 22)
      context.moveTo(bounds.width - 22, bounds.height - 44); context.lineTo(bounds.width - 22, bounds.height - 22); context.lineTo(bounds.width - 66, bounds.height - 22)
      context.stroke()
      context.textAlign = 'center'
      context.fillStyle = '#e6b84f'
      context.font = '500 20px Cinzel, serif'
      context.fillText('✦  SCRATCH TO REVEAL  ✦', bounds.width / 2, bounds.height / 2 - 4)
      context.fillStyle = 'rgba(250, 246, 241, 0.78)'
      context.font = '400 14px Cinzel, serif'
      context.fillText('The Wedding Date', bounds.width / 2, bounds.height / 2 + 34)
      scratchCountRef.current = 0
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  const scratch = (event) => {
    const canvas = canvasRef.current
    if (!canvas || revealedRef.current) return
    const bounds = canvas.getBoundingClientRect()
    const point = event.touches?.[0] || event
    const x = point.clientX - bounds.left
    const y = point.clientY - bounds.top
    const context = canvas.getContext('2d')
    context.globalCompositeOperation = 'destination-out'
    context.beginPath()
    context.arc(x, y, 28, 0, Math.PI * 2)
    context.fill()
    scratchCountRef.current += 1
    if (scratchCountRef.current > 22) {
      revealedRef.current = true
      setComplete(true)
      onReveal()
    }
  }

  return <canvas
    ref={canvasRef}
    className={`scratch-overlay ${complete ? 'is-complete' : ''}`}
    onPointerDown={(event) => { drawingRef.current = true; scratch(event) }}
    onPointerMove={(event) => { if (drawingRef.current) scratch(event) }}
    onPointerUp={() => { drawingRef.current = false }}
    onPointerCancel={() => { drawingRef.current = false }}
    onPointerLeave={() => { drawingRef.current = false }}
    aria-label="Scratch to reveal the wedding date"
  />
}

export default function Hero({ onReveal }) {
  const [loaded, setLoaded] = useState(false)
  const [scratched, setScratched] = useState(false)
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
          <ScratchOverlay onReveal={() => { setScratched(true); onReveal() }} />
        </div>
      </div>
      {!scratched && <div className="scratch-below-note">✦ Scratch the card to continue ✦</div>}
    </section>
  )
}
