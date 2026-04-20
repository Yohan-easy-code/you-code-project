import { Lesson } from "./Lesson";
import { LessonsNavigation } from "../LessonsNavigation";
import { Suspense } from "react";
import { LessonsNavigationSkeleton } from "../LessonsNavigationSkeleton";
import { LessonSkeleton } from "./LessonSkeleton";
import { SubmitButton } from "@/components/form/SubmitButton";
import { handleLessonState } from "./lesson.action";
import { requireUser } from "@/lib/auth/guards";
import { getLesson } from "./lesson.query";
import { prisma } from "@/lib/db/prisma";

export default async function LessonPage({
  params,
}: {
  params: Promise<{
    lessonId: string;
    courseId: string;
  }>;
}) {
  const { lessonId, courseId } = await params;

  const session = await requireUser();
  const lesson = await getLesson(lessonId, session?.user.id);

  if (!lesson) {
    return null;
  }

  const isAuthorized = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      users: {
        where: {
          userId: session?.user.id ?? "-",
          canceledAt: null,
        },
      },
    },
  });

  if (lesson.state !== "PUBLIC" && !isAuthorized?.users.length) {
    throw new Error("Unauthorized");
  }

  if (session?.user.id) {
    await prisma.lessonOnUser.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId: lesson.id,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        lessonId: lesson.id,
      },
    });
  }

  return (
    <div className="w-full flex flex-col items-stretch gap-4 p-4 lg:flex-row lg:w-full">
      <div>
        <Suspense fallback={<LessonsNavigationSkeleton />}>
          <LessonsNavigation courseId={courseId} />
        </Suspense>
      </div>
      <div className="flex flex-col gap-3 items-end">
        <Suspense fallback={<LessonSkeleton />}>
          <Lesson lessonId={lessonId} courseId={courseId} />
        </Suspense>
        <form>
          <SubmitButton
            formAction={async () => {
              "use server";
              const currentProgress = lesson.users[0]?.progress;

              await handleLessonState({
                lessonId: lesson.id,
                progress:
                  currentProgress === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED",
              });
            }}
          >
            {lesson.users[0]?.progress === "COMPLETED"
              ? "Mark as in progress"
              : "Completed"}
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
