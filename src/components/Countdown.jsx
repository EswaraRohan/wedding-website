import { useEffect, useState } from 'react'

function WeddingDayScreen() {
  return (
    <div className="wd-screen">
      <div className="wd-petals" aria-hidden="true">✿ ❀ ✿ ❀ ✿</div>
      <p className="wd-kicker">The moment has arrived</p>
      <div className="wd-title">Today We Wed</div>
      <div className="wd-names">Katyayani <span className="wd-amp">&amp;</span> Siva Teja</div>
      <div className="wd-divider"><span>✦</span></div>
      <p className="wd-venue">Somisetty Tanish Convention · Kurnool</p>
      <p className="wd-time">Muhurtham at 9:54 AM</p>
      <div className="wd-pulse-ring" aria-hidden="true" />
    </div>
  )
}

export default function Countdown({ targetDate }) {
  const [phase, setPhase] = useState('loading')
  const [time, setTime] = useState(null)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const diff = new Date(targetDate) - now
      if (diff > 0) {
        setPhase('counting')
        setTime({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        })
      } else {
        const isWeddingDay = now.getFullYear() === 2026 && now.getMonth() === 10 && now.getDate() === 25
        setPhase(isWeddingDay ? 'today' : 'married')
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (phase === 'today') return <WeddingDayScreen />

  if (phase === 'married') {
    return (
      <div className="countdown-married">
        <span className="countdown-married-emoji" aria-hidden="true">💍</span>
        <span className="countdown-married-text">We&rsquo;re Married!</span>
        <span className="countdown-married-sub">Thank you for celebrating with us</span>
      </div>
    )
  }

  if (phase !== 'counting' || !time) return null

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hrs', value: time.hours },
    { label: 'Min', value: time.minutes },
    { label: 'Sec', value: time.seconds },
  ]

  return (
    <div className="countdown-boxes">
      {units.map(({ label, value }) => (
        <div className="count-box" key={label}>
          <div className="count-value">{label === 'Days' ? value : String(value).padStart(2, '0')}</div>
          <div className="count-label">{label}</div>
        </div>
      ))}
    </div>
  )
}
