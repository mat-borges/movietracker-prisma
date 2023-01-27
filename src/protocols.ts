import { Movie } from "@prisma/client";

export type MovieBody = Omit<Movie, "id" | "director_id"> & {
  director: string;
  actors: string[];
  genres: string[];
};

export type MovieToDb = Omit<Movie, "id"> & {
  director: string;
  actors: { name: string }[];
  genres: { name: string }[];
};

export type MoviesFromDb = Omit<MovieBody, "actors" | "genres"> & {
  id?: number;
  director_id: number;
  genres: string[];
  actors: string[];
};
