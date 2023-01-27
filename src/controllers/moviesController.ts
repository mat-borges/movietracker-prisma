import { Request, Response } from "express";

import { actorsRepository } from "@/repositories/movie-repositories/actorsRepository";
import { directorRepository } from "@/repositories/movie-repositories/directorsRepository";
import { genreRepository } from "@/repositories/movie-repositories/genresRepository";
import { moviesRepository } from "@/repositories/movie-repositories";

export async function checkDirectorExists(director: string): Promise<number> {
  const directorExists = await directorRepository.getDirectorByName(director);
  if (directorExists) {
    const director_id = Number(directorExists.id);
    return director_id;
  } else {
    const director_id = Number((await directorRepository.newDirector(director)).id);
    return director_id;
  }
}

export async function checkGenresExists(genres: { name: string }[]): Promise<void> {
  for (const genre of genres) {
    const genreExists = await genreRepository.getGenreByName(genre.name);

    if (!genreExists) {
      await genreRepository.insertGenre(genre.name);
    }
  }
}

export async function checkActorsExists(actors: { name: string }[]): Promise<void> {
  for (const actor of actors) {
    const actorExists = await actorsRepository.getActorByName(actor.name);

    if (!actorExists) {
      await actorsRepository.insertActor(actor.name);
    }
  }
}

export async function getAllMovies(req: Request, res: Response) {
  const query: { limit?: number; offset?: number } = req.query;
  let limit = 40;
  let offset = 0;

  if (query.limit) {
    limit = Number(query.limit);
  } else if (query.offset) {
    offset = Number(query.offset);
  }

  try {
    const movies = await moviesRepository.getAllMovies(limit, offset);
    res.send(movies);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
