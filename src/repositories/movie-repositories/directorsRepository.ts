import { Director } from "@/protocols.js";
import prisma from "@/database/db.js";

async function getDirectorByName(name: string): Promise<Director | null> {
  return prisma.directors.findFirst({ where: { name } });
}

async function newDirector(name: string): Promise<Director> {
  return prisma.directors.create({
    data: { name },
  });
}

export const directorRepository = {
  getDirectorByName,
  newDirector,
};
