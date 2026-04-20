import { Suspense } from "react";
import { CourseDialog } from "./CourseDialog";
import { CourseContentSkeleton } from "./CourseContentSkeleton";
import { CourseWithData } from "./CourseWithData";

export default async function CourseModalPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return (
    <CourseDialog>
      <Suspense fallback={<CourseContentSkeleton />}>
        <CourseWithData courseId={courseId} />
      </Suspense>
    </CourseDialog>
  );
}
