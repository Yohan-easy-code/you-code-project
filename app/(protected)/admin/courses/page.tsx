import Link from "next/link";
import Image from "next/image";
import { requireUser } from "@/lib/auth/guards";
import { prisma } from "@/lib/db/prisma";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TypographyH1 } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";

export default async function AdminCoursesPage() {
  await requireUser();

  const session = await requireUser();

  const courses = await prisma.course.findMany({
    where: {
      creatorId: session.user.id,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      createdAt: true,
      state: true,
      creator: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 flex flex-col gap-3">
      <div className="flex justify-between">
        <TypographyH1>Courses</TypographyH1>
        <Button variant={"secondary"}>
          <Link href={"/admin/courses/new"}>New Course</Link>
        </Button>
      </div>
      <Separator />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {courses.length} cours
          </p>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead className=" md:table-cell">State</TableHead>
                <TableHead className="hidden md:table-cell">Créé le</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {courses.map((c) => (
                <TableRow key={c.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="relative h-10 w-16 overflow-hidden rounded-md border bg-muted">
                      <Image
                        src={c.imageUrl ?? "/placeholder-course.png"}
                        alt={c.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">
                    <Link
                      href={`/admin/courses/${c.id}`}
                      className="hover:underline"
                    >
                      {c.title}
                    </Link>
                  </TableCell>

                  <TableCell className=" md:table-cell text-muted-foreground">
                    <Badge> {c.state}</Badge>
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {new Date(c.createdAt).toLocaleDateString("fr-FR")}
                  </TableCell>
                </TableRow>
              ))}

              {courses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center">
                    Aucun cours pour le moment.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
