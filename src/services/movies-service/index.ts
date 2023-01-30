import { Filters, MovieBody, MovieToDb, MoviesFromDb, QueryFilters } from "@/protocols";
import {
  actorsRepository,
  directorRepository,
  genreRepository,
  moviesRepository,
} from "@/repositories/movie-repositories";

import { Movie } from "@prisma/client";

async function checkActors(actors: { name: string }[]): Promise<void> {
  for (const actor of actors) {
    const actorExists = await actorsRepository.getActorByName(actor.name);

    if (!actorExists) await actorsRepository.insertActor(actor.name);
  }
}

async function checkDirector(director: string): Promise<string> {
  const directorExists = await directorRepository.getDirectorByName(director);
  if (directorExists) {
    const director_name = directorExists.name;
    return director_name;
  } else {
    const director_name = (await directorRepository.newDirector(director)).name;
    return director_name;
  }
}

async function checkGenres(genres: { name: string }[]): Promise<void> {
  for (const genre of genres) {
    const genreExists = await genreRepository.getGenreByName(genre.name);

    if (!genreExists) await genreRepository.insertGenre(genre.name);
  }
}

async function getAllMovies(queryParams: QueryFilters): Promise<MoviesFromDb[]> {
  const filters: Filters = { limit: 40, offset: 0, orderBy: "id", order: "desc" };

  if (queryParams.limit) filters.limit = Number(queryParams.limit);
  if (queryParams.offset) filters.offset = Number(queryParams.offset);
  if (queryParams.orderBy) filters.orderBy = queryParams.orderBy;
  if (queryParams.order) filters.order = queryParams.order;

  const movies = await moviesRepository.getAllMovies(filters);

  return movies;
}

async function insertNewMovie(movieBody: MovieBody): Promise<Movie> {
  const genres: Genre[] = movieBody.genres.map((genre: string) => {
    return { name: genre.toLowerCase() };
  });
  const actors: Actor[] = movieBody.actors.map((actor: string) => {
    return { name: actor.toLowerCase() };
  });

  const director: string = await checkDirector(movieBody.director);
  await checkGenres(genres);
  await checkActors(actors);

  const movie: MovieToDb = { ...movieBody, director, genres, actors };
  const newMovie = await moviesRepository.insertMovie(movie);
  return newMovie;
}

export const moviesServices = {
  checkActors,
  checkDirector,
  checkGenres,
  getAllMovies,
  insertNewMovie,
};

export type Genre = { name: string };
export type Actor = { name: string };
