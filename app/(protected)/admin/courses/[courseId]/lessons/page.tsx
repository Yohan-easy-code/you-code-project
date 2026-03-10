import { Separator } from "@/components/ui/separator";
import { getCourseLessons } from "@/lib/queries/lesson.query";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/guards";
import { notFound } from "next/navigation";
import { LessonItem } from "./LessonItem";
import { Button } from "@/components/ui/button";

export default async function CourseLessonsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await requireAdmin(); // ou requireAuth()
  const course = await getCourseLessons({
    courseId: params.courseId,
    userId: session.user.id,
    role: session.user.role,
  });

  if (!course) notFound();

  return (
    <div className=" w-full p-6 space-y-4 ">
      <h1 className="text-2xl font-semibold">Lessons 📚 {course?.title}</h1>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {course.lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </CardContent>
        <CardFooter>
          <Button variant={"outline"} className="w-full ">
            Create Lesson
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
