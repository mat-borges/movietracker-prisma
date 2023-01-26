export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
};

export type Session = {
  id?: number;
  user_id: number;
  token: string;
  created_at: Date | string;
};

export type Movie = {
  title: string;
  description: string;
  year: number;
  poster: string;
  director: number;
  genres: string[];
  actors: string[];
};

export type MovieFromDb = Omit<Movie, "director" | "genres" | "actors"> & {
  id?: number;
  // director: number;
  // genres: number[];
  // actors: number[];
};

export type Actor = { id?: number; name: string };

export type Director = Actor;

export type Genre = Actor;
