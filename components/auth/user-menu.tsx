import { auth } from "@/auth";
import Image from "next/image";
import { SignOut } from "@/components/auth/signout-button";

export async function UserMenu() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-3">
      {session.user.image ? (
        <Image
          src={session.user.image}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : null}

      <div className="leading-tight">
        <div className="text-sm font-medium">{session.user.name}</div>
        <div className="text-xs opacity-70">{session.user.email}</div>
      </div>

      <div className="ml-auto">
        <SignOut />
      </div>
    </div>
  );
}
