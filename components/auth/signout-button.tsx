import { signOut } from "@/lib/auth/auth";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" variant="outline" className="">
        <LogOut />
        Logout
      </Button>
    </form>
  );
}
