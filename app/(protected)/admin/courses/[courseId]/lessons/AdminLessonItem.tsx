"use client";

import { Badge } from "@/components/ui/badge";
import { Lesson } from "@prisma/client";
import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export type LessonItemProps = {
  lesson: Lesson;
  disableNavigation?: boolean;
};

export const LessonItem = ({
  lesson,
  disableNavigation = false,
}: LessonItemProps) => {
  return (
    <Link
      href={`/admin/courses/${lesson.courseId}/lessons/${lesson.id}`}
      className="block flex-1"
      onClick={(event) => {
        if (disableNavigation) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
    >
      <div className="flex items-center justify-between rounded-r border-y border-r border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
        <div>
          <h3 className="text-lg font-medium">{lesson.title}</h3>
        </div>

        <Badge variant="default">{lesson.state}</Badge>
      </div>
    </Link>
  );
};

type LessonItemSortableProps = {
  lesson: Lesson;
  isDragging: boolean;
  wasDragging: boolean;
};

export function LessonItemSortable({
  lesson,
  isDragging,
  wasDragging,
}: LessonItemSortableProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSorting,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-stretch ${isSorting ? "z-10 opacity-80" : ""}`}
    >
      <button
        type="button"
        className="touch-none flex items-center rounded-l border border-r-0 border-border bg-card px-3 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label={`Reorder ${lesson.title}`}
        {...attributes}
        {...listeners}
        onClick={(e) => {
          if (isDragging || wasDragging) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <GripVertical className="size-4" />
      </button>
      <LessonItem lesson={lesson} disableNavigation={isDragging || wasDragging} />
    </div>
  );
}
