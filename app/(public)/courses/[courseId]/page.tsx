import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getPublicCourse } from "./course.query";
import { Course } from "./Course";
import { Separator } from "@/components/ui/separator";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const session = await auth();
  const { courseId } = await params;

  const course = await getPublicCourse({
    courseId,
    userId: session?.user?.id,
  });

  if (!course) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-6">
      <h1 className="text-2xl">Course</h1>
      <Separator />
      <Course course={course} />
    </div>
  );
}
