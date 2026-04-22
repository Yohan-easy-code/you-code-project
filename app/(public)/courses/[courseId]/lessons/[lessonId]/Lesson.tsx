import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MdxProse } from "./MdxProse";
import { getLesson } from "./lesson.query";
import { requireUser } from "@/lib/auth/guards";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { OpenLessonNavigationButton } from "./OpenLessonNavigationButton";

export const Lesson = async ({
  lessonId,
  courseId,
}: {
  lessonId: string;
  courseId: string;
}) => {
  const session = await requireUser();
  const lesson = await getLesson(lessonId, session.user.id);

  if (!lesson) {
    notFound();
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
  return (
    <Card className="h-fit w-full max-w-none">
      <CardHeader className="flex flex-row items-center gap-4">
        <OpenLessonNavigationButton />
        <CardTitle>{lesson.title}</CardTitle>
      </CardHeader>
      <CardContent className="min-w-0">
        <MdxProse markdown={lesson.content} />
      </CardContent>
    </Card>
  );
};
