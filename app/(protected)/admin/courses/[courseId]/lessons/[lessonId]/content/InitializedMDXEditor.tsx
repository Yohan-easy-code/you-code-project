"use client";

import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  codeBlockPlugin,
  codeMirrorPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
  InsertCodeBlock,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { cn } from "@/lib/utils";
import styles from "./mdx-editor-theme.module.css";
import { InsertVideoButton, videoJsxPlugin } from "./video-jsx";

export default function InitializedMDXEditor({
  editorRef,
  className,
  lessonId,
  ...props
}: {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
  lessonId: string;
} & MDXEditorProps) {
  return (
    <MDXEditor
      className={cn(styles.theme, className)}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        videoJsxPlugin(lessonId),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
        }),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarClassName: styles.toolbar,
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === "codeblock",
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  when: (editor) => editor?.editorType === "sandpack",
                  contents: () => <ShowSandpackInfo />,
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <BlockTypeSelect />
                      <BoldItalicUnderlineToggles />
                      <InsertVideoButton
                        onInsert={() => {
                          if (!editorRef || typeof editorRef === "function") {
                            return;
                          }

                          editorRef.current?.insertMarkdown(
                            `\n<Video title="" src="" poster="" />\n`,
                          );
                        }}
                      />
                      <InsertCodeBlock />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
