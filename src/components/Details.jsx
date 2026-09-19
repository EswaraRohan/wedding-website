import { Calendar, Clock, MapPin, Shirt } from 'lucide-react'

const events = [
  {
    eventId: 'pellikooturu', icon: '🌸', name: 'Pellikuthuru & Haldi', nameSub: 'Pre-Wedding Ceremony',
    date: 'Monday, November 23, 2026', time: '8:00 AM onwards', venue: 'Eswara Nilayam',
    address: 'Eswara Nilayam, Kurnool', mapsUrl: 'https://maps.app.goo.gl/Dx9JMDEY6mELfkew8',
    dresscode: 'Yellow / Ethnic Wear', badge: 'Festive Attire', highlight: false, accent: '#8a9e8a',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Katyayani+%26+Siva+Teja+Pelli+Kooturu&dates=20261123T000000Z/20261123T120000Z&location=Eswara+Nilayam+Kurnool',
  },
  {
    eventId: 'sangeeth', icon: '🎶', name: 'Edurukolu & Sangeet', nameSub: "Groom's Welcome & Sangeet Night",
    date: 'Tuesday, November 24, 2026', time: '7:30 PM onwards', venue: 'Somisetty Tanish Convention',
    address: '1st Floor, Venkata Ramana Colony, Kurnool, Andhra Pradesh 518003',
    mapsUrl: 'https://maps.app.goo.gl/HcJ75gKyhixvTxaM8', dresscode: 'Festive / Colourful', badge: 'Bright Colours',
    highlight: false, accent: '#9e7a5a',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Katyayani+%26+Siva+Teja+Sangeeth&dates=20261124T000000Z/20261124T150000Z&location=Somisetty+Tanish+Convention+Kurnool',
  },
  {
    eventId: 'muhurtham', icon: '🪔', name: 'Marriage', nameSub: 'Muhurtham',
    date: 'Wednesday, November 25, 2026', time: '9:57 AM', venue: 'Somisetty Tanish Convention',
    address: '1st Floor, Venkata Ramana Colony, Kurnool, Andhra Pradesh 518003',
    mapsUrl: 'https://maps.app.goo.gl/HcJ75gKyhixvTxaM8', dresscode: 'Traditional & Elegant', badge: 'Traditional Attire',
    highlight: true, accent: '#c9a96e',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Katyayani+%26+Siva+Teja+Wedding&dates=20261125T000000Z/20261125T150000Z&location=Somisetty+Tanish+Convention+Kurnool',
  },
]

function InfoRow({ icon: Icon, label, value }) {
  return <div className="info-row"><Icon size={14} color="#c9a96e" /><div><div className="info-label">{label}</div><div className="info-value">{value}</div></div></div>
}

export default function Details() {
  return (
    <section id="details" className="details-section">
      <div className="garland" aria-hidden="true">✽　✽　✽　✽　✽</div>
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
                <div className="event-top"><span className="event-icon">{ev.icon}</span><span className="event-badge" style={{ background: ev.accent }}>{ev.badge}</span></div>
                <h3>{ev.name}</h3><span className="event-sub" style={{ color: ev.accent }}>{ev.nameSub}</span>
                <InfoRow icon={Calendar} label="Date" value={ev.date} />
                <InfoRow icon={Clock} label="Time" value={ev.time} />
                <InfoRow icon={MapPin} label="Venue" value={ev.venue} />
                <InfoRow icon={Shirt} label="Dress Code" value={ev.dresscode} />
                <div className="event-buttons">
                  <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="event-outline" style={{ borderColor: ev.accent, color: ev.accent }}>Directions</a>
                  <a href={ev.calendarUrl} target="_blank" rel="noreferrer" className="event-solid" style={{ background: ev.accent, borderColor: ev.accent }}>📅 Add to Cal</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
