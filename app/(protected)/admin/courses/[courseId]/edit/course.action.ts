"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { actionClient } from "@/lib/safe-action";
import { updateCourseSchema } from "./course.schema";
import { revalidatePath } from "next/cache";

export const updateCourseAction = actionClient
  .inputSchema(updateCourseSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    await prisma.course.update({
      where: {
        id: parsedInput.courseId,
        creatorId: session.user.id,
      },
      data: {
        title: parsedInput.title,
        imageUrl: parsedInput.imageUrl,
        presentation: parsedInput.presentation,
        state: parsedInput.state,
      },
    });

    revalidatePath(`/admin/courses/${parsedInput.courseId}`);
    return { message: "Course updated successfully" };
  });
