import { MarkdownProse } from "@/features/mdx/MarkdownProse";
import { CourseType } from "./course.query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonItem, NoLessonItem } from "./LessonItem";
import { SubmitButton } from "@/components/form/SubmitButton";
import { requireUser } from "@/lib/auth/guards";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CourseProps = {
  course: CourseType;
  userId?: string;
};

export function Course({ course, userId }: CourseProps) {
  const isLogin = Boolean(userId);
  return (
    <div className="grid w-full gap-4 lg:grid-cols-[70%_30%] lg:items-start">
      <Card className="w-full">
        <CardHeader className="flex flex-row gap-3 space-y-0">
          <Avatar className="h-14 w-14 rounded">
            <AvatarFallback>{course.title[0]}</AvatarFallback>
            {course.imageUrl ? <AvatarImage src={course.imageUrl} /> : null}
          </Avatar>

          <div className="flex flex-col gap-3">
            <CardTitle>{course.title}</CardTitle>
            <div className="flex flex-row items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{course.title[0]}</AvatarFallback>
                {course.creator.image ? (
                  <AvatarImage src={course.creator.image} />
                ) : null}
              </Avatar>
              <p>{course.creator.name}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {course.presentation ? (
            <MarkdownProse content={course.presentation} />
          ) : (
            <p className="text-muted-foreground">Aucune présentation.</p>
          )}
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Lessons</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {course.lessons.length === 0 ? (
            <NoLessonItem />
          ) : (
            course.lessons.map((lesson) => (
              <LessonItem lesson={lesson} key={lesson.id} />
            ))
          )}
        </CardContent>
      </Card>
      {!course.isCanceled && !course.isEnrolled && isLogin ? (
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <SubmitButton
                formAction={async () => {
                  "use server";

                  const session = await requireUser();

                  const courseOnUser = await prisma.courseOnUser.create({
                    data: {
                      userId: session.user.id,
                      courseId: course.id,
                    },
                    select: {
                      course: {
                        select: {
                          id: true,
                          lessons: {
                            orderBy: {
                              rank: "asc",
                            },
                            take: 1,
                            select: {
                              id: true,
                            },
                          },
                        },
                      },
                    },
                  });

                  const lesson = courseOnUser.course.lessons[0];

                  revalidatePath(`/courses/${course.id}`);

                  if (!lesson) {
                    return;
                  }
                  console.log("lesson redirect", lesson);
                  redirect(`/courses/${course.id}/lessons/${lesson.id}`);
                }}
              >
                Join
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
