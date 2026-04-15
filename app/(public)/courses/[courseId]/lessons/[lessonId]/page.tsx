type PageProps = {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
};

export default async function LessonPage({ params }: PageProps) {
  const { courseId, lessonId } = await params;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1>Lesson page</h1>
      <p>courseId: {courseId}</p>
      <p>lessonId: {lessonId}</p>
    </div>
  );
}
