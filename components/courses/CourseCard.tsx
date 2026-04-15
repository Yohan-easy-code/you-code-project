import { CoursesCard } from "@/app/(public)/courses/course.query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export type CourseCardProps = {
  course: CoursesCard;
};

export const CourseCard = (props: CourseCardProps) => {
  return (
    <Link href={`/courses/${props.course.id}`} className="w-full">
      <Card className="transition-colors hover:bg-accent">
        <CardHeader className="flex flex-row gap-3 space-y-0">
          <Avatar className="h-14 w-14 rounded">
            <AvatarFallback>{props.course.title[0]}</AvatarFallback>
            {props.course.imageUrl ? (
              <AvatarImage src={props.course.imageUrl} />
            ) : null}
          </Avatar>

          <div className="flex flex-col gap-3">
            <CardTitle>{props.course.title}</CardTitle>
            <div className="flex flex-row items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{props.course.title[0]}</AvatarFallback>
                {props.course.creator.image ? (
                  <AvatarImage src={props.course.creator.image} />
                ) : null}
              </Avatar>
              <p>{props.course.creator.name}</p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};
