import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { faker } from "@faker-js/faker";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

const main = async () => {
  const users = [];

  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        role: i === 0 ? Role.ADMIN : Role.USER, // premier user admin
        createdCourses: {
          create: {
            title: faker.lorem.words(3),
            presentation: faker.lorem.paragraph(),
            imageUrl: faker.image.url(),
            lessons: {
              createMany: {
                data: [
                  {
                    title: faker.lorem.words(3),
                    content: faker.lorem.paragraph(),
                    rank: "001",
                  },
                  {
                    title: faker.lorem.words(3),
                    content: faker.lorem.paragraph(),
                    rank: "002",
                  },
                ],
              },
            },
          },
        },
      },
    });

    users.push(user);
  }

  const courses = await prisma.course.findMany();

  for (const course of courses) {
    const randomUsers = faker.helpers.arrayElements(users, 3);

    for (const user of randomUsers) {
      await prisma.courseOnUser.create({
        data: {
          userId: user.id,
          courseId: course.id,
        },
      });
    }
  }

  console.log("🌱 Seed completed");
};

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
