import Link from "next/link";

export function NavBar() {
  return (
    <nav className="w-64 border-r bg-background">
      <Link href="/explorer">Explorer</Link>
    </nav>
  );
}
