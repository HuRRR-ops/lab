'use client'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { asset, brand } from '@/lib/projects'
const links = [['accueil', 'Accueil'], ['projets', 'Projets'], ['laboratoire', 'Le laboratoire'], ['technologies', 'Technologies']]
export function Navigation() {
  const [active, setActive] = useState('accueil')
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id) }, { rootMargin: '-15% 0px -60% 0px' })
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])
  return <header className="site-header"><a href="#accueil" className="brand" aria-label="HuRRR Lab — Accueil">{brand.emblem ? <img src={asset(brand.emblem)} alt="HuRRR" width="48" height="40" /> : <>H<span>///</span></>}<span className="brand-caption">LABORATOIRE<br />NUMÉRIQUE INDÉPENDANT</span></a><nav className={open ? 'navigation is-open' : 'navigation'} id="navigation" aria-label="Navigation principale">{links.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}<a className="github-link" href={brand.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a></nav><button className="menu-toggle" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></header>
}
