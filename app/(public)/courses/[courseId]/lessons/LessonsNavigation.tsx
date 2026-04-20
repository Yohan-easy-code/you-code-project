import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireUser } from "@/lib/auth/guards";
import { PanelLeftClose } from "lucide-react";
import { getPublicCourse } from "../course.query";
import { LessonItem } from "../LessonItem";

export type LessonsNavigationProps = {
  courseId: string;
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
    <Card className="lg:max-w-xs flex-1 h-fit">
      <CardHeader className="flex justify-between">
        <CardTitle>{course.title}</CardTitle>
        <PanelLeftClose />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {course.lessons.map((lesson) => (
          <LessonItem lesson={lesson} key={lesson.id} />
        ))}
      </CardContent>
    </Card>
  );
};
