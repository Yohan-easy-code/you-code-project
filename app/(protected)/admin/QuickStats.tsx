import { requireUser } from "@/lib/auth/guards";
import { prisma } from "@/lib/db/prisma";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCheck, Presentation, User2 } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type QuickStatsProps = {};

export const QuickStats = async ({}: QuickStatsProps) => {
  const session = await requireUser();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const users = await prisma.user.count({
    where: {
      courseEnrollments: {
        some: {
          canceledAt: null,
          course: {
            creatorId: session.user.id,
          },
        },
      },
    },
  });

  const lessons = await prisma.lesson.count({
    where: {
      course: {
        creatorId: session.user.id,
      },
    },
  });

  const courses = await prisma.course.count({
    where: {
      creatorId: session.user.id,
    },
  });

  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="border-b pb-4">
        <CardTitle>Quick stats</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <User2 size={16} />
            <span>Users</span>
          </div>
          <p className="text-3xl font-semibold tracking-tight">{users}</p>
        </div>

        <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <BookCheck size={16} />
            <span>Lessons</span>
          </div>
          <p className="text-3xl font-semibold tracking-tight">{lessons}</p>
        </div>

        <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Presentation size={16} />
            <span>Courses</span>
          </div>
          <p className="text-3xl font-semibold tracking-tight">{courses}</p>
        </div>
      </CardContent>
    </Card>
  );
};
