import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();
  return <div className="p-6">Dashboard de {session?.user?.name}</div>;
}
