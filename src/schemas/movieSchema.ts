import Joi from "joi";
import { MoviesFromDb } from "@/protocols";

export const movieSchema = Joi.object<MoviesFromDb>({
  title: Joi.string().required().label("movie title"),
  description: Joi.string().required().label("description"),
  year: Joi.number().integer().required().label("year"),
  genres: Joi.array().items(Joi.string(), Joi.number().integer()).required().label("genre(s)"),
  director: Joi.string().required().label("director"),
  actors: Joi.array().items(Joi.string(), Joi.number().integer()).required().label("actor(s)"),
  poster: Joi.string().uri().required().label("poster"),
});
