const families = [
  { side: "Katyayani's Family", emoji: 'https://fonts.gstatic.com/s/e/notoemoji/17.0/1f33f/72.png', parents: ['Chandra Sekhar', 'Subhashini'], siblings: ['Rohan'], blessing: 'Proud parents and beloved brother of the bride.', color: '#c9a96e' },
  { side: "Siva Teja's Family", emoji: 'https://fonts.gstatic.com/s/e/notoemoji/17.0/1f338/72.png', parents: ['Ravindra Babu', 'Hemavathi'], siblings: ['Sirisha'], blessing: 'Proud parents and cherished sister of the groom.', color: '#c9a96e' },
]
export default function Family() {
  return <section id="family" className="family-section">
    <div className="family-inner">
      <div data-animate className="section-heading cream-heading">
        <p className="section-kicker with-lines"><span />With their blessings<span /></p>
        <h2>Our Families</h2><div className="heading-rule" />
      </div>
      <div className="family-grid">
        {families.map((fam, i) => <div key={fam.side} data-animate={i === 0 ? 'left' : 'right'} className="family-card">
          <div className="family-top" style={{ background: fam.color }} /><img className="family-emoji" src={fam.emoji} alt="" />
          <span className="family-side" style={{ color: fam.color }}>{fam.side}</span>
          {fam.parents.map(name => <p className="parent-name" key={name}>{name}</p>)}
          {fam.siblings.map(name => <p className="sibling-name" key={name}>{name}</p>)}
          <div className="family-divider" style={{ background: fam.color }} />
          <p className="blessing" style={{ color: fam.color }}>{fam.blessing}</p>
        </div>)}
      </div>
    </div>
  </section>
}
