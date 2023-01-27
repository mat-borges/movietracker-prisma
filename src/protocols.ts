import { Movie } from "@prisma/client";
import { number } from "joi";

export type MoviesFromDb = Movie & {
  genres: string[];
  actors: string[];
};

export type MovieToDb = Omit<Movie, "id"> & {
  actors: { name: string }[];
  genres: { name: string }[];
};

export type MovieBody = Omit<MoviesFromDb, "id">;

export type Filters = {
  limit: number;
  offset: number;
  orderBy: string;
  order: "asc" | "desc";
};
