import { z } from "zod";

export const courseFormSchema = z.object({
  title: z.string().min(3).max(100),
  imageUrl: z.string().url(),
  presentation: z.string().min(1),
  state: z.enum(["DRAFT", "PUBLISHED"]),
});

export type CourseFormValues = z.infer<typeof courseFormSchema>;

export const updateCourseSchema = courseFormSchema.extend({
  courseId: z.string(),
});

export type UpdateCourseValues = z.infer<typeof updateCourseSchema>;
