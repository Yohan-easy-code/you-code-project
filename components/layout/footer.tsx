import Image from "next/image";
import Link from "next/link";

const usefulLinks = [
  { href: "/", label: "Home" },
  { href: "/explorer", label: "Explorer" },
  { href: "/courses", label: "Courses" },
  { href: "/account", label: "Mon compte" },
];

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions legales" },
  {
    href: "/politique-de-confidentialite",
    label: "Confidentialite",
  },
  { href: "/politique-de-cookies", label: "Cookies" },
  { href: "/cgu", label: "CGU" },
];

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 lg:flex-row lg:items-start lg:justify-between lg:px-6">
        <div className="max-w-sm space-y-3">
          <Link
            href="/"
            className="inline-flex items-center transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo-text.png"
              width={140}
              height={32}
              alt="YouCode logo"
              priority
            />
          </Link>
          <p className="text-sm text-muted-foreground">
            Projet de plateforme de cours pour apprendre, publier et suivre ton
            contenu dans un espace simple et structure. Il s&apos;agit uniquement
            d&apos;un projet.
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} YouCode. Tous droits reserves.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Liens utiles
            </h3>
            <nav className="flex flex-col gap-2">
              {usefulLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors hover:text-foreground text-muted-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Informations legales
            </h3>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors hover:text-foreground text-muted-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
