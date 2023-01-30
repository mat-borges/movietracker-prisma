import { Request, Response, Router } from "express";
import { checkMovieExists, validateMovieSchema } from "@/middlewares";
import { getAllMovies, insertNewMovie } from "@/controllers";

const moviesRouter = Router();

moviesRouter
  .post("/", validateMovieSchema, checkMovieExists, insertNewMovie)
  .get("/", getAllMovies)
  .put("/:id", (req: Request, res: Response) => res.sendStatus(501));

export { moviesRouter };
