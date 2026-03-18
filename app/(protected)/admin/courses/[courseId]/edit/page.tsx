import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/auth";
import { CourseForm } from "./CourseForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return notFound();
  }
  const { courseId } = await params;

  const course = await prisma.course.findFirst({
    where:
      session.user.role === "ADMIN"
        ? { id: courseId }
        : { id: courseId, creatorId: session.user.id },
  });

  if (!course) {
    return notFound();
  }

  return (
    <div className="mx-auto flex flex-col w-full max-w-3xl flex-1 items-center justify-center px-4 py-6 gap-3">
      <CourseForm
        initialValues={{
          title: course.title,
          imageUrl: course.imageUrl ?? "",
          presentation: course.presentation ?? "",
          state: course.state,
        }}
        courseId={course.id}
      />

      <Button className="w-full" variant={"outline"}>
        <Link href={`/admin/courses/${courseId}/`}>Back</Link>
      </Button>
    </div>
  );
}
