"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChartColumn,
  Database,
  FileText,
  LayoutDashboard,
  PenTool,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type TechnologyGroup = {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
};

type SkillGroup = {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
};

const projectHighlights = [
  {
    label: "Base du projet",
    value: "Next.js, React, TypeScript",
  },
  {
    label: "Données",
    value: "Prisma et PostgreSQL",
  },
  {
    label: "Produit",
    value: "Admin, cours publics et progression",
  },
];

const technologyGroups: TechnologyGroup[] = [
  {
    icon: LayoutDashboard,
    title: "Frontend et interface",
    description:
      "La base de l'application côté interface, navigation et rendu.",
    items: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Motion",
      "Lucide React",
    ],
  },
  {
    icon: Database,
    title: "Backend et données",
    description:
      "La partie serveur, la persistance et les accès aux données.",
    items: [
      "Prisma 7",
      "PostgreSQL",
      "Next Auth 5",
      "Prisma Adapter",
      "next-safe-action",
      "Zod",
      "env-nextjs",
    ],
  },
  {
    icon: FileText,
    title: "Contenu et édition",
    description:
      "Tout ce qui sert à écrire, enrichir et afficher les cours.",
    items: [
      "MDXEditor",
      "next-mdx-remote",
      "rehype-prism-plus",
      "React Hook Form",
      "vidéo locale",
      "upload côté app",
    ],
  },
  {
    icon: ChartColumn,
    title: "Interactions et qualité",
    description:
      "Les outils utiles pour l'expérience, l'état local et le suivi.",
    items: [
      "Zustand",
      "React Query",
      "dnd-kit",
      "Recharts",
      "Sonner",
      "Vitest",
      "date-fns",
    ],
  },
];

