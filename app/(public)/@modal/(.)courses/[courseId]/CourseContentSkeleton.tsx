import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CourseContentSkeleton() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-40 animate-pulse rounded bg-muted" />
          <div className="h-6 w-32 animate-pulse rounded bg-muted" />
          <div className="h-24 animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    </div>
  );
}
