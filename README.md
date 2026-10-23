# HuRRR Lab

Le laboratoire créatif de HuRRR. Portfolio de vibe coding, intelligence artificielle, applications et expérimentations numériques. Interface en français.

## Site publié

https://hurrr-ops.github.io/lab/

## Installation dans le dépôt existant

1. Transférer le contenu de cette archive (les fichiers et dossiers, **pas le ZIP lui-même**) à la racine de `HuRRR-ops/lab`, sur la branche `main`. Conserver un seul `README.md` (celui-ci remplace le README provisoire).
2. Dans **Settings > Pages > Build and deployment**, sélectionner **GitHub Actions** comme source de publication.
3. Le workflow `.github/workflows/deploy.yml` installe les dépendances, construit le site et publie les fichiers générés dans `out/` à chaque modification de `main`.

Le dépôt reste public. Aucun hébergement Next.js ou Vercel n'est nécessaire en production.

## Modifier les projets

La galerie est définie dans `lib/projects.ts`. Modifier les objets du tableau `projects`. Pour ajouter un projet réel : mettre `fictional: false`, renseigner ses liens (`github`, `demo`), la description et les technologies. Placer éventuellement une capture dans `public/images/`, puis lui donner un chemin comme `/images/projet.webp`.

**À la livraison : les trois projets visibles sont des exemples fictifs**, pas tes vrais projets. Retire ou remplace-les avant de présenter le portfolio comme un catalogue de réalisations.

Pour le logo HuRRR, déposer son image dans `public/images/`, puis mettre son chemin dans `brand.emblem` dans `lib/projects.ts`.

## Pourquoi le 404 dans l'aperçu v0 ?

Une ancienne configuration appliquait `basePath: '/lab'` aussi au serveur de développement. Ainsi, l'aperçu v0 à la racine `/` affichait 404 alors que le site compilé fonctionnait à `/lab/`.

La configuration corrigée utilise `/` en développement (`next dev`) et `/lab/` en production (`next build`). Les images sont préfixées de la même manière.

Si v0 affiche encore `TypeError: routeModule.ensureInstrumentation is not a function`, cette erreur vient d'un environnement de développement Next.js mélangeant des modules de versions différentes. Il faut redémarrer/réinstaller les dépendances dans cet environnement ; l'archive source ne contient pas de `node_modules` ou de `.next/` anciens. La compilation dans GitHub Actions réinstallera proprement toutes les dépendances à partir du fichier de verrouillage.

## Développement

Prérequis : Node.js 22 et `pnpm` correspondant à la version dans `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Pour tester le site statique :

```sh
pnpm build
```

La compilation écrit le site dans `out/`. Sa structure est destinée au chemin public `/lab/`.
