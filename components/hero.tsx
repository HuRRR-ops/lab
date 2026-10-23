'use client'
import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Plus, Asterisk } from 'lucide-react'
import { asset } from '@/lib/projects'
export function Hero() {
  const scene = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const el = scene.current, c = canvas.current
    if (!el || !c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0, visible = true, width = 0, height = 0, last = 0
    const mouse = { x: 0, y: 0 }
    const points = Array.from({length: 65}, (_, i) => ({ x: ((i * 7919) % 997) / 997, y: ((i * 3571) % 991) / 991, size: i % 3 === 0 ? 1.4 : .7 }))
    const resize = () => { width = el.clientWidth; height = el.clientHeight; const dpr = Math.min(window.devicePixelRatio, 1.5); c.width = width * dpr; c.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    const draw = (time: number) => {
      if (visible && time - last > 33) { last = time; ctx.clearRect(0, 0, width, height); points.forEach((p, i) => { const x = p.x * width + Math.sin(time * .00015 + i) * (motion.matches ? 0 : 10) + mouse.x * (i % 3 + 1); const y = p.y * height + mouse.y * 2; ctx.fillStyle = i % 4 ? 'rgba(180,180,190,.32)' : 'rgba(255,23,68,.8)'; ctx.fillRect(x, y, p.size, p.size); if (i % 8 === 0) { ctx.strokeStyle = 'rgba(255,23,68,.12)'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 35, y - 16); ctx.stroke() } }) }
      if (!motion.matches) frame = requestAnimationFrame(draw)
    }
    const move = (e: PointerEvent) => { if (motion.matches) return; const r = el.getBoundingClientRect(); mouse.x = (e.clientX - r.left) / r.width - .5; mouse.y = (e.clientY - r.top) / r.height - .5; el.style.setProperty('--rx', `${mouse.y * -6}deg`); el.style.setProperty('--ry', `${mouse.x * 9}deg`) }
    const observer = new ResizeObserver(resize); observer.observe(el)
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }); intersection.observe(el)
    el.addEventListener('pointermove', move); resize(); frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); el.removeEventListener('pointermove', move) }
  }, [])
  return <section className="hero" id="accueil"><div className="hero-topline"><span className="eyebrow"><span className="status-dot" /> SYSTÈME CRÉATIF EN LIGNE</span><span className="eyebrow hero-coordinate">LAB.001 / TERRITOIRE INEXPLORÉ</span></div><div className="hero-layout"><div className="hero-copy"><p className="eyebrow red">LÀ OÙ L’INSTINCT RENCONTRE LE CODE</p><h1>HuRRR<span className="title-bottom">LAB<span className="title-dot">.</span><Asterisk className="title-star" aria-hidden="true" /></span></h1><h2>L&apos;instinct de créer.<br /><span>La puissance de l&apos;IA.</span></h2><p className="hero-description">Un laboratoire numérique où les idées prennent vie grâce au code, à l&apos;intelligence artificielle et à une bonne dose d&apos;expérimentation.</p><div className="hero-actions"><a className="primary-link" href="#projets">Explorer les projets <ArrowUpRight size={18} /></a><a className="text-link" href="#laboratoire">Découvrir le laboratoire <ArrowDownRight size={17} /></a></div></div><div className="core-scene" ref={scene}><div className="scene-grid" /><span className="scene-cross cross-one"><Plus size={18} /></span><span className="scene-cross cross-two"><Plus size={18} /></span><div className="core-object"><img src={asset('/images/core.png')} alt="Noyau abstrait de fibres métalliques entrelacées, traversées d’énergie rouge" width="1536" height="1024" fetchPriority="high" /></div><canvas ref={canvas} aria-hidden="true" /><div className="core-label"><span className="tiny-square" /><div>NOYAU CRÉATIF<span>FORME LIBRE · ÉVOLUTION CONTINUE</span></div></div><span className="scene-index">[ H—001 ]</span><span className="orbit-label">INTELLIGENCE × INSTINCT</span></div></div><div className="hero-bottom"><a href="#projets" className="scroll-cue"><span><ArrowDown size={14} /></span> DÉFILER POUR EXPLORER</a><span className="eyebrow hero-note">PAS DE LIMITES. JUSTE DES POSSIBILITÉS.</span><span className="eyebrow">01 — 04</span></div></section>
}
