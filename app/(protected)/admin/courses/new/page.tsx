import { auth } from "@/auth";
import { CourseForm } from "../[courseId]/edit/CourseForm";

export default async function CoursePage() {
  await auth;
  return;
  <CourseForm />;
}
