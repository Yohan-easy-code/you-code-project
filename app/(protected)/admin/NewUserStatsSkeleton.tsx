import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const NewUserStatsSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users course activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-75 w-full items-end gap-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-full rounded-md"
              style={{ height: `${40 + ((index * 17) % 140)}px` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
