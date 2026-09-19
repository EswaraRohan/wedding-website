import { useState } from 'react'
import { X } from 'lucide-react'

const photos = [
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop', caption: 'The Sacred Union', symbol: '🌹' },
]

export default function Gallery() {
  const [selected, setSelected] = useState(null)
  return <section id="gallery" className="gallery-section">
    <div className="section-inner">
      <div data-animate className="section-heading">
        <p className="section-kicker">Captured Memories</p><h2>Our Gallery</h2><div className="heading-rule" />
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
