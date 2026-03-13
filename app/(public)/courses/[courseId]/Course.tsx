import { MarkdownProse } from "@/features/mdx/MarkdownProse";
import { CourseType } from "./course.query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonItem, NoLessonItem } from "./LessonItem";

export type CourseProps = {
  course: CourseType;
};

export function Course({ course }: CourseProps) {
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
    </div>
  );
}
