-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_creatorId_fkey";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
