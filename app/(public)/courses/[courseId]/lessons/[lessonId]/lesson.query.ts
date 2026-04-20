import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";

export const getLesson = async (lessonId: string, userId = "-") => {
  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      state: {
        not: "HIDDEN",
      },
    },
    select: {
      id: true,
      content: true,
      title: true,
      state: true,
      users: {
        where: {
          userId,
        },
        select: {
          id: true,
          progress: true,
        },
      },
    },
  });

  if (!lesson) {
    return null;
  }

  return lesson;
};

export type LessonType = NonNullable<
  Prisma.PromiseReturnType<typeof getLesson>
>;
