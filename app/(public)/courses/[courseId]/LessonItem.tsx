import { CheckCircle, Circle, CircleDashed, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CourseLessonItem } from "./course.query";
import { Globe } from "lucide-react";

export type LessonItemProps = {
  lesson: CourseLessonItem;
};

export const getLessonIcon = (status: CourseLessonItem["progress"]) => {
  if (status === "COMPLETED") {
    return <CheckCircle size={16} />;
  }

  if (status === "IN_PROGRESS") {
    return <Circle size={16} />;
  }

  return <CircleDashed size={16} />;
};

export const LessonItem = ({ lesson }: LessonItemProps) => {
  return (
    <Link href={`/courses/${lesson.courseId}/lessons/${lesson.id}`}>
      <div className="flex items-center gap-3 rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
        {getLessonIcon(lesson.progress)}
        <h3 className="flex-1">{lesson.title}</h3>
        {lesson.state === "PUBLIC" ? <Globe size={16} /> : null}
      </div>
    </Link>
  );
};

export const NoLessonItem = () => {
  return (
    <Card>
      <CardContent className="flex gap-1">
        <TriangleAlert />
        <p>No lessons yet</p>
      </CardContent>
    </Card>
  );
};
