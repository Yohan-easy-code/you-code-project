import { prisma } from "@/lib/db/prisma";

async function main() {
  // ⚠️ Mets un creatorId existant (un User dans ta DB)
  const creatorId = "cmm20irto000004w3ma60gh33";

  await prisma.course.create({
    data: {
      title: "React Query",
      imageUrl: "/you-code.svg",
      creatorId,
      presentation:
        "React Query is a powerful data-fetching library for React applications. It simplifies the process of fetching, caching, and updating data in your React components, making it easier to manage server state and improve the performance of your application.",
    },
  });
  await prisma.course.create({
    data: {
      title: "Prisma",
      imageUrl: "/you-code.svg",
      creatorId,
      presentation:
        "Prisma is an open-source database toolkit that simplifies database access and management for developers. It provides a type-safe and intuitive API for working with databases, allowing you to easily query, manipulate, and manage your data. With Prisma, you can focus on building your application without worrying about the complexities of database interactions.",
    },
  });
  await prisma.course.create({
    data: {
      title: "Tailwind CSS",
      imageUrl: "/you-code.svg",
      creatorId,
      presentation:
        "Tailwind CSS is a utility-first CSS framework that provides a set of pre-defined classes to help you quickly build custom user interfaces. It allows you to style your HTML elements by applying classes directly in your markup, giving you full control over the design and layout of your application. With Tailwind CSS, you can create responsive and visually appealing designs without writing custom CSS.",
    },
  });
  await prisma.course.create({
    data: {
      title: "TypeScript",
      imageUrl: "/you-code.svg",
      creatorId,
      presentation:
        "TypeScript is a statically typed superset of JavaScript that adds optional static typing to the language. It provides enhanced tooling and developer experience by allowing you to catch errors at compile time, improve code readability, and enable better collaboration in larger codebases. With TypeScript, you can write more robust and maintainable code while still leveraging the flexibility of JavaScript.",
    },
  });
  await prisma.course.create({
    data: {
      title: "Next.js",
      imageUrl: "/you-code.svg",
      creatorId,
      presentation:
        "Next.js is a popular React framework that enables server-side rendering and static site generation for building fast and scalable web applications. It provides a powerful set of features, including automatic code splitting, optimized performance, and seamless integration with APIs and databases. With Next.js, you can create dynamic and interactive web applications with ease.",
    },
  });
  await prisma.course.create({
    data: {
      title: "Node.js",
      imageUrl: "/you-code.svg",
      creatorId,
      presentation:
        "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript code on the server-side, enabling the creation of scalable and high-performance web applications. With Node.js, you can build a wide range of applications, from simple command-line tools to complex web servers and APIs, using JavaScript as the primary programming language.",
    },
  });

  console.log("✅ Course created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
