import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@/components/auth/signin-button";
import { UserDropdown } from "@/components/auth/user-dropdown";

export async function AuthSection() {
  const session = await auth();

  if (!session?.user) {
    return <SignInButton />;
  }

  return (
    <UserDropdown
      name={session.user.name ?? "Utilisateur"}
      email={session.user.email ?? ""}
      image={session.user.image ?? ""}
    />
  );
}
