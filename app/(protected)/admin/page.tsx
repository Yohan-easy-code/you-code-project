import Link from "next/link";
import { requireAdmin, requireUser } from "@/lib/auth/guards";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  await requireUser();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin</h1>

      <Button asChild>
        <Link href="/admin/courses">Voir mes cours</Link>
      </Button>
    </div>
  );
}
