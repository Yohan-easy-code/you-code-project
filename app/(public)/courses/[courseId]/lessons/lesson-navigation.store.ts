"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useMediaQuery } from "usehooks-ts";

export type LessonNavigationState = "open" | "close" | "sticky";

type LessonNavigationStore = {
  state: LessonNavigationState;
  setState: (state: LessonNavigationState) => void;
};

export const useLessonNavigationStore = create<LessonNavigationStore>()(
  persist(
    (set) => ({
      state: "sticky",
      setState: (state) => set({ state }),
    }),
    {
      name: "lesson-navigation-storage",
    },
  ),
);

export const useLessonNavigationState = (): LessonNavigationState => {
  const state = useLessonNavigationStore((s) => s.state);

  const isDesktop = useMediaQuery("(min-width: 1024px)", {
    defaultValue: true,
    initializeWithValue: false,
  });

  if (isDesktop) {
    if (state === "open") {
      return "sticky";
    }

    return state;
  }

  if (state === "sticky") {
    return "close";
  }

  return state;
};
