import { Request, Response, Router } from "express";
import { checkMovieExists, validateMovieSchema } from "@/middlewares";

import { getAllMovies } from "@/controllers";
import { moviesServices } from "@/services";

const moviesRouter = Router();

moviesRouter
  .post("/movies", validateMovieSchema, checkMovieExists, moviesServices.insertNewMovie)
  .get("/movies", getAllMovies)
  .put("/movie/:id", (req: Request, res: Response) => res.sendStatus(501));

export { moviesRouter };
