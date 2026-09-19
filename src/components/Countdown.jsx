import { useEffect, useState } from 'react'

export default function Countdown({ targetDate }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate) - new Date()
      if (diff <= 0) return setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
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
