"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ChartColumn,
  CirclePlay,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenTool,
  Rocket,
  Sparkles,
} from "lucide-react";
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
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const featureCards = [
  {
    icon: FileText,
    title: "Créer un cours",
    description:
      "Ajoute un titre, une image, une présentation et commence à construire ton contenu.",
  },
  {
    icon: CirclePlay,
    title: "Ajouter des leçons",
    description:
      "Rédige tes leçons avec du texte, du code, des titres et des vidéos.",
  },
  {
    icon: ChartColumn,
    title: "Voir l'activité",
    description:
      "Consulte rapidement les cours, les inscriptions et quelques statistiques utiles.",
  },
  {
    icon: LayoutDashboard,
    title: "Gérer depuis l'admin",
    description:
      "Retrouve tes brouillons, tes cours publiés et tes leçons au même endroit.",
  },
];

const steps = [
  {
    icon: BookOpen,
    step: "Étape 1",
    title: "1. Crée ton cours",
    points: [
      "Renseigne le titre, l'image et la présentation.",
      "Définis l'état du cours avant publication.",
      "Prépare une base claire pour la suite.",
    ],
  },
  {
    icon: PenTool,
    step: "Étape 2",
    title: "2. Organise tes leçons",
    points: [
      "Ajoute les leçons une par une.",
      "Réorganise leur ordre selon ton plan.",
      "Complète le contenu avec texte, code et vidéo.",
    ],
  },
  {
    icon: Rocket,
    step: "Étape 3",
    title: "3. Publie ton cours",
    points: [
      "Passe le cours en publié.",
      "Rends son contenu visible dans l'application.",
      "Retrouve-le ensuite côté public et dans l'explorer.",
    ],
  },
];

