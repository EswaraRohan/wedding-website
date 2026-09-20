import bridePhoto from '../assets/bride.jpg'
import groomPhoto from '../assets/WhatsApp Image 2026-09-20 at 10.56.05.jpeg'

const couple = [
  {
    role: 'Bride', name: 'Katyayani', photo: bridePhoto,
    bio: 'Katyayani radiates grace and warmth in everything she does. Her laughter lights up every room and her kindness touches every heart.',
    city: 'Hyderabad, Telangana', side: 'left',
  },
  {
    role: 'Groom', name: 'Siva Teja', photo: groomPhoto,
    bio: 'Siva Teja brings an effortless energy to every gathering and always knows how to make an ocassion memorable. He is a man of integrity and compassion, and his presence is a gift to all who know him.',
    city: 'Hyderabad, Telangana', side: 'right',
  },
]
function CoupleCard({ person }) {
  return <div data-animate={person.side} className="couple-card">
    <div className="couple-photo"><div className="couple-frame" /><img src={person.photo} alt={person.name} /></div>
    <span className="role-tag">{person.role}</span>
    <h3>{person.name}</h3>
    <p className="couple-city">{person.city}</p>
    <p className="couple-bio">"{person.bio}"</p>
  </div>
}
export default function MeetCouple() {
  return <section id="meet-the-couple" className="couple-section">
    <div className="couple-inner">
      <div data-animate className="section-heading light-on-cream">
        <p className="section-kicker"><span />The Happy Couple<span /></p>
        <h2>Meet The Couple</h2><div className="heading-rule" />
      </div>
      <div className="couple-grid">{couple.map(p => <CoupleCard key={p.role} person={p} />)}</div>
      <div data-animate className="together-quote">"Together with our families, we invite you to celebrate the beginning of Katyayani &amp; Siva Teja's forever."</div>
    </div>
  </section>
}
