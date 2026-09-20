import { useEffect, useRef, useState } from 'react'
import Countdown from './Countdown'

function CelebrationOverlay() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = canvas.getContext('2d')
    const petals = []
    let animationFrame
    let width = 0
    let height = 0

    const createPetal = (initial = false) => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : -20,
      size: 3 + Math.random() * 4,
      speed: 0.45 + Math.random() * 0.8,
      drift: (Math.random() - 0.5) * 0.45,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.035,
      color: ['#c9a96e', '#d4af37', '#e8a0a8', '#f5c6a5'][Math.floor(Math.random() * 4)],
    })

    const resize = () => {
      const ratio = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      petals.length = 0
      const count = Math.min(42, Math.max(18, Math.floor(width / 28)))
      for (let index = 0; index < count; index += 1) petals.push(createPetal(true))
    }

    const animate = () => {
      context.clearRect(0, 0, width, height)
      petals.forEach((petal) => {
        petal.y += petal.speed
        petal.x += petal.drift + Math.sin(petal.y / 80) * 0.15
        petal.angle += petal.spin
        if (petal.y > height + 20) Object.assign(petal, createPetal())
        context.save()
        context.translate(petal.x, petal.y)
        context.rotate(petal.angle)
        context.fillStyle = petal.color
        context.globalAlpha = 0.72
        context.beginPath()
        context.ellipse(0, 0, petal.size, petal.size * 0.55, 0, 0, Math.PI * 2)
        context.fill()
        context.restore()
      })
      animationFrame = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    animationFrame = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <div className="celebration-overlay" aria-hidden="true"><canvas ref={canvasRef} /></div>
}

function ScratchOverlay({ onReveal, onAudioStart }) {
  const canvasRef = useRef(null)
  const scratchCountRef = useRef(0)
  const drawingRef = useRef(false)
  const revealedRef = useRef(false)
  const pendingAudioRef = useRef(false)
  const onAudioStartRef = useRef(onAudioStart)
  const [complete, setComplete] = useState(false)

  useEffect(() => { onAudioStartRef.current = onAudioStart }, [onAudioStart])

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

    const blockPullToRefresh = (event) => {
      if (!revealedRef.current) event.preventDefault()
    }

    canvas.addEventListener('touchmove', blockPullToRefresh, { passive: false })
    const fireAudio = () => {
      if (pendingAudioRef.current) {
        pendingAudioRef.current = false
        onAudioStartRef.current?.()
      }
    }
    canvas.addEventListener('pointerup', fireAudio)
    canvas.addEventListener('touchend', fireAudio)
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    return () => {
      canvas.removeEventListener('touchmove', blockPullToRefresh)
      canvas.removeEventListener('pointerup', fireAudio)
      canvas.removeEventListener('touchend', fireAudio)
      observer.disconnect()
    }
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
      pendingAudioRef.current = true
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

export default function Hero({ onReveal, onAudioStart }) {
  const [loaded, setLoaded] = useState(false)
  const [scratched, setScratched] = useState(false)
  useEffect(() => { const id = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(id) }, [])
  return (
    <section id="home" className="hero">
      <CelebrationOverlay />
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className={`hero-content ${scratched ? 'hero-content-revealed' : ''}`} style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)' }}>
        <p className="hero-eyebrow"><span />We joyfully invite you to celebrate the union of<span /></p>
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
          <ScratchOverlay onReveal={() => { setScratched(true); onReveal() }} onAudioStart={onAudioStart} />
        </div>
      </div>
      {!scratched && <div className="scratch-below-note">✦ Scratch the card to continue ✦</div>}
    </section>
  )
}
