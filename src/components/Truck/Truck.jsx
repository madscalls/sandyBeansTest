import { useEffect, useRef } from 'react'
import './Truck.css'

const SHELL_XS = Array.from({ length: 13 }, (_, i) => 46 + i * 24)
const PETAL_ANGLES = [0, 72, 144, 216, 288]
const CAB_PATH = 'M360 128h48c14 0 24 8 30 20l18 34c3 6 4 12 4 18v28c0 8-6 14-14 14h-86z'
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Drives in from the left on load. Tap: zooms off to the right, then rolls back in from the left. */
export default function Truck() {
  const svgRef = useRef(null)
  const busy = useRef(false)
  const timer = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => svgRef.current?.classList.add('is-parked'), 2200) // intro fallback
    return () => { clearTimeout(t); clearTimeout(timer.current) }
  }, [])

  const go = () => {
    if (busy.current || reduceMotion()) return
    busy.current = true
    svgRef.current.classList.add('is-parked', 'is-leaving')
  }

  const onAnimationEnd = (e) => {
    const el = svgRef.current
    if (e.target !== el) return // ignore wheel / steam animations
    if (e.animationName === 'truck-roll-in') el.classList.add('is-parked')
    if (e.animationName === 'truck-zoom-off') {
      el.classList.remove('is-leaving')
      el.classList.add('is-gone')
      timer.current = setTimeout(() => {
        el.classList.remove('is-gone')
        el.classList.add('is-returning')
      }, 1000)
    }
    if (e.animationName === 'truck-back-in') {
      el.classList.remove('is-returning')
      busy.current = false
    }
  }

  return (
    <div className="truck-stage">
      <svg
        ref={svgRef}
        className="truck"
        viewBox="0 0 480 300"
        role="button"
        tabIndex={0}
        aria-label="The Sandy Beans coffee truck. Tap to send it for a spin."
        onClick={go}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go() } }}
        onAnimationEnd={onAnimationEnd}
      >
        <defs>
          <clipPath id="sb-body"><rect x="30" y="92" width="330" height="150" rx="26" /></clipPath>
          <clipPath id="sb-cab"><path d={CAB_PATH} /></clipPath>
          <g id="sb-shell" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
            <path d="M0 5 L-6 -1 Q-6 -6 -2 -7 Q0 -9 2 -7 Q6 -6 6 -1 Z" />
            <path d="M0 5V-6M0 5L-3 -5M0 5L3 -5" />
          </g>
          <pattern id="sb-wood" width="40" height="9" patternUnits="userSpaceOnUse">
            <rect width="40" height="9" fill="#C98E5A" />
            <rect y="7.5" width="40" height="1.5" fill="#A8703F" />
            <rect x="18" y="0" width="1.2" height="7.5" fill="#B57B48" />
          </pattern>
          <path id="sb-arc-top" d="M58 152 a36 36 0 0 1 72 0" />
          <path id="sb-arc-bot" d="M64 160 a30 30 0 0 0 60 0" />
        </defs>

        {/* steam */}
        <g className="truck__steam" fill="none" stroke="var(--teal)" strokeWidth="4" strokeLinecap="round">
          <path d="M226 34c-8-8 8-14 0-24" />
          <path d="M242 38c-8-8 8-14 0-24" />
        </g>

        {/* roof cup sign */}
        <path d="M212 44h44l-6 40h-32z" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
        <rect x="208" y="38" width="52" height="10" rx="5" fill="var(--teal)" stroke="var(--ink)" strokeWidth="4" />
        <circle cx="234" cy="64" r="8" fill="var(--pink)" />
        <rect x="228" y="84" width="12" height="10" fill="var(--ink)" />

        {/* body: baby pink, teal shell band on top, cedar planks below (like her trailer) */}
        <g clipPath="url(#sb-body)">
          <rect x="30" y="92" width="330" height="150" fill="var(--blush)" />
          <rect x="30" y="92" width="330" height="24" fill="#5FC4BB" />
          {SHELL_XS.map((x) => <use key={x} href="#sb-shell" x={x} y="104" />)}
          <rect x="30" y="190" width="330" height="52" fill="url(#sb-wood)" />
        </g>
        <rect x="30" y="92" width="330" height="150" rx="26" fill="none" stroke="var(--ink)" strokeWidth="5" />

        {/* cab */}
        <g clipPath="url(#sb-cab)">
          <rect x="356" y="120" width="110" height="130" fill="var(--blush)" />
          <rect x="356" y="190" width="110" height="60" fill="url(#sb-wood)" />
        </g>
        <path d={CAB_PATH} fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinejoin="round" />
        <path d="M374 140h34c8 0 13 4 17 11l14 27h-65z" fill="#E3F5F0" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
        <rect x="446" y="208" width="16" height="10" rx="3" fill="#FFE8A3" stroke="var(--ink)" strokeWidth="3" />

        {/* her logo on the side panel */}
        <text fontFamily="Georgia, serif" fontSize="11.5" fontWeight="700" fill="#FFF8EE" letterSpacing="1.4">
          <textPath href="#sb-arc-top" startOffset="50%" textAnchor="middle">SANDY BEANS</textPath>
        </text>
        <text fontFamily="Georgia, serif" fontSize="10" fontWeight="700" fill="#FFF8EE" letterSpacing="1.6">
          <textPath href="#sb-arc-bot" startOffset="50%" textAnchor="middle" dominantBaseline="hanging">COFFEE</textPath>
        </text>
        <g transform="translate(94 156) scale(1.02)">
          {PETAL_ANGLES.map((a) => (
            <g key={a} transform={`rotate(${a})`}>
              <ellipse cx="0" cy="-15" rx="7.5" ry="13" fill="#FFF8EE" stroke="#4CBDB5" strokeWidth="2.6" />
              <path d="M0 -26c-3 5 3 9 0 18" fill="none" stroke="#4CBDB5" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          ))}
          <circle r="5.5" fill="#FFF8EE" stroke="#4CBDB5" strokeWidth="2.4" />
        </g>

        {/* service window with pink awning flap, counter, menu posters */}
        <rect x="160" y="118" width="140" height="10" rx="2" fill="var(--pink)" stroke="var(--ink)" strokeWidth="3" />
        <rect x="166" y="128" width="128" height="56" fill="#3E3442" stroke="var(--ink)" strokeWidth="4" />
        <path d="M208 128v56M250 128v56" stroke="#6B5A6E" strokeWidth="3" />
        <rect x="172" y="134" width="30" height="20" rx="2" fill="#F7C3D6" opacity=".85" />
        <path d="M216 176h18l-2-14h-14z" fill="#FFFFFF" />
        <path d="M258 176h16l-2-18h-12z" fill="#5FC4BB" />
        <rect x="158" y="184" width="144" height="7" rx="2" fill="#FFF8EE" stroke="var(--ink)" strokeWidth="3" />
        <rect x="312" y="128" width="20" height="26" rx="2" fill="#FFF8EE" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="322" cy="138" r="5" fill="var(--pink)" />
        <rect x="312" y="158" width="20" height="26" rx="2" fill="#FFF8EE" stroke="var(--ink)" strokeWidth="2" />
        <path d="M316 166h12M316 171h12M316 176h8" stroke="var(--blush)" strokeWidth="2" />

        {/* wheels */}
        {[110, 390].map((cx) => (
          <g key={cx} className="truck__wheel">
            <circle cx={cx} cy="246" r="30" fill="var(--ink)" />
            <circle cx={cx} cy="246" r="13" fill="#FFFFFF" />
            <path d={`M${cx} 233v26M${cx - 13} 246h26`} stroke="var(--ink)" strokeWidth="4" />
          </g>
        ))}
      </svg>
      <div className="truck-stage__ground" aria-hidden="true" />
    </div>
  )
}
