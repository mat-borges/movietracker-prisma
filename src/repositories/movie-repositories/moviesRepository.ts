import { MovieFromDb } from "protocols.js";
import prisma from "@/database/db.js";

async function insertMovie(
  title: string,
  description: string,
  year: number,
  director: number,
  poster: string,
): Promise<MovieFromDb> {
  return prisma.movies.create({
    data: { title, description, year, director, poster },
  });
}

async function getMovieByTitle(title: string): Promise<MovieFromDb[]> {
  return prisma.movies.findMany({
    where: { title },
  });
}

async function getAllMovies(limit: number, offset: number): Promise<MovieFromDb[]> {
  return prisma.movies.findMany({
    take: limit,
    skip: offset,
  });
}

export const moviesRepository = {
  insertMovie,
  getAllMovies,
  getMovieByTitle,
};
