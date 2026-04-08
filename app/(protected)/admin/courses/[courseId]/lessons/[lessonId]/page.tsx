import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { LessonDetailsForm } from "./form/LessonDetailsForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { requireUser } from "@/lib/auth/guards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForwardRefEditor } from "./content/ForwardRefEditor";
import { TypographyH1 } from "@/components/layout/layout";
import { Separator } from "@/components/ui/separator";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const session = await requireUser();

  if (!session?.user?.id) {
    return notFound();
  }

  const { courseId, lessonId } = await params;

  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      courseId,
      ...(session.user.role === "ADMIN"
        ? {}
        : {
            course: {
              creatorId: session.user.id,
            },
          }),
    },
    select: {
      id: true,
      courseId: true,
      title: true,
      state: true,
      content: true,
    },
  });

  if (!lesson) {
    return notFound();
  }

  return (
    <div className="mx-auto flex h-fit w-full max-w-7xl flex-col gap-4 px-4 py-6">
      <div className="flex items-center justify-between gap-4">
        <TypographyH1>{lesson.title}</TypographyH1>
        <Link href={`/admin/courses/${lesson.courseId}/lessons`}>
          <Button className="w-fit">Back</Button>
        </Link>
      </div>
      <Separator />

      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <div className="w-full lg:basis-[30%]">
          <LessonDetailsForm
            lessonId={lesson.id}
            courseId={lesson.courseId}
            initialValues={{
              name: lesson.title,
              state: lesson.state,
            }}
          />
        </div>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <ForwardRefEditor
              lessonId={lesson.id}
              markdown={lesson.content ?? ""}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
