import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";
import { VideoPlayer } from "@/components/video/VideoPlayer";

export type MdxProseProps = {
  markdown: string;
};

export const MdxProse = (props: MdxProseProps) => {
  return (
    <div className="prose m-auto dark:prose-invert xl:prose-xl">
      <MDXRemote
        components={{
          Video: ({
            src,
            title,
            poster,
          }: {
            src?: string;
            title?: string;
            poster?: string;
          }) => (
            <VideoPlayer src={src} title={title} poster={poster} />
          ),
        }}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypePrism],
            format: "mdx",
          },
        }}
        source={props.markdown}
      />
    </div>
  );
};
