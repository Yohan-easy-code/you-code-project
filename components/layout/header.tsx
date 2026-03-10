import Link from "next/link";
import { AuthSection } from "@/components/auth/auth-section";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-18 items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo-text.png"
            width={140}
            height={32}
            alt="YouCode logo"
            className="m-10"
            priority
          />
        </Link>
        <Link href={"/explorer"}>Explorer</Link>
        <Link href={"/courses"}>Courses</Link>

        {/* AUTH */}
        <div className="flex items-center gap-4">
          <AuthSection />
        </div>
      </div>
    </header>
  );
}
