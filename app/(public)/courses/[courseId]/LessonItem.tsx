import { CheckCircle, Circle, CircleDashed } from "lucide-react";
import Link from "next/link";
import { CourseLessonItem } from "./course.query";
import { Card, CardContent } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";

export type LessonItemProps = {
  lesson: CourseLessonItem;
};

export const getLessonIcon = (status: CourseLessonItem["progress"]) => {
  if (status === "COMPLETED") {
    return CheckCircle;
  }

  if (status === "IN_PROGRESS") {
    return Circle;
  }

  return CircleDashed;
};

export const LessonItem = ({ lesson }: LessonItemProps) => {
  const Icon = getLessonIcon(lesson.progress);
  return (
    <Link href={`/courses/${lesson.courseId}/lessons/${lesson.id}`}>
      <div className="flex items-center gap-3 rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
        <h3 className="flex-1">{lesson.title}</h3>
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
