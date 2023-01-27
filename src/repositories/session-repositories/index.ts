import { Session } from "@prisma/client";
import prisma from "@/database/db";

async function closeSession(token: string): Promise<Session> {
  return prisma.session.delete({
    where: { token },
  });
}

async function checkSession(email: string): Promise<Session | null> {
  return prisma.session.findFirst({
    where: {
      users: {
        email: {
          contains: email,
        },
      },
    },
    select: {
      id: true,
      user_id: true,
      token: true,
      created_at: true,
      users: {
        select: {
          email: true,
        },
      },
    },
  });
}

async function newSession(user_id: number, token: string): Promise<Session> {
  return prisma.session.create({
    data: { user_id, token },
  });
}

async function getSessionByToken(token: string): Promise<Session | null> {
  return prisma.session.findUnique({
    where: { token },
  });
}

const sessionRepository = {
  closeSession,
  checkSession,
  newSession,
  getSessionByToken,
};

export default sessionRepository;
