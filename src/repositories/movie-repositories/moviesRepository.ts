import { Filters, MovieToDb, MoviesFromDb } from "@/protocols";

import { Movie } from "@prisma/client";
import prisma from "@/database/db";

async function insertMovie(movie: MovieToDb): Promise<Movie> {
  const { title, description, year, director, poster, genres, actors } = movie;
  return prisma.movie.create({
    data: {
      title,
      description,
      year,
      director,
      poster,
      genres: {
        connect: genres,
      },
      actors: {
        connect: actors,
      },
    },
    include: {
      genres: true,
      actors: true,
    },
  });
}

async function getMovieByTitle(title: string): Promise<Movie | null> {
  return prisma.movie.findUnique({
    where: { title },
  });
}

async function getAllMovies(filters: Filters): Promise<MoviesFromDb[]> {
  const movies = await prisma.movie.findMany({
    include: { genres: true, actors: true },
    take: filters.limit,
    skip: filters.offset,
    orderBy: { [filters.orderBy]: filters.order },
  });
  return movies.map((movie) => {
    return {
      ...movie,
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
