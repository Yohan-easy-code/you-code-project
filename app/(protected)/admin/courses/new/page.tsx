import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { CourseForm } from "../[courseId]/edit/CourseForm";
import { TypographyH1 } from "@/components/layout/layout";
import { Separator } from "@/components/ui/separator";

export default async function NewCoursePage() {
  const session = await auth();

  if (!session?.user?.id) {
    return notFound();
  }

  return (
    <div className=" w-full px-4 py-6 flex flex-col gap-4">
      <TypographyH1>Create Course</TypographyH1>
      <Separator />
      <CourseForm />
    </div>
  );
}
