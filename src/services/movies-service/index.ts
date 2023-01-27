import { MovieBody, MovieToDb } from "@/protocols";
import { Request, Response } from "express";
import { checkActorsExists, checkDirectorExists, checkGenresExists } from "@/controllers";

import { moviesRepository } from "@/repositories/movie-repositories";

async function insertNewMovie(req: Request, res: Response) {
  const movieBody: MovieBody = res.locals.movie;
  const genres = res.locals.movie.genres.map((genre: string) => {
    return { name: genre };
  });
  const actors = res.locals.movie.actors.map((actor: string) => {
    return { name: actor };
  });

  try {
    const director: string = await checkDirectorExists(movieBody.director);
    const movie: MovieToDb = { ...movieBody, director, genres, actors };

    await checkGenresExists(genres);
    await checkActorsExists(actors);
    await moviesRepository.insertMovie(movie);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export const moviesServices = {
  insertNewMovie,
};
