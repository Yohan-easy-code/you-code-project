import { cn } from "@/lib/utils";

type TypographyH1Props = React.HTMLAttributes<HTMLHeadingElement>;

export function TypographyH1({
  className,
  children,
  ...props
}: TypographyH1Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
