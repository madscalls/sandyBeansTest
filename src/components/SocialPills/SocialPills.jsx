import { LINKS } from '../../data/links.js'
import { TikTokIcon, InstagramIcon, FacebookIcon } from '../Icons/Icons.jsx'
import './SocialPills.css'

const PILLS = [
  { key: 'tt', href: LINKS.tiktok, Icon: TikTokIcon, label: 'TikTok' },
  { key: 'ig', href: LINKS.instagram, Icon: InstagramIcon, label: 'Instagram' },
  { key: 'fb', href: LINKS.facebook, Icon: FacebookIcon, label: 'Facebook' },
]

/* Small social buttons for the top of the page, same colors as the tiles in Social. */
export default function SocialPills() {
  return (
    <nav className="social-pills" aria-label="Sandy Beans on social media">
      {PILLS.map(({ key, href, Icon, label }) => (
        <a key={key} className={`social-pill social-pill--${key}`} href={href} target="_blank" rel="noopener noreferrer">
          <Icon />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  )
}
