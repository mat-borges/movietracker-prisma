import { Movie } from "@prisma/client";

export type MovieBody = Omit<Movie, "id"> & {
  actors: string[];
  genres: string[];
};

export type MovieToDb = Omit<Movie, "id"> & {
  actors: { name: string }[];
  genres: { name: string }[];
};

export type MoviesFromDb = Movie & {
  genres: string[];
  actors: string[];
};
