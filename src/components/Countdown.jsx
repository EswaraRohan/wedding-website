import { useEffect, useState } from 'react'

export default function Countdown({ targetDate }) {
  const [time, setTime] = useState(null)
  const [married, setMarried] = useState(false)

  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate) - new Date()
      if (diff <= 0) {
        setMarried(true)
        return
      }
      setMarried(false)
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

  if (married) {
    return (
      <div className="countdown-married">
        <span className="countdown-married-emoji" aria-hidden="true">💍</span>
        <span className="countdown-married-text">We&rsquo;re Married!</span>
        <span className="countdown-married-sub">Thank you for celebrating with us</span>
      </div>
    )
  }

  if (!time) return null

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hrs', value: time.hours },
    { label: 'Min', value: time.minutes },
    { label: 'Sec', value: time.seconds },
  ]

  return <div className="countdown-boxes">
    {units.map(({ label, value }) => (
      <div className="count-box" key={label}>
        <div className="count-value">{label === 'Days' ? value : String(value).padStart(2, '0')}</div>
        <div className="count-label">{label}</div>
      </div>
    ))}
  </div>
}
