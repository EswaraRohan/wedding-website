import { Calendar, Clock, MapPin, Shirt } from 'lucide-react'

const events = [
  {
    eventId: 'pellikooturu', icon: 'https://fonts.gstatic.com/s/e/notoemoji/17.0/1f338/72.png', name: 'Pellikuthuru  & Haldi', nameSub: 'Pre-Wedding Ceremony',
    date: 'Monday, November 23, 2026', time: '8:00 AM onwards', venue: 'Eswara Nilayam',
    address: 'Eswara Nilayam, Kurnool', mapsUrl: 'https://maps.app.goo.gl/Dx9JMDEY6mELfkew8',
    dresscode: 'Yellow / Ethnic Wear', badge: 'Festive Attire', highlight: false, accent: '#8a9e8a',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Katyayani+%26+Siva+Teja+Pelli+Kooturu&dates=20261123T000000Z/20261123T120000Z&location=Eswara+Nilayam+Kurnool',
  },
  {
    eventId: 'sangeeth', icon: 'https://fonts.gstatic.com/s/e/notoemoji/17.0/1f3b6/72.png', name: 'Edurukolu & Sangeet', nameSub: "Groom's Welcome & Sangeet Night",
    date: 'Tuesday, November 24, 2026', time: '7:30 PM onwards', venue: 'Somisetty Tanish Convention',
    address: 'Venkata Ramana Colony, Kurnool, Andhra Pradesh 518003',
    mapsUrl: 'https://maps.app.goo.gl/HcJ75gKyhixvTxaM8', dresscode: 'Festive / Colourful', badge: 'Bright Colours',
    highlight: false, accent: '#9e7a5a',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Katyayani+%26+Siva+Teja+Sangeeth&dates=20261124T000000Z/20261124T150000Z&location=Somisetty+Tanish+Convention+Kurnool',
  },
  {
    eventId: 'muhurtham', icon: 'https://fonts.gstatic.com/s/e/notoemoji/17.0/1fa94/72.png', name: 'Marriage', nameSub: 'Muhurtham',
    date: 'Wednesday, November 25, 2026', time: '9:57 AM', venue: 'Somisetty Tanish Convention',
    address: 'Venkata Ramana Colony, Kurnool, Andhra Pradesh 518003',
    mapsUrl: 'https://maps.app.goo.gl/HcJ75gKyhixvTxaM8', dresscode: 'Traditional & Elegant', badge: 'Traditional Attire',
    highlight: true, accent: '#c9a96e',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Katyayani+%26+Siva+Teja+Wedding&dates=20261125T000000Z/20261125T150000Z&location=Somisetty+Tanish+Convention+Kurnool',
  },
]

function InfoRow({ icon: Icon, label, value }) {
  return <div className="info-row"><Icon size={14} color="#c9a96e" /><div><div className="info-label">{label}</div><div className="info-value">{value}</div></div></div>
}

const garlandStrands = [
  {
    path: 'M 0 0 Q 132 160 264 0',
    flowers: [
      [0, 0, '#F5A623', 1], [44, 44.4, '#FF7A00', 1], [88, 71.1, '#FFD166', 1],
      [132, 80, '#E8A020', 1.36], [176, 71.1, '#F5A623', 1], [220, 44.4, '#FF7A00', 1], [264, 0, '#FFD166', 1],
    ],
  },
  {
    path: 'M 936 0 Q 1068 160 1200 0',
    flowers: [
      [936, 0, '#FF7A00', 1], [980, 44.4, '#F5A623', 1], [1024, 71.1, '#FFD166', 1],
      [1068, 80, '#E8A020', 1.36], [1112, 71.1, '#FF7A00', 1], [1156, 44.4, '#F5A623', 1], [1200, 0, '#FFD166', 1],
    ],
  },
  {
    path: 'M 180 0 Q 378 110 576 0',
    flowers: [
      [180, 0, '#FFD166', 1], [229.5, 24.1, '#F5A623', 1], [279, 41.3, '#FF7A00', 1],
      [328.5, 51.6, '#E8A020', 1], [378, 55, '#FFD166', 1.36], [427.5, 51.6, '#F5A623', 1],
      [477, 41.3, '#FF7A00', 1], [526.5, 24.1, '#E8A020', 1], [576, 0, '#FFD166', 1],
    ],
  },
  {
    path: 'M 624 0 Q 822 110 1020 0',
    flowers: [
      [624, 0, '#F5A623', 1], [673.5, 24.1, '#FFD166', 1], [723, 41.3, '#FF7A00', 1],
      [772.5, 51.6, '#E8A020', 1], [822, 55, '#F5A623', 1.36], [871.5, 51.6, '#FFD166', 1],
      [921, 41.3, '#FF7A00', 1], [970.5, 24.1, '#E8A020', 1], [1020, 0, '#F5A623', 1],
    ],
  },
]

