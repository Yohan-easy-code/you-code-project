import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LessonItemPlaceholder } from "./LessonItemPlaceholder";

export const LessonsNavigationSkeleton = () => {
  return (
    <Card className="hidden w-full overflow-hidden lg:flex lg:w-[30vw] lg:max-w-sm lg:min-w-[18rem] lg:flex-col">
      <CardHeader className="border-b pb-4">
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5 p-4 pt-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <LessonItemPlaceholder key={i} />
        ))}
      </CardContent>
    </Card>
  );
};
