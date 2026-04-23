"use client";

import { useCallback, useMemo } from "react";
import type { MdxJsxFlowElement, MdxJsxAttribute } from "mdast-util-mdx-jsx";
import { Input } from "@/components/ui/input";
import { type JsxEditorProps, useMdastNodeUpdater } from "@mdxeditor/editor";
import { Video } from "lucide-react";

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

export function VideoEditor({ mdastNode }: VideoEditorProps) {
  const updateMdastNode = useMdastNodeUpdater<MdxJsxFlowElement>();

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
            Reference a local or hosted video URL stored directly in the lesson
            markdown.
          </p>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="video-title">
            Video title
          </label>
          <Input
            id="video-title"
            value={attrs.title}
            onChange={(event) => updateAttributes({ title: event.target.value })}
            placeholder="Course introduction"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="video-src">
            Video URL
          </label>
          <Input
            id="video-src"
            value={attrs.src}
            onChange={(event) => updateAttributes({ src: event.target.value })}
            placeholder="/videos/course-intro.mp4"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="video-poster">
            Poster URL
          </label>
          <Input
            id="video-poster"
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
      </div>
    </div>
  );
}
