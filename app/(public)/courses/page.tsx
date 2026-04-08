import { Separator } from "@/components/ui/separator";
import { getUserCourses } from "@/lib/queries/admin-course";
import { CourseCard } from "@/components/courses/CourseCard";
import { CoursePaginationButton } from "@/features/pagination/PaginationButton";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { TypographyH1 } from "@/components/layout/layout";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await auth();

  if (!session?.user.id) {
    return notFound();
  }
  const sp = await searchParams;

  const page = Math.max(1, Number(sp.page ?? 1));

  const { courses, totalPage } = await getUserCourses({
    userId: session.user.id,
    page,
  });

  return (
    <div className="mx-auto mt-4 flex w-full max-w-3xl flex-col gap-4 px-4">
      <TypographyH1>Courses</TypographyH1>
      <Separator />
      <div className="grid w-full gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <CoursePaginationButton
        totalPage={totalPage}
        page={page}
        baseUrl="/courses"
      />
    </div>
  );
}
