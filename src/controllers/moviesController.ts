import { MovieBody, QueryFilters } from "@/protocols";
import { Request, Response } from "express";

import httpStatus from "http-status";
import { moviesServices } from "@/services";

export async function insertNewMovie(req: Request, res: Response) {
  const movieBody = req.body as MovieBody;

  try {
    const newMovie = await moviesServices.insertNewMovie(movieBody);
    res.status(httpStatus.OK).send(newMovie);
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getAllMovies(req: Request, res: Response) {
  const queryParams = req.query as QueryFilters;

  try {
    const movies = await moviesServices.getAllMovies(queryParams);
    res.status(httpStatus.OK).send(movies);
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
