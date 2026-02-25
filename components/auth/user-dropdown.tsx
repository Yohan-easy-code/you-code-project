"use client";

import * as React from "react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

type Props = {
  name: string;
  email: string;
  image: string;
};

export function UserDropdown({ name, email, image }: Props) {
  const [open, setOpen] = React.useState(false);

  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "U";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-sm font-medium">{name}</div>
              {email ? <div className="text-xs opacity-70">{email}</div> : null}
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <Link href={"/account"}>Mon compte</Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Déconnexion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Se déconnecter ?</AlertDialogTitle>
            <AlertDialogDescription>
              Es-tu sûr de vouloir te déconnecter ? Tu devras te reconnecter
              pour accéder à ton compte.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={() => signOut({ callbackUrl: "/" })}>
              Se déconnecter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
