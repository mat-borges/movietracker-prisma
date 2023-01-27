import { Director } from "@prisma/client";
import prisma from "@/database/db";

async function getDirectorByName(name: string): Promise<Director | null> {
  return prisma.director.findUnique({
    where: { name },
  });
}

async function newDirector(name: string): Promise<Director> {
  return prisma.director.create({
    data: { name },
  });
}

export const directorRepository = {
  getDirectorByName,
  newDirector,
};
