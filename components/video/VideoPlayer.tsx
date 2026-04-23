"use client";

type VideoPlayerProps = {
  src?: string;
  title?: string;
  poster?: string;
};

export function VideoPlayer({
  src,
  title = "Lesson video",
  poster,
}: VideoPlayerProps) {
  if (!src) {
    return (
      <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        Video unavailable.
      </div>
    );
  }

  return (
    <div className="not-prose overflow-hidden rounded-xl border border-border bg-card">
      <video
        controls
        preload="metadata"
        title={title}
        poster={poster}
        className="aspect-video w-full bg-black"
      >
        <source src={src} />
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
}
