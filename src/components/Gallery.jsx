import { useState } from 'react'
import { X } from 'lucide-react'
import engagementOne from '../assets/013A6718 (1).jpg'
import engagementTwo from '../assets/013A6931.jpg'
import engagementThree from '../assets/A_R69262.jpg'
import engagementFive from '../assets/IMG_4983.jpeg'

const photos = [
  { src: engagementOne, caption: 'A Little Engagement Magic', symbol: '✨' },
  { src: engagementTwo, caption: 'The Celebration Begins', symbol: '🌸' },
  { src: engagementThree, caption: 'Moments Worth Keeping', symbol: '💍' },
  { src: engagementFive, caption: 'A Sneak Peek of Forever', symbol: '🌿' },
]

export default function Gallery() {
  const [selected, setSelected] = useState(null)
  return <section id="gallery" className="gallery-section">
    <div className="section-inner">
      <div data-animate className="section-heading">
        <p className="section-kicker">Engagement Sneak Peeks</p><h2>Our Gallery</h2><div className="heading-rule" />
      </div>
      <div data-animate className="gallery-grid">
        {photos.map((photo, i) => <div key={i} onClick={() => setSelected(photo)} className="gallery-item">
          <img src={photo.src} alt={photo.caption} loading="lazy" />
          <div className="gallery-caption"><span>{photo.symbol}</span><em>{photo.caption}</em></div>
        </div>)}
      </div>
    </div>
    {selected && <div className="lightbox" onClick={() => setSelected(null)}>
      <button onClick={() => setSelected(null)} className="lightbox-close" aria-label="Close"><X size={20} /></button>
      <div onClick={e => e.stopPropagation()} className="lightbox-content">
        <img src={selected.src} alt={selected.caption} />
        <p>{selected.symbol} {selected.caption}</p>
      </div>
    </div>}
  </section>
}
