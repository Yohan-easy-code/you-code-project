import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm text-muted-foreground">Erreur 404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Page introuvable
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        La page que tu cherches n’existe pas, ou tu n’y as pas accès.
      </p>

      <div className="mt-6 flex gap-3">
        <Button asChild>
          <Link href="/">Retour à l’accueil</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/account">Mon compte</Link>
        </Button>
      </div>
    </div>
  );
}
