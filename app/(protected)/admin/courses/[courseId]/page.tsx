import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) notFound();

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold">{course.title}</h1>
      <p className="text-muted-foreground">{course.id}</p>
      <Button variant="default" asChild>
        <Link href="/admin/courses">Mes cours</Link>
      </Button>
    </div>
  );
}
