import { notFound } from "next/navigation";
import Link from "next/link";
import { requireAdmin, requireUser } from "@/lib/auth/guards";
import { CoursePaginationButton } from "@/features/pagination/PaginationButton";
import { Menu } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCourse } from "@/lib/queries/admin-course";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await requireUser();

  const p = await params;
  const sp = await searchParams;

  const page = Math.max(1, Number(sp.page ?? 1));
  const course = await getCourse({
    courseId: p.courseId,
    userId: session.user.id,
    role: session.user.role,
    userPage: page,
  });

  if (!course) notFound();

  return (
    <div className=" w-full p-6 space-y-4 ">
      <h1 className="text-2xl font-semibold">Courses</h1>
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* 1er Card */}
        <Card className="flex-2">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-25">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.users?.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">
                      <Avatar className="h-10 w-10">
                        {u.image ? (
                          <AvatarImage src={u.image} alt={u.email ?? ""} />
                        ) : null}
                        <AvatarFallback>
                          {u.email?.[0]?.toUpperCase() ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Link
                        className="hover:underline transition"
                        href={`/admin/users/${u.id}`}
                      >
                        {u.email}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant={"default"}>
                        {u.canceled ? "CANCELED" : "ACTIVE"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="secondary" size="lg">
                        <Menu strokeWidth={2} size={12} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <CoursePaginationButton
              totalPage={10}
              page={page}
              baseUrl={`/admin/courses/${p.courseId}`}
            />
          </CardFooter>
        </Card>

        {/* 2eme Card */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>
              <Avatar>
                <AvatarImage src={course.imageUrl ?? ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardTitle>
            <CardAction>{course.title}</CardAction>
          </CardHeader>
          <CardContent>
            <p>{course._count.users} Users</p>
            <p>{course._count.lessons} Lessons</p>
            <div className="flex flex-col gap-2 mt-4">
              <Link href={`/admin/courses/${course.id}/edit`}>
                <Button variant={"outline"} className="w-full ">
                  Edit
                </Button>
              </Link>
              <Button variant={"outline"} className="w-full ">
                <Link href={`/admin/courses/${course.id}/lessons`}>
                  Edit Lessons
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Button variant="outline" className="w-full lg:w-auto">
        <Link href="/admin/courses" className="underline">
          ← Retour à mes cours
        </Link>
      </Button>
    </div>
  );
}
