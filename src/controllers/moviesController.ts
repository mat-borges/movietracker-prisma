import { Request, Response } from "express";

import { Filters } from "@/protocols";
import { actorsRepository } from "@/repositories/movie-repositories/actorsRepository";
import { directorRepository } from "@/repositories/movie-repositories/directorsRepository";
import { genreRepository } from "@/repositories/movie-repositories/genresRepository";
import { moviesRepository } from "@/repositories/movie-repositories";

export async function checkDirectorExists(director: string): Promise<string> {
  const directorExists = await directorRepository.getDirectorByName(director);
  if (directorExists) {
    const director_name = directorExists.name;
    return director_name;
  } else {
    const director_name = (await directorRepository.newDirector(director)).name;
    return director_name;
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
  const query: { limit?: number; offset?: number; orderBy?: string; order?: "asc" | "desc" } = req.query;
  const filters: Filters = { limit: 40, offset: 0, orderBy: "id", order: "desc" };

  if (query.limit) filters.limit = Number(query.limit);
  if (query.offset) filters.offset = Number(query.offset);
  if (query.orderBy) filters.orderBy = query.orderBy;
  if (query.order) filters.order = query.order;
  try {
    const movies = await moviesRepository.getAllMovies(filters);
    res.send(movies);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
