"use client";

import { Button } from "@/components/ui/button";
import {
  jsxPlugin,
  type JsxComponentDescriptor,
} from "@mdxeditor/editor";
import { PlaySquare } from "lucide-react";
import { VideoEditor } from "./VideoEditor";

export const videoJsxComponentDescriptors = (
  lessonId: string,
): JsxComponentDescriptor[] => [
  {
    name: "Video",
    kind: "flow",
    props: [
      { name: "title", type: "string" },
      { name: "src", type: "string" },
      { name: "poster", type: "string" },
    ],
    hasChildren: false,
    Editor: (props) => <VideoEditor {...props} lessonId={lessonId} />,
  },
];

export const videoJsxPlugin = (lessonId: string) =>
  jsxPlugin({
    jsxComponentDescriptors: videoJsxComponentDescriptors(lessonId),
  });

export function InsertVideoButton({ onInsert }: { onInsert: () => void }) {
  return (
    <Button type="button" variant="ghost" size="sm" onClick={onInsert}>
      <PlaySquare className="size-4" />
      Video
    </Button>
  );
}
