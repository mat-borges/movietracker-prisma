import { Actor } from "@prisma/client";
import prisma from "@/database/db";

async function insertActor(name: string): Promise<Actor> {
  return prisma.actor.create({
    data: { name },
  });
}

async function getActorByName(name: string): Promise<Actor | null> {
  return prisma.actor.findUnique({
    where: { name },
  });
}

export const actorsRepository = {
  insertActor,
  getActorByName,
};
