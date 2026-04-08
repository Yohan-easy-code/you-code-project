"use client";

import { useDebounceFn } from "@/app/hooks/useDebounceFn";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { forwardRef, useCallback, useState, type ComponentProps } from "react";
import { type MDXEditorMethods, type MDXEditorProps } from "@mdxeditor/editor";
import { lessonActionEditContent } from "../lesson.action";

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("./InitializedMDXEditor"), {
  // Make sure we turn SSR off
  ssr: false,
});

type ForwardRefEditorProps = MDXEditorProps & {
  lessonId: string;
  autoSaveDelayMs?: number;
};

type SyncState = "sync" | "not-sync" | "syncing";
type BadgeProps = ComponentProps<typeof Badge>;

const getBadgeVariant = (syncState: SyncState): BadgeProps["variant"] => {
  if (syncState === "not-sync") {
    return "destructive";
  }

  if (syncState === "syncing") {
    return "default";
  }

  return "secondary";
};

const getBadgeLabel = (syncState: SyncState) => {
  if (syncState === "not-sync") {
    return "Not synced";
  }

  if (syncState === "syncing") {
    return "Syncing...";
  }

  return "Synced";
};

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const ForwardRefEditor = forwardRef<
  MDXEditorMethods,
  ForwardRefEditorProps
>(
  (
    { lessonId, autoSaveDelayMs = 1000, onChange, ...props },
    ref,
  ) => {
    const [syncState, setSyncState] = useState<SyncState>("sync");

    const saveMarkdown = useCallback(
      async (markdown: string) => {
        setSyncState("syncing");

        try {
          const result = await lessonActionEditContent({
            lessonId,
            markdown,
          });

          if (result?.serverError || result?.validationErrors) {
            setSyncState("not-sync");
            return;
          }

          setSyncState("sync");
        } catch {
          setSyncState("not-sync");
        }
      },
      [lessonId],
    );

    const debouncedSaveMarkdown = useDebounceFn(
      saveMarkdown,
      autoSaveDelayMs,
    );

    const handleChange: MDXEditorProps["onChange"] = (
      markdown,
      initialMarkdownNormalize,
    ) => {
      onChange?.(markdown, initialMarkdownNormalize);

      if (!initialMarkdownNormalize) {
        setSyncState("not-sync");
        debouncedSaveMarkdown(markdown);
      }
    };

    return (
      <div className="flex flex-col gap-2">
        <Badge variant={getBadgeVariant(syncState)}>
          {getBadgeLabel(syncState)}
        </Badge>
        <Editor {...props} onChange={handleChange} editorRef={ref} />
      </div>
    );
  },
);

// TS complains without the following line
ForwardRefEditor.displayName = "ForwardRefEditor";
