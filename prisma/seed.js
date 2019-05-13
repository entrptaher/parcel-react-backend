const { prisma } = require("../src/generated/prisma-client");

async function main() {
  await prisma.createUser({
    name: "Alice",
    email: "alice@prisma.io",
    password: "test123",
    posts: {
      create: [
        {
          title: "Join us for Prisma Day 2019 in Berlin",
          content: {
            create: {
              data: "Bar Foo and some more"
            }
          },
          published: true
        }
      ]
    }
  });
}

main();
