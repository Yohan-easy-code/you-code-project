import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";

export const getPublicCourse = async ({
  courseId,
  userId = "-",
}: {
  courseId: string;
  userId?: string;
}) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      imageUrl: true,
      title: true,
      presentation: true,
      lessons: {
        where: {
          state: {
            in: ["PUBLIC", "PUBLISHED"],
          },
        },
        orderBy: {
          rank: "asc",
        },
        select: {
          id: true,
          title: true,
          courseId: true,
          state: true,
          users: {
            where: {
              userId,
            },
            select: {
              progress: true,
            },
          },
        },
      },
      creator: {
        select: {
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });

  if (!course) {
    return null;
  }

  const lessons = course.lessons.map((lesson) => {
    const progress = lesson.users[0]?.progress ?? "NOT_STARTED";

    return {
      ...lesson,
      progress,
    };
  });

  return {
    ...course,
    lessons,
  };
};

export type CourseType = NonNullable<
  Prisma.PromiseReturnType<typeof getPublicCourse>
>;

export type CourseLessonItem = CourseType["lessons"][0];
