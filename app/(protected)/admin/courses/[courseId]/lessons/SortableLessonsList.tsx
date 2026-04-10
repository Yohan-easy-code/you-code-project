"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Lesson } from "@prisma/client";
import { LessonItem, LessonItemSortable } from "./AdminLessonItem";
import { saveLessonMove } from "./lessons.action";

type SortableLessonsListProps = {
  lessons: Lesson[];
};

export default function SortableLessonsList({
  lessons,
}: SortableLessonsListProps) {
  const [items, setItems] = useState(lessons);
  const [isDragging, setIsDragging] = useState(false);
  const [wasDragging, setWasDragging] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const sortableListId = `course-lessons-${lessons[0]?.courseId ?? "empty"}`;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setItems(lessons);
  }, [lessons]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldItems = items;
    const oldIndex = oldItems.findIndex((item) => item.id === active.id);
    const newIndex = oldItems.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const nextItems = arrayMove(oldItems, oldIndex, newIndex);
    const movedItem = nextItems[newIndex];
    const upItem = nextItems[newIndex - 1];
    const downItem = nextItems[newIndex + 1];

    setItems(nextItems);

    const result = await saveLessonMove({
      lessonId: movedItem.id,
      upItemRank: upItem?.rank,
      downItemRank: downItem?.rank,
      orderedLessonIds: nextItems.map((item) => item.id),
    });

    if (result?.serverError || result?.validationErrors) {
      setItems(oldItems);
      return;
    }

    const newRank = result?.data;

    if (newRank) {
      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === movedItem.id ? { ...item, rank: newRank } : item,
        ),
      );
    }
  }

  if (!hasMounted) {
    return (
      <div className="flex flex-col gap-2">
        {items.map((lesson) => (
          <LessonItem key={lesson.id} lesson={lesson} />
        ))}
      </div>
    );
  }

  return (
    <DndContext
      id={sortableListId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={() => {
        setIsDragging(true);
        setWasDragging(true);
      }}
      onDragEnd={(event) => {
        setIsDragging(false);
        void handleDragEnd(event);

        // reset après un petit délai
        setTimeout(() => setWasDragging(false), 200);
      }}
    >
      <SortableContext
        id={`${sortableListId}-sortable`}
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {items.map((lesson) => (
            <LessonItemSortable
              key={lesson.id}
              lesson={lesson}
              isDragging={isDragging}
              wasDragging={wasDragging}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
