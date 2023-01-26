import { Actor } from "@/protocols.js";
import prisma from "@/database/db.js";

async function insertActor(name: string): Promise<Actor> {
  return prisma.actors.create({
    data: { name },
  });
}

async function getActorByName(name: string): Promise<Actor | null> {
  // return connection.query("SELECT id AS actor_id FROM actors WHERE name=$1;", [name]);
  return prisma.actors.findFirst({
    where: { name },
  });
}

// async function relateActorMovie(movie_id: number, actor_id: number) {
//   // return connection.query("INSERT INTO actor_movie (movie_id, actor_id) VALUES ($1, $2);", [movie_id, actor_id]);
//   return prisma.actor_movie.create({
//     where: { movie_id, actor_id },
//   });
// }

export const actorsRepository = {
  insertActor,
  getActorByName,
};
