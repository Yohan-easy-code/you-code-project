"use server";

import { ServerError, authenticatedAction } from "@/lib/action";
import { prisma } from "@/lib/db/prisma";
import { getTheMiddleRank } from "@/lib/getTheMiddleRank";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const SaveLessonMoveSchema = z.object({
  upItemRank: z.string().optional(),
  downItemRank: z.string().optional(),
  lessonId: z.string(),
  orderedLessonIds: z.array(z.string()).optional(),
});

const getRankFromIndex = (index: number) => String(index + 1).padStart(9, "0");

export const saveLessonMove = authenticatedAction
  .inputSchema(SaveLessonMoveSchema)
  .action(async ({ parsedInput, ctx }) => {
    const course = await prisma.course.findFirst({
      where: {
        lessons: {
          some: {
            id: parsedInput.lessonId,
          },
        },
        ...(ctx.user.role === "ADMIN"
          ? {}
          : {
              creatorId: ctx.userId,
            }),
      },
      select: {
        id: true,
      },
    });

    if (!course) {
      throw new ServerError("This course doesn't exist");
    }

    const lesson = await prisma.lesson.findFirst({
      where: {
        id: parsedInput.lessonId,
        courseId: course.id,
      },
      select: {
        id: true,
      },
    });

    if (!lesson) {
      throw new ServerError("This lesson doesn't exist");
    }

    if (parsedInput.orderedLessonIds) {
      const orderedLessonIds = parsedInput.orderedLessonIds;

      if (new Set(orderedLessonIds).size !== orderedLessonIds.length) {
        throw new ServerError("Invalid lesson order");
      }

      if (!orderedLessonIds.includes(parsedInput.lessonId)) {
        throw new ServerError("Invalid lesson order");
      }

      const lessons = await prisma.lesson.findMany({
        where: {
          courseId: course.id,
          id: {
            in: orderedLessonIds,
          },
        },
        select: {
          id: true,
        },
      });

      if (lessons.length !== orderedLessonIds.length) {
        throw new ServerError("Invalid lesson order");
      }

      await prisma.$transaction(
        orderedLessonIds.map((lessonId, index) =>
          prisma.lesson.update({
            where: {
              id: lessonId,
            },
            data: {
              rank: getRankFromIndex(index),
            },
          }),
        ),
      );

      revalidatePath(`/admin/courses/${course.id}/lessons`);
      revalidatePath(`/admin/courses/${course.id}`);

      const movedLessonIndex = orderedLessonIds.indexOf(parsedInput.lessonId);

      return getRankFromIndex(movedLessonIndex);
    }

    const newRank = getTheMiddleRank(
      parsedInput.upItemRank,
      parsedInput.downItemRank,
    );

    await prisma.lesson.update({
      where: {
        id: parsedInput.lessonId,
      },
      data: {
        rank: newRank,
      },
    });

    revalidatePath(`/admin/courses/${course.id}/lessons`);
    revalidatePath(`/admin/courses/${course.id}`);

    return newRank;
  });
