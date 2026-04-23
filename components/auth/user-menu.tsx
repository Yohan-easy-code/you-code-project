import { auth } from "@/auth";
import { SignOut } from "@/components/auth/signout-button";
import { SafeImage } from "@/components/ui/safe-image";

export async function UserMenu() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-3">
      {session.user.image ? (
        <SafeImage
          src={session.user.image}
          fallbackSrc="/placeholder-course.svg"
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
