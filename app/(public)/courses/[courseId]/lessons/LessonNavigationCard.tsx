"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PanelLeftClose } from "lucide-react";
import { LessonItem } from "../LessonItem";
import {
  useLessonNavigationState,
  useLessonNavigationStore,
} from "./lesson-navigation.store";
import { CourseType } from "../course.query";
import { cn } from "@/lib/utils";

export default function LessonNavigationCard({
  course,
  className,
}: {
  course: CourseType;
  className?: string;
}) {
  const setState = useLessonNavigationStore((s) => s.setState);
  const state = useLessonNavigationState();

  const navigationItems = (
    <div className="flex flex-col gap-2.5">
      {course.lessons.map((lesson) => (
        <LessonItem key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );

  if (state === "sticky") {
    return (
      <Card
        className={cn(
          "hidden w-full shrink-0 overflow-hidden border-border lg:sticky lg:top-24 lg:flex lg:w-[30%] lg:max-w-sm lg:min-w-[18rem] lg:flex-col",
          className,
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between gap-3 border-b pb-4 space-y-0">
          <CardTitle>Lessons</CardTitle>
          <Button
            type="button"
            onClick={() => setState("close")}
            size="icon"
            variant="ghost"
            className="ml-auto"
            aria-label="Close lessons navigation"
          >
            <PanelLeftClose className="size-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 pt-0">{navigationItems}</CardContent>
      </Card>
    );
  }

  return (
    <Sheet
      open={state === "open"}
      onOpenChange={(open) => setState(open ? "open" : "close")}
    >
      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-[88vw] max-w-sm gap-0 border-r bg-background p-0"
      >
        <SheetHeader className="flex flex-row items-center justify-between gap-3 border-b p-4 space-y-0 text-left">
          <SheetTitle>Lessons</SheetTitle>
          <Button
            type="button"
            onClick={() => setState("close")}
            size="icon"
            variant="ghost"
            className="ml-auto"
            aria-label="Close lessons navigation"
          >
            <PanelLeftClose className="size-4" />
          </Button>
        </SheetHeader>

        <div
          className="flex-1 overflow-y-auto p-4"
          onClick={() => setState("close")}
        >
          {navigationItems}
        </div>
      </SheetContent>
    </Sheet>
  );
}
