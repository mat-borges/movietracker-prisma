import { NextFunction, Request, Response } from "express";

import { MovieBody } from "@/protocols";
import { movieSchema } from "@/schemas";
import { moviesRepository } from "@/repositories/movie-repositories";

export function validateMovieSchema(req: Request, res: Response, next: NextFunction) {
  const { title, description, year, director, poster, actors, genres }: MovieBody = req.body;

  const movie: MovieBody = {
    title: title.toLowerCase(),
    description,
    year: Number(year),
    director: director.toLowerCase(),
    actors: actors.map((actor) => actor.toLowerCase()),
    poster,
    genres: genres.map((genre) => genre.toLowerCase()),
  };

  const { error } = movieSchema.validate(movie, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send({ errors });
  } else {
    res.locals.movie = movie;
    next();
  }
}

export async function checkMovieExists(req: Request, res: Response, next: NextFunction) {
  const { title }: { title: string } = res.locals.movie;
  const movieExists = await moviesRepository.getMovieByTitle(title);
  if (movieExists) {
    res.status(409).send({ error: `There's a movie with this title already (id:${movieExists.id})` });
  } else {
    next();
  }
}
