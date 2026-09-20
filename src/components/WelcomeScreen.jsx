import { useState } from 'react'

const TEMPLE_IMG = 'https://parthisowmi.invitesu.in/_next/image?url=%2Fpapanasam3.webp&w=1920&q=75'

export default function WelcomeScreen({ onOpen }) {
  const [leaving, setLeaving] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const handleOpen = () => {
    setLeaving(true)
    setTimeout(onOpen, 1100)
  }

  return (
    <div className="welcome-screen" style={{ opacity: leaving ? 0 : 1 }}>
      <img
        src={TEMPLE_IMG}
        alt=""
        aria-hidden="true"
        onLoad={() => setImgLoaded(true)}
        className="welcome-bg"
        style={{ opacity: imgLoaded ? 0.55 : 0 }}
      />
      <div className="welcome-content">
        <p className="eyebrow">With the blessings of our elders &nbsp;</p>
        <div className="gold-line" />
        <div className="welcome-name">Katyayani</div>
        <div className="welcome-amp">&amp;</div>
        <div className="welcome-name">Siva Teja</div>
        <button className="open-invitation" onClick={handleOpen}>Open Invitation</button>
      </div>
    </div>
  )
}
