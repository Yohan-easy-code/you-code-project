import { auth } from "@/auth";
import { notFound } from "next/navigation";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) notFound();
  if (session.user.role !== "ADMIN") notFound();
  return session;
}
