import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/db/prisma";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminCoursesPage() {
  const session = await requireAdmin();

  const courses = await prisma.course.findMany({
    where: { creatorId: session.user.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className=" flex justify-center w-full h-fit mx-4 px-4 m-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mes cours</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Image</TableHead>
                <TableHead>Titre</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {courses.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="relative h-10 w-16 overflow-hidden rounded-md border">
                      <Image
                        src={c.imageUrl ?? "/placeholder-course.png"}
                        alt={c.title}
                        fill
                        className="object-cover"
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
