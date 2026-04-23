import { Separator } from "@/components/ui/separator";
import { getCourseLessons } from "@/lib/queries/lesson.query";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/guards";
import { notFound, redirect } from "next/navigation";
import { SubmitButton } from "@/components/form/SubmitButton";
import { prisma } from "@/lib/db/prisma";
import { LessonState } from "@prisma/client";
import SortableLessonsList from "./SortableLessonsList";
import { getTheMiddleRank } from "@/lib/getTheMiddleRank";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CourseLessonsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const session = await requireUser();

  const course = await getCourseLessons({
    courseId,
    userId: session.user.id,
    role: session.user.role,
  });

  if (!course) notFound();

  return (
    <div className="w-full space-y-4 p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-semibold">Lessons 📚 {course.title}</h1>
        <Button asChild variant="outline" className="w-full lg:w-auto">
          <Link href={`/admin/courses/${courseId}`}>Retour au cours</Link>
        </Button>
      </div>
      <Separator />

      <Card>
        <CardContent className="flex flex-col gap-2">
          <SortableLessonsList lessons={course.lessons} />
        </CardContent>

        <CardFooter>
          <form>
            <SubmitButton
              variant="outline"
              className="w-full"
              formAction={async () => {
                "use server";

                const session = await requireUser();

                const existingCourse = await prisma.course.findFirstOrThrow({
                  where: {
                    id: courseId,
                    ...(session.user.role === "ADMIN"
                      ? {}
                      : {
                          creatorId: session.user.id,
                        }),
                  },
                  select: {
                    id: true,
                    lessons: {
                      orderBy: {
                        rank: "desc",
                      },
                      take: 1,
                      select: {
                        rank: true,
                      },
                    },
                  },
                });

                const lesson = await prisma.lesson.create({
                  data: {
                    title: "draft lesson",
                    rank: getTheMiddleRank(
                      existingCourse.lessons[0]?.rank,
                      undefined,
                    ),
                    content: "## Default content",
                    state: LessonState.HIDDEN,
                    course: {
                      connect: {
                        id: existingCourse.id,
                      },
                    },
                  },
                });

                redirect(`/admin/courses/${courseId}/lessons/${lesson.id}`);
              }}
            >
              Create Lesson
            </SubmitButton>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
