import { MapPin, Navigation } from 'lucide-react'

const VENUE = {
  name: 'Somisetty Tanish Convention',
  address: '1st Floor, Venkata Ramana Colony, Kurnool, Andhra Pradesh 518003',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.3289763281787!2d78.0246065740884!3d15.839297745554386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5e74ef05bc5c9%3A0x8e9bbe8137eb6115!2sSomisetty%20Tanish%20Convention!5e0!3m2!1sen!2sin!4v1789833583091!5m2!1sen!2sin',
  directionsUrl: 'https://maps.app.goo.gl/HcJ75gKyhixvTxaM8',
  calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Katyayani+%26+Siva+Teja+Wedding&dates=20261225T000000Z/20261225T150000Z&location=Somisetty+Tanish+Convention+Kurnool',
}
export default function VenueMap() {
  return <section id="venue" className="venue-section">
    <div className="venue-inner">
      <div data-animate className="section-heading">
        <p className="section-kicker">Find us here</p><h2>Venue</h2><div className="heading-rule" />
      </div>
      <div className="venue-grid">
        <div data-animate="left" className="map-frame"><iframe title={VENUE.name} src={VENUE.mapEmbed} width="100%" height="100%" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div>
        <div data-animate="right" className="venue-info">
          <h3>{VENUE.name}</h3><span className="venue-type">Ceremony &amp; Reception Venue</span>
          <div className="address"><MapPin size={16} color="#c9a96e" /><p>{VENUE.address}</p></div>
          <div className="schedule-card">
            {[['6:00 PM','Ceremony begins'],['7:30 PM','Dinner service'],['8:30 PM','Reception & celebrations'],['12:00 AM','Celebrations conclude']].map(([time,label]) => <div key={time}><span>{time}</span><span>{label}</span></div>)}
          </div>
          <div className="venue-actions">
            <a href={VENUE.directionsUrl} target="_blank" rel="noreferrer" className="btn-outline-gold"><Navigation size={13} />Get Directions</a>
            <a href={VENUE.calendarUrl} target="_blank" rel="noreferrer" className="btn-gold">📅 Add to Calendar</a>
          </div>
        </div>
      </div>
      <div className="contact-links">
        <div className="flower-divider">🪷</div>
        <div><a href="https://wa.me/918985290731">WhatsApp</a><span>·</span><a href="mailto:rohan.iiith@gmail.com">Email</a><span>·</span><a href="https://instagram.com/rohan_eswara" target="_blank" rel="noreferrer">Instagram</a></div>
      </div>
    </div>
  </section>
}
