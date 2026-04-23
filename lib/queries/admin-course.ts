import { prisma } from "@/lib/db/prisma";
import { Prisma, Role } from "@prisma/client";

const PAGE_SIZE = 5;

export const getCourse = async ({
  courseId,
  userId,
  role,
  userPage,
}: {
  courseId: string;
  userId: string;
  role: Role;
  userPage: number; // page starts at 1
}) => {
  const page = Math.max(1, userPage);
  const where =
    role === "ADMIN" ? { id: courseId } : { id: courseId, creatorId: userId };

  const course = await prisma.course.findFirst({
    where,
    select: {
      id: true,

      imageUrl: true,
      title: true,
      presentation: true,
      state: true,
      users: {
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
        select: {
          canceledAt: true,
          id: true,
          user: {
            select: {
              email: true,
              id: true,
              image: true,
            },
          },
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

  if (!course) return null;

  const users = course?.users.map((row) => ({
    canceled: Boolean(row.canceledAt),
    ...row.user,
  }));

  return {
    ...course,
    users,
  };
};

export const getExplorerCourses = async (page: number) => {
  const currentPage = Math.max(1, page);
  const where = {
    state: "PUBLISHED",
  } satisfies Prisma.CourseWhereInput;

  const courses = await prisma.course.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: PAGE_SIZE,
    skip: (currentPage - 1) * PAGE_SIZE,
    select: {
      id: true,
      title: true,
      imageUrl: true,
      presentation: true,
      creator: {
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
        },
      },
    },
  });

  const totalCourses = await prisma.course.count({ where });

  return {
    courses,
    totalPage: Math.ceil(totalCourses / PAGE_SIZE),
  };
};
export type CoursesCard = Prisma.PromiseReturnType<
  typeof getExplorerCourses
>["courses"][number];

export const getUserCourses = async ({
  userId,
  page,
}: {
  userId: string;
  page: number;
}) => {
  const currentPage = Math.max(1, page);

  const where = {
    creatorId: userId,
  };

  const courses = await prisma.course.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: PAGE_SIZE,
    skip: (currentPage - 1) * PAGE_SIZE,
    select: {
      id: true,
      title: true,
      imageUrl: true,
      presentation: true,
      creator: {
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
        },
      },
    },
  });

  const totalCourses = await prisma.course.count({ where });

  return {
    courses,
    totalPage: Math.ceil(totalCourses / PAGE_SIZE),
  };
};