const skillGroups: SkillGroup[] = [
  {
    icon: BookOpen,
    title: "Structurer une application full-stack",
    description:
      "Le projet a permis de travailler une structure claire entre pages publiques, espace admin et logique serveur.",
    points: [
      "Organiser une app Next.js avec App Router.",
      "Séparer les zones publiques et protégées.",
      "Composer des Server Components et des Client Components.",
      "Garder une structure lisible malgré l'ajout de fonctionnalités.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Gérer la donnée et la sécurité",
    description:
      "Une partie importante du travail a consisté à poser un socle fiable côté base de données et authentification.",
    points: [
      "Modéliser cours, leçons, inscriptions et progression.",
      "Travailler avec Prisma sur PostgreSQL.",
      "Mettre en place l'authentification avec Next Auth.",
      "Protéger l'accès selon les rôles et les guards.",
    ],
  },
  {
    icon: PenTool,
    title: "Construire une expérience d'édition",
    description:
      "Le projet ne s'arrête pas à l'affichage : il inclut une vraie zone d'administration et d'écriture.",
    points: [
      "Intégrer un éditeur MDX dans l'admin.",
      "Ajouter du texte, des titres, du code et de la vidéo.",
      "Gérer l'upload local et le rendu vidéo dans les cours.",
      "Améliorer la lisibilité avec des fallbacks et des skeletons.",
    ],
  },
  {
    icon: Rocket,
    title: "Travailler l'interface et les usages",
    description:
      "Le projet a aussi servi à renforcer la partie produit et le soin apporté à l'interface.",
    points: [
      "Concevoir une navigation de leçons responsive.",
      "Utiliser Zustand pour piloter des états d'interface.",
      "Construire des tableaux de bord et des graphiques simples.",
      "Corriger les erreurs de compilation et fiabiliser le rendu.",
    ],
  },
];

export default function ProjectPage() {
  const shouldReduceMotion = useReducedMotion();

  const revealProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
      };

  const getCardRevealProps = (index: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.18 },
          transition: {
            duration: 0.38,
            delay: index * 0.05,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  const buttonMotionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { y: -2 },
        whileTap: { scale: 0.99 },
        transition: { duration: 0.15, ease: "easeOut" as const },
      };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-16 lg:px-6 lg:py-20">
      <section className="space-y-8">
        <motion.div className="max-w-3xl space-y-4" {...revealProps}>
          <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Sparkles className="size-3.5" />
            Vue d&apos;ensemble du projet
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Technologies utilisées et compétences développées
          </h1>
          <p className="text-base leading-7 text-muted-foreground sm:text-lg">
            Cette page regroupe le stack réellement utilisé dans l&apos;application
            et ce que le projet a permis de travailler, côté technique comme
            côté produit.
          </p>
        </motion.div>

        <motion.div {...revealProps}>
          <Card className="border-border/70 bg-muted/20 shadow-sm">
            <CardContent className="space-y-3 p-6">
              <Badge variant="outline" className="w-fit">
                Disclaimer
              </Badge>
              <p className="max-w-4xl text-sm leading-7 text-muted-foreground">
                J&apos;aurais pu faire ce projet presque entièrement avec l&apos;aide
                d&apos;une IA comme GPT, Codex ou Claude Code. Le but était surtout
                d&apos;apprendre, donc je n&apos;ai pas mis en place de logique de
                délégation avec des fichiers comme <span className="font-medium text-foreground">AGENTS.md</span>,
                et je ne me suis pas appuyé sur l&apos;IA pour produire tout le
                projet de bout en bout. En revanche, l&apos;ensemble des textes du
                projet a bien été rédigé ou retravaillé avec l&apos;aide de l&apos;IA.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {projectHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.label}
              className="h-full"
              {...getCardRevealProps(index)}
            >
              <Card className="h-full border-border/70 shadow-sm">
                <CardHeader className="space-y-2">
                  <CardDescription className="text-xs uppercase tracking-[0.18em]">
                    {highlight.label}
                  </CardDescription>
                  <CardTitle className="text-xl leading-tight">
                    {highlight.value}
                  </CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <motion.div className="space-y-3" {...revealProps}>
          <Badge variant="outline" className="w-fit">
            Technologies
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight">
            Le stack utilisé dans le projet
          </h2>
          <p className="max-w-3xl text-muted-foreground">
            Les technos ci-dessous viennent directement de la structure du
            projet et des fonctionnalités en place dans l&apos;application.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-2">
          {technologyGroups.map((group, index) => (
            <motion.div
              key={group.title}
              className="h-full"
              {...getCardRevealProps(index)}
            >
              <Card className="h-full border-border/70 shadow-sm">
                <CardHeader className="space-y-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-foreground">
                    <group.icon className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{group.title}</CardTitle>
                    <CardDescription className="text-sm leading-6">
                      {group.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="secondary" className="px-3 py-1">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-8">
        <motion.div className="space-y-3" {...revealProps}>
          <Badge variant="outline" className="w-fit">
            Compétences
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight">
            Ce que le projet a permis d&apos;apprendre
          </h2>
          <p className="max-w-3xl text-muted-foreground">
            L&apos;objectif ici n&apos;est pas de lister tout ce qui a été touché,
            mais de rendre visibles les acquis les plus concrets.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-2">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              className="h-full"
              {...getCardRevealProps(index)}
            >
              <Card className="h-full border-border/70 shadow-sm">
                <CardHeader className="space-y-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-foreground">
                    <group.icon className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{group.title}</CardTitle>
                    <CardDescription className="text-sm leading-6">
                      {group.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                    {group.points.map((point) => (
                      <li key={point} className="list-disc ml-4 marker:text-foreground">
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <motion.div {...revealProps}>
          <Card className="border-border/70 bg-gradient-to-br from-card via-card to-muted/20 shadow-sm">
            <CardContent className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-3">
                <Badge variant="secondary">Navigation</Badge>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Retourner à l&apos;accueil ou continuer la visite
                </h2>
                <p className="text-muted-foreground">
                  Cette page sert de récap technique. Tu peux maintenant revenir
                  à l&apos;accueil ou consulter directement les cours publics.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.div {...buttonMotionProps}>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/">
                      <ArrowLeft className="size-4" />
                      Retour à l&apos;accueil
                    </Link>
                  </Button>
                </motion.div>
                <motion.div {...buttonMotionProps}>
                  <Button asChild size="lg">
                    <Link href="/courses">
                      Voir les cours
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
