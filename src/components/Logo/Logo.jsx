import { forwardRef, useEffect, useRef } from 'react'
import logoSrc from '../../assets/logo.webp'
import './Logo.css'

/* Pops in once on load. Tap/click: squishes in and jiggles back, and calls onBoop. */
const Logo = forwardRef(function Logo({ onBoop }, ref) {
  const imgRef = useRef(null)

  const setRefs = (el) => {
    imgRef.current = el
    if (typeof ref === 'function') ref(el)
    else if (ref) ref.current = el
  }

  useEffect(() => {
    // fallback in case animationend for the intro is missed
    const t = setTimeout(() => imgRef.current?.classList.add('is-popped'), 1000)
    return () => clearTimeout(t)
  }, [])

  const boop = () => {
    const el = imgRef.current
    if (!el) return
    el.classList.remove('is-boing')
    void el.offsetWidth // restart the animation
    el.classList.add('is-boing')
    onBoop?.()
  }

  const onAnimationEnd = (e) => {
    if (e.animationName === 'logo-pop') e.currentTarget.classList.add('is-popped')
    if (e.animationName === 'logo-boing') e.currentTarget.classList.remove('is-boing')
  }

  return (
    <img
      ref={setRefs}
      className="logo"
      src={logoSrc}
      alt="Sandy Beans Coffee logo"
      width="640"
      height="640"
      role="button"
      tabIndex={0}
      title="Boop!"
      onClick={boop}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); boop() } }}
      onAnimationEnd={onAnimationEnd}
      draggable="false"
    />
  )
})

export default Logo
