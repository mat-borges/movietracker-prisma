import { Request, Response, Router } from "express";
import { checkMovieExists, validateMovieSchema } from "@/middlewares";

import { insertNewMovie } from "@/services";

const moviesRouter = Router();

moviesRouter
  .post("/movies", validateMovieSchema, checkMovieExists, insertNewMovie)
  .get("/movies", (req: Request, res: Response) => res.sendStatus(501))
  .put("/movie/:id", (req: Request, res: Response) => res.sendStatus(501));

export { moviesRouter };
