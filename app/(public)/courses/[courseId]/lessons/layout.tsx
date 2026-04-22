export default function LessonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative w-full px-4 py-4 lg:px-6 lg:py-6">{children}</div>;
}
