# YouCode

## 📸 Preview

![App Screenshot](./public/appScreenShot1.png)
![App Screenshot](./public/appScreenShot2.png)
![App Screenshot](./public/appScreenShot3.png)
![App Screenshot](./public/appScreenShot4.png)
![App Screenshot](./public/appScreenShot5.png)
![App Screenshot](./public/appScreenShot6.png)
![App Screenshot](./public/appScreenShot7.png)

## Disclaimer

J'aurais pu faire ce projet presque entièrement avec l'aide d'une IA comme GPT, Codex ou Claude Code. Le but était surtout d'apprendre, donc je n'ai pas mis en place de logique de délégation avec des fichiers comme `AGENTS.md`, et je ne me suis pas appuyé sur l'IA pour produire tout le projet de bout en bout. En revanche, l'ensemble des textes du projet a bien été rédigé ou retravaillé avec l'aide de l'IA.

## Technologies et compétences

### Vue d'ensemble

- **Base du projet** : Next.js, React, TypeScript
- **Données** : Prisma et PostgreSQL
- **Produit** : admin, cours publics et progression

### Stack technique

#### Frontend et interface

La base de l'application côté interface, navigation et rendu.

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Motion
- Lucide React

#### Backend et données

La partie serveur, la persistance et les accès aux données.

- Prisma 7
- PostgreSQL
- Next Auth 5
- Prisma Adapter
- next-safe-action
- Zod
- env-nextjs

#### Contenu et édition

Tout ce qui sert à écrire, enrichir et afficher les cours.

- MDXEditor
- next-mdx-remote
- rehype-prism-plus
- React Hook Form
- vidéo locale
- upload côté app

#### Interactions et qualité

Les outils utiles pour l'expérience, l'état local et le suivi.

- Zustand
- React Query
- dnd-kit
- Recharts
- Sonner
- Vitest
- date-fns

### Compétences travaillées

#### Structurer une application full-stack

- Organiser une app Next.js avec App Router.
- Séparer les zones publiques et protégées.
- Composer des Server Components et des Client Components.
- Garder une structure lisible malgré l'ajout de fonctionnalités.

#### Gérer la donnée et la sécurité

- Modéliser cours, leçons, inscriptions et progression.
- Travailler avec Prisma sur PostgreSQL.
- Mettre en place l'authentification avec Next Auth.
- Protéger l'accès selon les rôles et les guards.

#### Construire une expérience d'édition

- Intégrer un éditeur MDX dans l'admin.
- Ajouter du texte, des titres, du code et de la vidéo.
- Gérer l'upload local et le rendu vidéo dans les cours.
- Améliorer la lisibilité avec des fallbacks et des skeletons.

#### Travailler l'interface et les usages

- Concevoir une navigation de leçons responsive.
- Utiliser Zustand pour piloter des états d'interface.
- Construire des tableaux de bord et des graphiques simples.
- Corriger les erreurs de compilation et fiabiliser le rendu.

Pour le détail, veuillez regarder la page projet.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
