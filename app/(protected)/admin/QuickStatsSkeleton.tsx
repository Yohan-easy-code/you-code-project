import { BookCheck, Presentation, User2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const QuickStatsSkeleton = () => {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="border-b pb-4">
        <CardTitle>Quick stats</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <User2 className="inline" size={16} />
            <span>Users</span>
          </div>
          <Skeleton className="h-8 w-16" />
        </div>

        <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <BookCheck className="inline" size={16} />
            <span>Lessons</span>
          </div>
          <Skeleton className="h-8 w-16" />
        </div>

        <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Presentation className="inline" size={16} />
            <span>Courses</span>
          </div>
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  );
};
