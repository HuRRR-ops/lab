export const categories = ['Tous', 'Applications', 'Intelligence artificielle', 'Outils', 'Expérimentations', 'Open source'] as const
export type Category = typeof categories[number]
export type Project = {
  id: string; title: string; description: string; details: string;
  categories: Category[]; technologies: string[]; status: 'Actif' | 'Expérimental' | 'Terminé' | 'En développement';
  image: string | null; visual: 'neural' | 'terminal' | 'wave'; github: string | null; demo: string | null; fictional: boolean;
}
export const brand = { emblem: null as string | null, github: 'https://github.com/HuRRR-ops' }
export const projects: Project[] = [
  { id: '001', title: 'NEURAL / CANVAS', description: 'Quand les mots deviennent matière.', details: 'Concept fictif d’un atelier de création visuelle guidé par le langage. Une exploration des relations entre intention humaine et image générée. Cette fiche illustre le design du laboratoire : aucune application ni démonstration n’est publiée.', categories: ['Intelligence artificielle', 'Applications'], technologies: ['React', 'TypeScript', 'IA générative'], status: 'Expérimental', image: null, visual: 'neural', github: null, demo: null, fictional: true },
  { id: '002', title: 'FLOW / ENGINE', description: 'Moins de répétition. Plus de création.', details: 'Concept fictif d’un outil pour composer des automatisations dans une interface minimale. Les technologies affichées sont illustratives et ne constituent pas une déclaration sur les outils réellement utilisés par HuRRR.', categories: ['Outils', 'Applications', 'Open source'], technologies: ['TypeScript', 'React', 'Automatisation'], status: 'En développement', image: null, visual: 'terminal', github: null, demo: null, fictional: true },
  { id: '003', title: 'ECHO / SYSTEM', description: 'Une exploration du son et de la forme.', details: 'Concept fictif d’une expérience audiovisuelle dans le navigateur. Des ondes se transforment en paysages numériques. Cet exemple de direction artistique ne correspond pas à un projet existant.', categories: ['Expérimentations'], technologies: ['Canvas', 'Web Audio', 'Creative coding'], status: 'Expérimental', image: null, visual: 'wave', github: null, demo: null, fictional: true },
]
export function asset(path: string) {
  const prefix = process.env.NODE_ENV === 'production' ? '/lab' : ''
  return path.startsWith('/') ? `${prefix}${path}` : path
}
