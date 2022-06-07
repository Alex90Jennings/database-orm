const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdCustomer = await prisma.customer.create({
    data: {
      name: "Alice",
    },
  });

  console.log("Customer created", createdCustomer);

  const createdContact = await prisma.contact.create({
    data: {
      phone: "023479082347190",
      email: "alice@fake.com",
      customerId: createdCustomer.id,
    },
  });

  console.log("Contact created", createdContact);

  const createdMovie = await prisma.movie.create({
    data: {
      title: "The Silence of the Lambs",
      runtimeMins: 120,
      screening: {
        create: {
          startsAt: new Date("June 7, 2022 22:15:00"),
          screen: {
            create: {
              number: 1,
            },
          },
        },
      },
    },
    include: {
      screening: true,
    },
  });

  console.log("Movie created", createdMovie);

  const createdTicket = await prisma.ticket.create({
    data: {
      customerId: createdCustomer.id,
      screeningId: createdMovie.screening[0].id,
    },
  });

  console.log("Ticket created", createdTicket);

  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
