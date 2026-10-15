import { LINKS } from '../../data/links.js'
import { TikTokIcon, InstagramIcon, FacebookIcon } from '../Icons/Icons.jsx'
import './Social.css'

const TILES = [
  { key: 'tt', href: LINKS.tiktok, Icon: TikTokIcon, title: 'TikTok', text: 'Behind the window: drink builds, new flavors and life on the road.', go: 'Watch on TikTok →' },
  { key: 'ig', href: LINKS.instagram, Icon: InstagramIcon, title: 'Instagram', text: 'Drink photos, the weekly lineup and stories from each stop.', go: '@sandybeanscoffeellc →' },
  { key: 'fb', href: LINKS.facebook, Icon: FacebookIcon, title: 'Facebook', text: 'Event listings, community markets and messages for bookings.', go: 'Sandy Beans Coffee LLC →' },
]

export default function Social() {
  return (
    <section id="follow" className="social">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">Same-day updates</span>
            <h2>follow the truck.</h2>
            <p>Weather calls, sold-out specials and surprise pop-ups get posted here first.</p>
          </div>
        </div>

        <div className="social__grid">
          {TILES.map(({ key, href, Icon, title, text, go }) => (
            <a key={key} className={`soc soc--${key}`} href={href} target="_blank" rel="noopener noreferrer">
              <span className="label soc__label">Sandy Beans Coffee</span>
              <span className="soc__icon"><Icon /></span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="soc__go">{go}</span>
            </a>
          ))}
        </div>

        <div className="book">
          <div>
            <h3>bring the truck to you</h3>
            <p>Birthdays, office mornings, school events and markets around North Port.</p>
          </div>
          <a className="btn" href={LINKS.facebook} target="_blank" rel="noopener noreferrer">Message us to book</a>
        </div>
      </div>
    </section>
  )
}
