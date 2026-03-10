import { prisma } from "@/lib/db/prisma";
import { Role } from "@prisma/client";

export const getCourseLessons = async ({
  courseId,
  userId,
  role,
}: {
  courseId: string;
  userId: string;
  role: Role;
}) => {
  const where =
    role === "ADMIN" ? { id: courseId } : { id: courseId, creatorId: userId };

  return prisma.course.findFirst({
    where,
    select: {
      id: true,
      title: true,
      lessons: true,
    },
  });
};
