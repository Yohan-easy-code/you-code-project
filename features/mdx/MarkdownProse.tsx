import { MDXRemote } from "next-mdx-remote/rsc";

type MarkdownProseProps = {
  content: string;
};

export const MarkdownProse = ({ content }: MarkdownProseProps) => {
  return (
    <div className="rounded-xl bg-zinc-950 px-4 py-3 text-zinc-100 md:px-6 md:py-4">
      <div className="prose prose-invert max-w-none">
        <MDXRemote source={content} />
      </div>
    </div>
  );
};
