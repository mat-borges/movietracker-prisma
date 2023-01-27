import prisma from "../src/database/db";

async function main() {
  await prisma.director.createMany({
    skipDuplicates: true,
    data: [{ name: "ryan coogler" }, { name: "steven spielberg" }, { name: "james cameron" }],
  });

  await prisma.genre.createMany({
    skipDuplicates: true,
    data: [
      { name: "action" },
      { name: "heroes" },
      { name: "marvel" },
      { name: "drama" },
      { name: "adventure" },
      { name: "classic" },
    ],
  });

  await prisma.actor.createMany({
    skipDuplicates: true,
    data: [
      { name: "michael b. jordan" },
      { name: "tenoch huerta" },
      { name: "lupita nyong'o" },
      { name: "angela basset" },
      { name: "letitia wright" },
      { name: "sam worthington" },
      { name: "zoe saldaña" },
      { name: "sigourney weaver" },
      { name: "kate winslet" },
      { name: "stephen lang" },
      { name: "laura dern" },
      { name: "jeff goldblum" },
      { name: "sam neill" },
      { name: "richard attenborough" },
      { name: "samuel l. jackson" },
      { name: "bd wong" },
    ],
  });

  await prisma.movie.upsert({
    where: { title: "black panter wakanda forever" },
    update: {},
    create: {
      title: "black panter wakanda forever",
      description: "Second movie of black panther",
      year: 2022,
      director: "ryan coogler",
      poster: "https://lumiere-a.akamaihd.net/v1/images/pp_disney_blackpanther_wakandaforever_1289_d3419b8f.jpeg",
      genres: { connect: [{ name: "action" }, { name: "heroes" }, { name: "marvel" }, { name: "drama" }] },
      actors: {
        connect: [
          { name: "michael b. jordan" },
          { name: "tenoch huerta" },
          { name: "lupita nyong'o" },
          { name: "angela basset" },
          { name: "letitia wright" },
        ],
      },
    },
  });

  await prisma.movie.upsert({
    where: { title: "avatar the way of the water" },
    update: {},
    create: {
      title: "avatar the way of the water",
      description: "Second movie of james cameron avatar",
      year: 2022,
      director: "james cameron",
      poster:
        "https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/148856/CORAL_1SHT_DIGITAL_PAYOFF_sRGB_V4.jpg",
      genres: { connect: [{ name: "action" }, { name: "drama" }] },
      actors: {
        connect: [
          { name: "sam worthington" },
          { name: "zoe saldaña" },
          { name: "sigourney weaver" },
          { name: "kate winslet" },
          { name: "stephen lang" },
        ],
      },
    },
  });

  await prisma.movie.upsert({
    where: { title: "jurassic park" },
    update: {},
    create: {
      title: "jurassic park",
      description: "classic first jurassic park",
      year: 1993,
      director: "steven spielberg",
      poster: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f00bf346385235.58520f9022451.jpg",
      genres: { connect: [{ name: "adventure" }, { name: "classic" }] },
      actors: {
        connect: [
          { name: "laura dern" },
          { name: "jeff goldblum" },
          { name: "sam neill" },
          { name: "richard attenborough" },
          { name: "samuel l. jackson" },
          { name: "bd wong" },
        ],
      },
    },
  });
}

main()
  .then(() => console.log("Registro feito com sucesso!"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
