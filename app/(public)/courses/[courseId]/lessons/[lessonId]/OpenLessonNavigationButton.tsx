"use client";

import { Button } from "@/components/ui/button";
import { PanelLeftOpen } from "lucide-react";
import {
  useLessonNavigationState,
  useLessonNavigationStore,
} from "../lesson-navigation.store";

export function OpenLessonNavigationButton() {
  const state = useLessonNavigationState();
  const setState = useLessonNavigationStore((s) => s.setState);

  if (state === "sticky") {
    return null;
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={() => setState("open")}
    >
      <PanelLeftOpen />
    </Button>
  );
}
