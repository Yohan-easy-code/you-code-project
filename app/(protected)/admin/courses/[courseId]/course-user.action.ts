"use server";

import { authenticatedAction, ServerError } from "@/lib/action";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const toggleUserAccessSchema = z.object({
  courseId: z.string(),
  userId: z.string(),
});

export const toggleUserAccess = authenticatedAction
  .inputSchema(toggleUserAccessSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { courseId, userId } = parsedInput;
    const currentUserId = ctx.userId;

    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
        creatorId: currentUserId,
      },
    });

    if (!course) {
      throw new ServerError("Unauthorized");
    }

    const courseOnUser = await prisma.courseOnUser.findFirst({
      where: {
        courseId,
        userId,
      },
    });

    if (!courseOnUser) {
      throw new ServerError("User not found in course");
    }

    await prisma.courseOnUser.update({
      where: {
        id: courseOnUser.id,
      },
      data: {
        canceledAt: courseOnUser.canceledAt ? null : new Date(),
      },
    });

    revalidatePath(`/admin/courses/${courseId}`);

    return {
      message: "User access updated successfully",
    };
  });
