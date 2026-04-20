import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { getPublicCourse } from "@/app/(public)/courses/[courseId]/course.query";
import { Course } from "@/app/(public)/courses/[courseId]/Course";

export async function CourseWithData({ courseId }: { courseId: string }) {
  const session = await auth();

  const course = await getPublicCourse({
    courseId,
    userId: session?.user?.id,
  });

  if (!course) {
    notFound();
  }

  return <Course course={course} userId={session?.user?.id} isModal />;
}
