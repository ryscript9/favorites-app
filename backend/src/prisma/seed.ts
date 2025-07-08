import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.entry.createMany({
    data: [
      {
        title: "Inception",
        type: "Movie",
        director: "Christopher Nolan",
        budget: "160 million USD",
        location: "USA, UK",
        duration: "148 minutes",
        yearTime: "2010",
      },
      {
        title: "Breaking Bad",
        type: "TV Show",
        director: "Vince Gilligan",
        budget: "3 million USD per episode",
        location: "USA",
        duration: "47 minutes",
        yearTime: "2008-2013",
      },
      {
        title: "Parasite",
        type: "Movie",
        director: "Bong Joon-ho",
        budget: "11 million USD",
        location: "South Korea",
        duration: "132 minutes",
        yearTime: "2019",
      },
      {
        title: "Game of Thrones",
        type: "TV Show",
        director: "Various",
        budget: "15 million USD per episode",
        location: "Northern Ireland",
        duration: "60 minutes",
        yearTime: "2011-2019",
      },
      {
        title: "The Dark Knight",
        type: "Movie",
        director: "Christopher Nolan",
        budget: "185 million USD",
        location: "USA, UK",
        duration: "152 minutes",
        yearTime: "2008",
      },
      {
        title: "Stranger Things",
        type: "TV Show",
        director: "The Duffer Brothers",
        budget: "30 million USD per season",
        location: "USA",
        duration: "50 minutes",
        yearTime: "2016-present",
      },
      {
        title: "Interstellar",
        type: "Movie",
        director: "Christopher Nolan",
        budget: "165 million USD",
        location: "USA, Iceland",
        duration: "169 minutes",
        yearTime: "2014",
      },
      {
        title: "Friends",
        type: "TV Show",
        director: "David Crane",
        budget: "10 million USD per episode",
        location: "USA",
        duration: "22 minutes",
        yearTime: "1994-2004",
      },
      {
        title: "The Matrix",
        type: "Movie",
        director: "The Wachowskis",
        budget: "63 million USD",
        location: "Australia, USA",
        duration: "136 minutes",
        yearTime: "1999",
      },
      {
        title: "The Crown",
        type: "TV Show",
        director: "Stephen Daldry",
        budget: "13 million USD per episode",
        location: "UK",
        duration: "58 minutes",
        yearTime: "2016-present",
      },
      {
        title: "La La Land",
        type: "Movie",
        director: "Damien Chazelle",
        budget: "30 million USD",
        location: "USA",
        duration: "128 minutes",
        yearTime: "2016",
      },
      {
        title: "Sherlock",
        type: "TV Show",
        director: "Various",
        budget: "1.5 million USD per episode",
        location: "UK",
        duration: "90 minutes",
        yearTime: "2010-2017",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
