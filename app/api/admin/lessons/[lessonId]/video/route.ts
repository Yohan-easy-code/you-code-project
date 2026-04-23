import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const VIDEO_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "videos");

function getSafeExtension(file: File) {
  const originalExtension = path.extname(file.name).toLowerCase();

  if (originalExtension) {
    return originalExtension;
  }

  if (file.type === "video/webm") {
    return ".webm";
  }

  if (file.type === "video/ogg") {
    return ".ogv";
  }

  return ".mp4";
}

export async function POST(
  request: Request,
  context: { params: Promise<{ lessonId: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId } = await context.params;
  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      ...(session.user.role === "ADMIN"
        ? {}
        : {
            course: {
              creatorId: session.user.id,
            },
          }),
    },
    select: {
      id: true,
    },
  });

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (!file.type.startsWith("video/")) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  await mkdir(VIDEO_UPLOAD_DIR, { recursive: true });

  const extension = getSafeExtension(file);
  const fileName = `${lessonId}-${randomUUID()}${extension}`;
  const filePath = path.join(VIDEO_UPLOAD_DIR, fileName);
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  await writeFile(filePath, fileBuffer);

  return NextResponse.json({
    src: `/uploads/videos/${fileName}`,
    name: file.name,
  });
}
