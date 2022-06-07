const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdCustomer = await prisma.customer.create({
    data: {
      name: "Alice",
    },
  });

  const createdContact = await prisma.contact.create({
    data: {
      phone: "023479082347190",
      email: "alice@fake.com",
      customerId: createdCustomer.id,
    },
  });

  const createdScreen = await prisma.screen.create({
    data: {
      number: 1,
    },
  });

  const createdMovie = await prisma.movie.create({
    data: {
      title: "Capitan Fantastic",
      runtimeMins: 118,
    },
  });

  const createdScreening = await prisma.screening.create({
    data: {
      startsAt: new Date("June 7, 2022 22:15:00"),
      movieId: createdMovie.id,
      screenId: createdScreen.id,
    },
  });

  const createdTicket = await prisma.ticket.create({
    data: {
      customerId: createdCustomer.id,
      screeningId: createdScreening.id,
    },
  });

  console.log("Customer created", createdCustomer);
  console.log("Contact created", createdContact);
  console.log("Screen created", createdScreen);
  console.log("Movie created", createdMovie);
  console.log("Screening created", createdScreening);
  console.log("Ticket created", createdTicket);

  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
