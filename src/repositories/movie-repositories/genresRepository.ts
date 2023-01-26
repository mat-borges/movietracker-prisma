import { Genre } from "@/protocols.js";
import prisma from "@/database/db.js";

async function insertGenre(genre: string): Promise<Genre> {
  // return connection.query("INSERT INTO genres (name) VALUES ($1) RETURNING id AS genre_id;", [genre]);
  return prisma.genres.create({
    data: { name: genre },
  });
}

async function getGenreByName(genre: string): Promise<Genre | null> {
  // return connection.query("SELECT id AS genre_id FROM genres WHERE name=$1;", [genre]);
  return prisma.genres.findFirst({
    where: { name: genre },
  });
}

// async function relateGenreMovie(movie_id: number, genre_id: number) {
//   // return connection.query("INSERT INTO movie_genre (movie_id, genre_id) VALUES ($1, $2);", [movie_id, genre_id]);
//   return prisma.genres.
// }

export const genreRepository = {
  insertGenre,
  getGenreByName,
};
