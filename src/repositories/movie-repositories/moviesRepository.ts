import { MovieToDb, MoviesFromDb } from "@/protocols";

import { Movie } from "@prisma/client";
import prisma from "@/database/db";

async function insertMovie(movie: MovieToDb): Promise<Movie> {
  const { title, description, year, director_id, poster, genres, actors } = movie;
  return prisma.movie.create({
    data: {
      title,
      description,
      year,
      director_id,
      poster,
      genres: {
        connect: genres,
      },
      actors: {
        connect: actors,
      },
    },
  });
}

async function getMovieByTitle(title: string): Promise<Movie | null> {
  return prisma.movie.findUnique({
    where: { title },
  });
}

async function getAllMovies(limit: number, offset: number): Promise<MoviesFromDb[]> {
  const movies = await prisma.movie.findMany({
    include: { director: true, genres: true, actors: true },
    take: limit,
    skip: offset,
  });
  return movies.map((movie) => {
    return {
      ...movie,
      director: movie.director.name,
      genres: movie.genres.map((genre) => genre.name),
      actors: movie.actors.map((actor) => actor.name),
    };
  });
}

export const moviesRepository = {
  insertMovie,
  getAllMovies,
  getMovieByTitle,
};
