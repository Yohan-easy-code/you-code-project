import Link from "next/link";
import { auth } from "@/auth";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignOut } from "@/components/auth/signout-button";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) throw new Error("No session found");

  const name = session.user.name ?? "Utilisateur";
  const email = session.user.email ?? "";
  const image = session.user.image ?? "";

  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase())
      .join("") || "U";

  return (
    <div className="flex w-full justify-center items-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center gap-4 p-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{email}</p>
            <p className="truncate text-sm text-muted-foreground">{name}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 p-6 pt-0">
          <Button asChild variant="outline" className="w-full">
            <Link href="/account/settings">Modifier le profil</Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/admin">Admin</Link>
          </Button>

          <div className="flex justify-end pt-4">
            <SignOut />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
