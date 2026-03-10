import { Badge } from "@/components/ui/badge";
import { Lesson } from "@prisma/client";

export type LessonItemProps = {
  lesson: Lesson;
};

export const LessonItem = (props: LessonItemProps) => {
  return (
    <div className="flex items-center justify-between border rounded border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
      <div>
        <h3 className="text-lg font-medium">{props.lesson.title}</h3>
      </div>
      <Badge variant="default">{props.lesson.state} min</Badge>
    </div>
  );
};
