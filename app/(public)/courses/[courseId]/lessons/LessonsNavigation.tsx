import { requireUser } from "@/lib/auth/guards";
import { getPublicCourse } from "../course.query";
import LessonNavigationCard from "./LessonNavigationCard";

export type LessonsNavigationProps = {
  courseId: string;
  className?: string;
};

export const LessonsNavigation = async (props: LessonsNavigationProps) => {
  const session = await requireUser();
  const course = await getPublicCourse({
    userId: session?.user.id,
    courseId: props.courseId,
  });

  if (!course) {
    return null;
  }

  return (
    <LessonNavigationCard course={course} className={props.className} />
  );
};
