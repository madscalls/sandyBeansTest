import { useRef } from 'react'
import Logo from '../Logo/Logo.jsx'
import Truck from '../Truck/Truck.jsx'
import ShellBurst from '../ShellBurst/ShellBurst.jsx'
import NextStop from '../NextStop/NextStop.jsx'
import SocialPills from '../SocialPills/SocialPills.jsx'
import './Hero.css'

export default function Hero() {
  const logoRef = useRef(null)
  const shellsRef = useRef(null)

  return (
    <header className="hero">
      <ShellBurst ref={shellsRef} anchorRef={logoRef} />
      <div className="wrap hero__inner">
        <h1 className="sr">Sandy Beans Coffee</h1>
        <Logo ref={logoRef} onBoop={() => shellsRef.current?.burst()} />
        <Truck />
        <span className="label hero__label">North Port · Venice · Sarasota · Englewood</span>
        <SocialPills />
        <p className="hero__tag">Coffee worth driving for. Fresh espresso, matcha and dirty sodas from a pink truck.</p>
        <NextStop />
      </div>
    </header>
  )
}
