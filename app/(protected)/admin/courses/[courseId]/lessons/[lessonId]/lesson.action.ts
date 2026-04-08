"use server";

import { ServerError, authenticatedAction } from "@/lib/action";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { LessonDetailSchema } from "./form/lesson.schema";

const updateLessonSchema = z.object({
  lessonId: z.string(),
  data: LessonDetailSchema,
});

export const updateLessonAction = authenticatedAction
  .inputSchema(updateLessonSchema)
  .action(async ({ parsedInput, ctx }) => {
    const existingLesson = await prisma.lesson.findFirst({
      where: {
        id: parsedInput.lessonId,
        ...(ctx.user.role === "ADMIN"
          ? {}
          : {
              course: {
                creatorId: ctx.userId,
              },
            }),
      },
      select: {
        id: true,
        courseId: true,
      },
    });

    if (!existingLesson) {
      throw new ServerError("Lesson not found or unauthorized");
    }

    const lesson = await prisma.lesson.update({
      where: {
        id: parsedInput.lessonId,
      },
      data: {
        title: parsedInput.data.name,
        state: parsedInput.data.state,
      },
    });

    revalidatePath(
      `/admin/courses/${existingLesson.courseId}/lessons/${lesson.id}`,
    );
    revalidatePath(`/admin/courses/${existingLesson.courseId}/lessons`);
    revalidatePath(`/admin/courses/${existingLesson.courseId}`);

    return {
      message: "Lesson updated successfully",
      lesson,
    };
  });

const LessonActionEditContentSchema = z.object({
  lessonId: z.string(),
  markdown: z.string(),
});

export const lessonActionEditContent = authenticatedAction
  .inputSchema(LessonActionEditContentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const lesson = await prisma.lesson.findFirst({
      where: {
        id: parsedInput.lessonId,
        ...(ctx.user.role === "ADMIN"
          ? {}
          : {
              course: {
                creatorId: ctx.userId,
              },
            }),
      },
      select: {
        id: true,
        courseId: true,
      },
    });

    if (!lesson) {
      throw new ServerError("Lesson not found or unauthorized");
    }

    const updatedLesson = await prisma.lesson.update({
      where: {
        id: parsedInput.lessonId,
      },
      data: {
        content: parsedInput.markdown,
      },
    });

    revalidatePath(`/admin/courses/${lesson.courseId}/lessons/${lesson.id}`);
    revalidatePath(`/admin/courses/${lesson.courseId}/lessons`);
    revalidatePath(`/admin/courses/${lesson.courseId}`);

    return {
      message: "Lesson content updated successfully",
      lesson: updatedLesson,
    };
  });
