'use client'
import { useEffect, useRef } from 'react'
export function LabInteractions() {
  const cursor = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)'), fine = matchMedia('(pointer: fine)')
    let frame = 0, x = -100, y = -100, lastX = x, lastY = y, previous = performance.now()
    let target: HTMLElement | null = null, magnetic: HTMLElement | null = null
    const move = (event: PointerEvent) => {
      x = event.clientX; y = event.clientY
      const el = event.target as HTMLElement
      target = el.closest<HTMLElement>('.project-card, .core-scene')
      const nextMagnetic = el.closest<HTMLElement>('.magnetic')
      if (magnetic !== nextMagnetic && magnetic) magnetic.style.transform = ''
      magnetic = nextMagnetic
      if (cursor.current) { cursor.current.dataset.active = String(Boolean(el.closest('a, button'))); cursor.current.hidden = !fine.matches || reduced.matches || Boolean(el.closest('input, textarea, [contenteditable], p, h1, h2, h3')); cursor.current.textContent = el.closest('.core-trigger') ? '+' : el.closest('.project-card') ? '↗' : '' }
      if (!frame && fine.matches && !reduced.matches) frame = requestAnimationFrame(draw)
    }
    const draw = () => {
      frame = 0
      const now = performance.now(), velocity = Math.min(1, Math.hypot(x - lastX, y - lastY) / Math.max(1, now - previous) / 2)
      previous = now; lastX = x; lastY = y
      if (cursor.current) cursor.current.style.transform = `translate3d(${x}px,${y}px,0) scale(${1 + velocity * .35})`
      if (target) { const r = target.getBoundingClientRect(), px = (x - r.left) / r.width, py = (y - r.top) / r.height; const coordinates = target.querySelector('.scene-index'); if (coordinates) coordinates.textContent = `X ${px.toFixed(2)} / Y ${py.toFixed(2)} · NOYAU 001`; target.style.setProperty('--mx', `${px * 100}%`); target.style.setProperty('--my', `${py * 100}%`); target.style.setProperty('--tilt-x', `${(.5 - py) * 5}deg`); target.style.setProperty('--tilt-y', `${(px - .5) * 5}deg`) }
      if (magnetic) { const r = magnetic.getBoundingClientRect(); magnetic.style.transform = `translate(${(x - r.left - r.width / 2) * .12}px,${(y - r.top - r.height / 2) * .18}px)` }
    }
    const leave = () => { if (cursor.current) cursor.current.hidden = true; if (magnetic) magnetic.style.transform = '' }
    document.addEventListener('pointermove', move, { passive: true }); document.addEventListener('pointerleave', leave)
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); if (entry.target.id) document.documentElement.dataset.labSection = entry.target.id } }) }, { threshold: .12 })
    document.querySelectorAll('.section, .pillar').forEach(el => { el.classList.add('reveal-ready'); observer.observe(el) })
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); document.querySelectorAll('.reveal-ready').forEach(el => el.classList.remove('reveal-ready')); if (magnetic) magnetic.style.transform = '' }
  }, [])
  return <div className="lab-cursor" ref={cursor} hidden aria-hidden="true" />
}
