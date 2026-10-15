import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import './ShellBurst.css'

/*
  Teal scallop shells (like the ones in her logo) drift outward from behind the logo.
  anchorRef: the element the shells radiate from (the logo).
  ref.burst(): sends out a quick ring of extra shells (used when the logo is tapped).
*/
const ShellBurst = forwardRef(function ShellBurst({ anchorRef }, ref) {
  const canvasRef = useRef(null)
  const burstRef = useRef(() => {})

  useImperativeHandle(ref, () => ({ burst: () => burstRef.current() }), [])

  useEffect(() => {
    const cv = canvasRef.current
    const anchor = anchorRef.current
    if (!cv || !anchor) return
    const ctx = cv.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W, H, cx, cy, R, maxD
    let shells = []
    let raf = 0
    let speed = 1 // global speed multiplier (higher for the opening burst)
    let alive = true
    const timers = []

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = cv.clientWidth
      H = cv.clientHeight
      cv.width = W * dpr
      cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const hr = cv.getBoundingClientRect()
      const lr = anchor.getBoundingClientRect()
      cx = lr.left - hr.left + lr.width / 2
      cy = lr.top - hr.top + lr.height / 2
      R = lr.width / 2 || 120
      maxD = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy))
    }

    function newShell(spread) {
      return {
        a: Math.random() * Math.PI * 2,
        d: spread ? R * 0.6 + Math.random() * (maxD - R * 0.6) : R * 0.6,
        sp: 0.22 + Math.random() * 0.3,
        r: 20 + Math.random() * 14,
        rot: Math.random() * 6.28,
        vr: (Math.random() - 0.5) * 0.02,
        wob: Math.random() * 6.28,
      }
    }

    function shellPath(r) {
      const oy = r * 0.42, Rr = r * 1.02, a0 = Math.PI * 1.13, a1 = Math.PI * 1.87, N = 6
      ctx.beginPath()
      ctx.moveTo(-r * 0.16, oy)
      ctx.lineTo(Math.cos(a0) * Rr, oy + Math.sin(a0) * Rr)
      for (let i = 1; i <= N; i++) {
        const a = a0 + ((a1 - a0) * i) / N
        const am = a0 + ((a1 - a0) * (i - 0.5)) / N
        ctx.quadraticCurveTo(Math.cos(am) * Rr * 1.13, oy + Math.sin(am) * Rr * 1.13, Math.cos(a) * Rr, oy + Math.sin(a) * Rr)
      }
      ctx.lineTo(r * 0.16, oy)
      ctx.lineTo(r * 0.34, oy + r * 0.06)
      ctx.lineTo(r * 0.2, oy + r * 0.3)
      ctx.lineTo(-r * 0.2, oy + r * 0.3)
      ctx.lineTo(-r * 0.34, oy + r * 0.06)
      ctx.closePath()
    }

    function drawShell(r) {
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      shellPath(r)
      ctx.strokeStyle = '#FFFFFF'
      ctx.lineWidth = r * 0.42
      ctx.stroke()
      ctx.fillStyle = '#FFF8EE'
      ctx.fill()
      ctx.strokeStyle = '#4CBDB5'
      ctx.lineWidth = Math.max(1.6, r * 0.14)
      ctx.stroke()
      const oy = r * 0.42, a0 = Math.PI * 1.13, a1 = Math.PI * 1.87
      ctx.lineWidth = Math.max(1.3, r * 0.11)
      for (let i = 1; i < 6; i++) {
        const a = a0 + ((a1 - a0) * i) / 6
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * r * 0.12, oy + Math.sin(a) * r * 0.12)
        ctx.lineTo(Math.cos(a) * r * 0.86, oy + Math.sin(a) * r * 0.86)
        ctx.stroke()
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      for (const p of shells) {
        const t = (p.d - R * 0.6) / (maxD - R * 0.6) // 0 at the logo edge, 1 at the page edge
        const alpha = Math.min(1, t * 6) * (1 - t) * 0.85
        const ang = p.a + Math.sin(p.wob) * 0.05
        ctx.save()
        ctx.globalAlpha = Math.max(0, alpha)
        ctx.translate(cx + Math.cos(ang) * p.d, cy + Math.sin(ang) * p.d)
        ctx.rotate(p.rot)
        drawShell(p.r * (0.55 + t * 0.6))
        ctx.restore()
      }
    }

    function tick() {
      if (!alive) return
      for (const p of shells) {
        p.d += p.sp * speed * (1 + (p.d / maxD) * 1.2) * (p.boost || 1)
        p.rot += p.vr * 0.6
        p.wob += 0.012
        if (p.boost > 1) p.boost = Math.max(1, p.boost * 0.975)
        if (p.d > maxD) {
          if (p.extra) p.dead = true
          else Object.assign(p, newShell(false))
        }
      }
      shells = shells.filter((p) => !p.dead)
      draw()
      raf = requestAnimationFrame(tick)
    }

    function start() {
      size()
      shells = Array.from({ length: W < 600 ? 8 : 13 }, () => newShell(reduce))
      if (reduce) {
        shells.forEach((p) => { p.d = R * 0.8 + Math.random() * (maxD * 0.5) })
        draw()
        return
      }
      speed = 2.4 // quick opening burst...
      timers.push(setTimeout(() => { speed = 1 }, 1400)) // ...then a calm cascade
      raf = requestAnimationFrame(tick)
    }

    burstRef.current = () => {
      if (reduce) return
      for (let i = 0; i < 6; i++) {
        const p = newShell(false)
        p.a = (i / 6) * Math.PI * 2 + Math.random() * 0.4
        p.boost = 7
        p.extra = true
        shells.push(p)
      }
    }

    const onResize = () => { size(); if (reduce) draw() }
    if (anchor.complete) start()
    else anchor.addEventListener('load', start, { once: true })
    window.addEventListener('resize', onResize)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      anchor.removeEventListener('load', start)
      window.removeEventListener('resize', onResize)
    }
  }, [anchorRef])

  return <canvas ref={canvasRef} className="shell-burst" aria-hidden="true" />
})

export default ShellBurst
