import { Asterisk } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { Laboratory } from '@/components/laboratory'

export default function Page() {
  return <><a className="skip-link" href="#projets">Aller aux projets</a><Navigation /><main><Hero /><div className="manifest-strip" aria-hidden="true"><span>IMAGINER.</span><Asterisk size={25} /><span>CONSTRUIRE.</span><Asterisk size={25} /><span>EXPÉRIMENTER.</span><Asterisk size={25} /><span>RECOMMENCER.</span><Asterisk size={25} /></div><Projects /><Laboratory /></main><footer className="footer"><div className="footer-top"><a href="#accueil" className="brand">H<span>///</span></a><span className="eyebrow">TOUJOURS EN EXPÉRIMENTATION</span><a href="#accueil" className="back-top">Retour en haut ↑</a></div><div className="footer-title">HuRRR LAB<span>®</span></div><div className="footer-bottom"><p>L&apos;imagination n&apos;a pas de compilation finale.</p><a href="https://github.com/HuRRR-ops" target="_blank" rel="noreferrer">Retrouver le laboratoire sur GitHub ↗</a><span className="eyebrow">INDÉPENDANT. PAR NATURE.</span></div></footer></>
}
