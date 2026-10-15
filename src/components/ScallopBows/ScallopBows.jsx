import './ScallopBows.css'

// left position + resting tilt for each bow along the scalloped edge
const BOWS = [
  { left: '12%', r: '-10deg' },
  { left: '37%', r: '6deg' },
  { left: '63%', r: '-5deg' },
  { left: '88%', r: '9deg' },
]

/* Satin ribbon bow, drawn to match the bows she ties on her cups. */
function Bow({ left, r, delay }) {
  return (
    <svg className="bow" viewBox="0 0 64 60" style={{ left, '--r': r, animationDelay: delay }} aria-hidden="true">
      <path d="M28 25 L13 56 L18.5 53.5 L21 58 L33 28 Z" fill="#F3BCD0" stroke="#E39AB6" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M36 25 L51 56 L45.5 53.5 L43 58 L31 28 Z" fill="#F3BCD0" stroke="#E39AB6" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M26 30 L17 50 M38 30 L47 50" stroke="#FCE1EB" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M30 21 C24 9 11 1 4 5 C-1 9 5 22 30 27 Z M26 22.5 C21 18 15 14 11.5 14.5 C11.5 16 16 20 26 23.5 Z" fill="#F7C9DA" fillRule="evenodd" stroke="#E39AB6" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M34 21 C40 9 53 1 60 5 C65 9 59 22 34 27 Z M38 22.5 C43 18 49 14 52.5 14.5 C52.5 16 48 20 38 23.5 Z" fill="#F7C9DA" fillRule="evenodd" stroke="#E39AB6" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M27 21 C21 13 12 6 7 8" fill="none" stroke="#FDE6EE" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M37 21 C43 13 52 6 57 8" fill="none" stroke="#FDE6EE" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M27.5 19.5 C30 17.5 34 17.5 36.5 19.5 C38 23 36.5 28 32 29 C27.5 28 26 23 27.5 19.5 Z" fill="#F2B6CB" stroke="#E39AB6" strokeWidth="1.2" />
      <path d="M29.5 21 C31 20 33 20 34.5 21" fill="none" stroke="#FDE6EE" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export default function ScallopBows() {
  return (
    <div className="scallop" aria-hidden="true">
      {BOWS.map((b, i) => <Bow key={b.left} {...b} delay={i % 2 ? '0s' : '-2s'} />)}
    </div>
  )
}
