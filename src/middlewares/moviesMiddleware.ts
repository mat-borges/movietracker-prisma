import { NextFunction, Request, Response } from "express";

import { movieSchema } from "@/schemas";
import { moviesRepository } from "@/repositories/movie-repositories";

export function validateMovieSchema(req: Request, res: Response, next: NextFunction) {
  const { title, description, year, genres, director, actors, poster } = req.body;
  const movie = {
    title: title.toLowerCase(),
    description,
    year: Number(year),
    genres,
    director,
    actors,
    poster,
  };
  const { error } = movieSchema.validate(movie, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail: any) => detail.message);
    res.status(422).send({ errors });
  } else {
    res.locals.movie = movie;
    next();
  }
}

export async function checkMovieExists(req: Request, res: Response, next: NextFunction) {
  const { title }: { title: string } = res.locals.movie;
  const movieExists = (await moviesRepository.getMovieByName(title)).rows[0];
  if (movieExists) {
    res.status(409).send({ error: `There's a movie with this title already (id:${movieExists.movie_id})` });
  } else {
    next();
  }
}