export default function Page() {
  const shouldReduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [timelineScrollProgressValue, setTimelineScrollProgressValue] =
    useState(0);
  const [iconThresholds, setIconThresholds] = useState<number[]>([]);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 35%"],
  });
  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setTimelineScrollProgressValue(latest);
  });

  useEffect(() => {
    const updateThresholds = () => {
      const timelineElement = timelineRef.current;

      if (!timelineElement) {
        return;
      }

      const timelineHeight = timelineElement.offsetHeight || 1;

      setIconThresholds(
        steps.map((_, index) => {
          const stepElement = stepRefs.current[index];

          if (!stepElement) {
            return 1;
          }

          const center = stepElement.offsetTop + stepElement.offsetHeight / 2;

          return Math.min(Math.max(center / timelineHeight, 0), 1);
        }),
      );
    };

    updateThresholds();

    const resizeObserver = new ResizeObserver(updateThresholds);

    if (timelineRef.current) {
      resizeObserver.observe(timelineRef.current);
    }

    stepRefs.current.forEach((stepElement) => {
      if (stepElement) {
        resizeObserver.observe(stepElement);
      }
    });

    window.addEventListener("resize", updateThresholds);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateThresholds);
    };
  }, []);

  const revealProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      };

  const hoverActionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { y: -2, scale: 1.01 },
        whileTap: { scale: 0.99 },
        transition: { duration: 0.16, ease: "easeOut" as const },
      };

  const timelineStepProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: false, amount: 0.45 },
      };

  const getTimelineCardProps = (index: number) =>
    shouldReduceMotion
      ? {}
      : {
          variants: {
            hidden: {
              opacity: 0,
              x: index % 2 === 0 ? -64 : 64,
            },
            show: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.45,
                ease: "easeOut" as const,
              },
            },
          },
        };

  const timelineIconRevealProps = shouldReduceMotion
    ? {}
    : {
        variants: {
          hidden: {
            opacity: 0,
            scale: 0.85,
          },
          show: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.35,
              ease: "easeOut" as const,
            },
          },
        },
      };

  return (
    <main className="w-full">
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 lg:px-6 lg:py-24">
          <motion.div className="max-w-3xl space-y-6" {...revealProps}>
            <Badge variant="secondary" className="gap-2 px-3 py-1">
              <Sparkles className="size-3.5" />
              Application de gestion de cours
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Crée et gère tes cours simplement.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                YouCode permet de créer des cours, ajouter des leçons, publier
                du contenu et le consulter depuis une interface unique.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <motion.div {...hoverActionProps}>
                <Button asChild size="lg" className="sm:min-w-44">
                  <Link href="/courses">
                    Voir les cours
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div {...hoverActionProps}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="sm:min-w-44"
                >
                  <Link href="/explorer">Explorer la plateforme</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <motion.div
              className="h-full"
              {...revealProps}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <Card className="h-full border-border/70 bg-card/80 shadow-sm backdrop-blur">
                <CardHeader className="space-y-3">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <GraduationCap className="size-6" />
                    Ce que fait l&apos;application
                  </CardTitle>
                  <CardDescription className="text-base">
                    Tu peux y préparer tes cours, organiser tes leçons et suivre
                    ce qui est disponible pour les utilisateurs.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
                    <p className="text-3xl font-semibold tracking-tight">MDX</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Pour écrire le contenu des leçons.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
                    <p className="text-3xl font-semibold tracking-tight">Admin</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Pour gérer les cours et les leçons.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
                    <p className="text-3xl font-semibold tracking-tight">Public</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Pour afficher les cours publiés.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="h-full"
              {...revealProps}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 0.45, delay: 0.14, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <Card className="h-full border-border/70 shadow-sm">
                <CardHeader>
                  <CardTitle>Ce que tu peux faire</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <BookOpen className="mt-0.5 size-4 text-foreground" />
                    <p>Créer un cours avec un titre, une image et une présentation.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 size-4 text-foreground" />
                    <p>Rédiger des leçons avec titres, paragraphes, code et vidéos.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ChartColumn className="mt-0.5 size-4 text-foreground" />
                    <p>Voir quelques statistiques depuis la partie administration.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-16 lg:px-6">
        <motion.div className="flex flex-col gap-3" {...revealProps}>
          <Badge variant="outline" className="w-fit">
            Fonctionnalités
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight">
            Les fonctions principales
          </h2>
          <p className="max-w-3xl text-muted-foreground">
            L&apos;application couvre la création de cours, la gestion des
            leçons, la publication et la consultation des contenus.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="h-full"
              {...revealProps}
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 0.4,
                      delay: 0.06 * (index + 1),
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            >
              <Card className="h-full border-border/70 shadow-sm">
                <CardHeader className="space-y-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-foreground">
                    <feature.icon className="size-5" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-16 lg:px-6">
          <motion.div className="space-y-3" {...revealProps}>
            <Badge variant="outline" className="w-fit">
              Étapes
            </Badge>
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Ce que l&apos;application permet
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-center sm:text-left">
              Comment ça se passe
            </h2>
          </motion.div>

          <div ref={timelineRef} className="relative mt-4">
            <div className="absolute left-5 top-0 h-full w-1 rounded-full bg-border lg:left-1/2 lg:-translate-x-1/2" />
            <motion.div
              className="absolute left-5 top-0 h-full w-1 origin-top rounded-full bg-white lg:left-1/2 lg:-translate-x-1/2"
              style={shouldReduceMotion ? undefined : { scaleY: timelineProgress }}
            />

            <div className="flex flex-col gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  className="relative"
                  ref={(node) => {
                    stepRefs.current[index] = node;
                  }}
                  {...timelineStepProps}
                >
                  <motion.div
                    className={
                      index % 2 === 0
                        ? "ml-16 lg:ml-0 lg:mr-[calc(50%+1.5rem)]"
                        : "ml-16 lg:ml-[calc(50%+1.5rem)]"
                    }
                    {...getTimelineCardProps(index)}
                  >
                    <Card className="border-border/70 bg-card shadow-sm">
                      <CardHeader className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            {step.step}
                          </span>
                        </div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                          {step.points.map((point) => (
                            <li
                              key={point}
                              className="list-disc ml-4 marker:text-foreground"
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    className="absolute left-5 top-1/2 z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm lg:left-1/2 lg:size-12"
                    {...timelineIconRevealProps}
                  >
                    <motion.div
                      className="flex size-full items-center justify-center rounded-full border"
                      animate={
                        timelineScrollProgressValue >=
                        (iconThresholds[index] ?? 1)
                          ? {
                              backgroundColor: "#ffffff",
                              borderColor: "#ffffff",
                              color: "#ef4444",
                            }
                          : {
                              backgroundColor: "#050505",
                              borderColor: "hsl(var(--border))",
                              color: "#ffffff",
                            }
                      }
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <step.icon className="size-4" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-16 lg:px-6">
        <motion.div {...revealProps}>
          <Card className="overflow-hidden border-border/70 bg-gradient-to-br from-card via-card to-muted/30 shadow-sm">
            <CardContent className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-3">
                <Badge variant="secondary">Commencer</Badge>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Accède aux cours ou à l&apos;administration.
                </h2>
                <p className="text-muted-foreground">
                  Tu peux consulter les cours publics ou gérer ton contenu depuis
                  l&apos;espace admin.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.div {...hoverActionProps}>
                  <Button asChild size="lg">
                    <Link href="/explorer">
                      Explorer
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div {...hoverActionProps}>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/admin">Accéder à l&apos;admin</Link>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Separator />
      </section>
    </main>
  );
}
