"use client";

import { useCallback, useMemo, useState } from "react";
import type { MdxJsxFlowElement, MdxJsxAttribute } from "mdast-util-mdx-jsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type JsxEditorProps,
  useLexicalNodeRemove,
  useMdastNodeUpdater,
} from "@mdxeditor/editor";
import { Loader2, Trash2, Video } from "lucide-react";

type VideoEditorProps = JsxEditorProps & {
  lessonId: string;
};

type VideoAttributes = {
  title: string;
  src: string;
  poster: string;
};

function getAttributeValue(
  attributes: MdxJsxFlowElement["attributes"],
  name: keyof VideoAttributes,
) {
  const attribute = attributes.find(
    (item): item is MdxJsxAttribute =>
      item.type === "mdxJsxAttribute" && item.name === name,
  );

  return typeof attribute?.value === "string" ? attribute.value : "";
}

function buildAttributes(values: Partial<VideoAttributes>) {
  return Object.entries(values).reduce<MdxJsxAttribute[]>((acc, [name, value]) => {
    if (!value) {
      return acc;
    }

    acc.push({
      type: "mdxJsxAttribute",
      name,
      value,
    });

    return acc;
  }, []);
}

export function VideoEditor({ mdastNode, lessonId }: VideoEditorProps) {
  const updateMdastNode = useMdastNodeUpdater<MdxJsxFlowElement>();
  const removeNode = useLexicalNodeRemove();
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "error">(
    "idle",
  );
  const [uploadError, setUploadError] = useState<string | null>(null);

  const attrs = useMemo(
    () => ({
      title: getAttributeValue(mdastNode.attributes, "title"),
      src: getAttributeValue(mdastNode.attributes, "src"),
      poster: getAttributeValue(mdastNode.attributes, "poster"),
    }),
    [mdastNode.attributes],
  );

  const updateAttributes = useCallback(
    (values: Partial<VideoAttributes>) => {
      updateMdastNode({
        attributes: buildAttributes({
          title: values.title ?? attrs.title,
          src: values.src ?? attrs.src,
          poster: values.poster ?? attrs.poster,
        }),
      });
    },
    [attrs.poster, attrs.src, attrs.title, updateMdastNode],
  );

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Video className="size-4" />
            <span>Lesson video</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload a local video file or reference a hosted video URL stored
            directly in the lesson markdown.
          </p>
        </div>

        <div className="grid gap-3 rounded-lg border border-dashed border-border/70 bg-muted/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Upload a local video</p>
              <p className="text-sm text-muted-foreground">
                The file will be stored in the app public folder and linked in
                the lesson content.
              </p>
            </div>
            {uploadState === "uploading" ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Uploading...
              </div>
            ) : null}
          </div>

          <Input
            id={`video-file-${lessonId}`}
            type="file"
            accept="video/*"
            onChange={async (event) => {
              const file = event.target.files?.[0];

              if (!file) {
                return;
              }

              setUploadState("uploading");
              setUploadError(null);

              try {
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch(
                  `/api/admin/lessons/${lessonId}/video`,
                  {
                    method: "POST",
                    body: formData,
                  },
                );

                const payload = (await response.json()) as
                  | { src?: string; error?: string }
                  | undefined;

                if (!response.ok || !payload?.src) {
                  setUploadState("error");
                  setUploadError(payload?.error ?? "Upload failed.");
                  return;
                }

                updateAttributes({ src: payload.src });
                setUploadState("idle");
              } catch {
                setUploadState("error");
                setUploadError("Upload failed.");
              } finally {
                event.target.value = "";
              }
            }}
          />

          {uploadError ? (
            <p className="text-sm text-destructive">{uploadError}</p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor={`video-title-${lessonId}`}>
            Video title
          </label>
          <Input
            id={`video-title-${lessonId}`}
            value={attrs.title}
            onChange={(event) => updateAttributes({ title: event.target.value })}
            placeholder="Course introduction"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor={`video-src-${lessonId}`}>
            Video URL
          </label>
          <Input
            id={`video-src-${lessonId}`}
            value={attrs.src}
            onChange={(event) => updateAttributes({ src: event.target.value })}
            placeholder="/videos/course-intro.mp4"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor={`video-poster-${lessonId}`}>
            Poster URL
          </label>
          <Input
            id={`video-poster-${lessonId}`}
            value={attrs.poster}
            onChange={(event) =>
              updateAttributes({ poster: event.target.value })
            }
            placeholder="/placeholder-course.svg"
          />
        </div>

        {attrs.src ? (
          <div className="overflow-hidden rounded-lg border border-border/70 bg-black">
            <video
              controls
              preload="metadata"
              poster={attrs.poster || undefined}
              className="aspect-video w-full"
            >
              <source src={attrs.src} />
            </video>
          </div>
        ) : null}

        <div className="flex justify-end">
          <Button type="button" variant="destructive" onClick={removeNode}>
            <Trash2 className="size-4" />
            Supprimer le bloc
          </Button>
        </div>
      </div>
    </div>
  );
}
