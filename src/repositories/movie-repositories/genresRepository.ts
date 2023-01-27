import { Genre } from "@prisma/client";
import prisma from "@/database/db";

async function insertGenre(genre: string): Promise<Genre> {
  return prisma.genre.create({
    data: { name: genre },
  });
}

async function getGenreByName(genre: string): Promise<Genre | null> {
  return prisma.genre.findUnique({
    where: { name: genre },
  });
}

export const genreRepository = {
  insertGenre,
  getGenreByName,
};
