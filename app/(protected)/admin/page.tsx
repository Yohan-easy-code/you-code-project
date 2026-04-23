import Link from "next/link";
import { requireUser } from "@/lib/auth/guards";
import { Button } from "@/components/ui/button";
import { QuickStats } from "./QuickStats";
import { QuickStatsSkeleton } from "./QuickStatsSkeleton";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { NewUsersStats } from "./NewUserStats";
import { NewUserStatsSkeleton } from "./NewUserStatsSkeleton";

export default async function AdminPage() {
  await requireUser();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <section className="rounded-2xl border border-border/70 bg-linear-to-br from-muted/50 via-background to-background p-6 shadow-sm lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Admin panel
            </p>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
                Pilote tes cours et ton contenu depuis un seul endroit
              </h1>
              <p className="text-base text-muted-foreground">
                Retrouve rapidement tes cours, suis les volumes de contenu et
                gère ton espace d&apos;administration sans quitter le dashboard.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="sm:min-w-44">
              <Link href="/admin/courses">
                Voir mes cours
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Suspense fallback={<QuickStatsSkeleton />}>
        <QuickStats />
      </Suspense>
      <Suspense fallback={<NewUserStatsSkeleton />}>
        <NewUsersStats />
      </Suspense>
    </div>
  );
}