function Garland() {
  return (
    <div className="garland" aria-hidden="true">
      <svg width="100%" height="220" viewBox="0 0 1200 220" preserveAspectRatio="xMidYMin meet" xmlns="http://www.w3.org/2000/svg">
        {garlandStrands.map((strand) => (
          <g key={strand.path}>
            <path d={strand.path} fill="none" stroke="rgba(201,169,110,0.35)" strokeWidth="1" />
            <circle cx={strand.flowers[0][0]} cy={strand.flowers[0][1]} r="4" fill="#c9a96e" opacity="0.6" />
            <circle cx={strand.flowers[strand.flowers.length - 1][0]} cy={strand.flowers[strand.flowers.length - 1][1]} r="4" fill="#c9a96e" opacity="0.6" />
            {strand.flowers.map(([x, y, color, scale]) => (
              <g key={`${x}-${y}`} transform={`translate(${x},${y}) scale(${scale})`}>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                  const radians = angle * Math.PI / 180
                  const petalX = 6.6 * Math.cos(radians)
                  const petalY = 6.6 * Math.sin(radians)
                  return (
                    <ellipse
                      key={angle}
                      cx={petalX}
                      cy={petalY}
                      rx="4.95"
                      ry="3.08"
                      transform={`rotate(${angle},${petalX},${petalY})`}
                      fill={color}
                      opacity="0.88"
                    />
                  )
                })}
                <circle cx="0" cy="0" r="3.52" fill="#E8A020" />
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function Details() {
  return (
    <section id="details" className="details-section">
      <Garland />
      <div className="section-inner">
        <div data-animate className="section-heading">
          <p className="section-kicker">Mark your calendar</p>
          <h2>Events</h2><div className="heading-rule" />
        </div>
        <div className="event-grid">
          {events.map(ev => (
            <div key={ev.eventId} data-animate="scale" className={`event-card ${ev.highlight ? 'main-event' : ''}`}>
              <div className="event-accent" style={{ background: ev.accent }} />
              {ev.highlight && <div className="main-badge">Main Event</div>}
              <div className="event-card-body">
                <div className="event-top"><img className="event-icon" src={ev.icon} alt="" /><span className="event-badge" style={{ background: ev.accent }}>{ev.badge}</span></div>
                <h3>{ev.name}</h3><span className="event-sub" style={{ color: ev.accent }}>{ev.nameSub}</span>
                <InfoRow icon={Calendar} label="Date" value={ev.date} />
                <InfoRow icon={Clock} label="Time" value={ev.time} />
                <InfoRow icon={MapPin} label="Venue" value={ev.venue} />
                <InfoRow icon={Shirt} label="Dress Code" value={ev.dresscode} />
                <div className="event-buttons">
                  <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="event-outline" style={{ borderColor: ev.accent, color: ev.accent }}>Directions</a>
                  <a href={ev.calendarUrl} target="_blank" rel="noreferrer" className="event-solid" style={{ background: ev.accent, borderColor: ev.accent }}><img className="calendar-icon" src="https://fonts.gstatic.com/s/e/notoemoji/17.0/1f4c5/72.png" alt="" /> Add to Cal</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
