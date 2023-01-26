import { Session } from "@/protocols.js";
import prisma from "@/database/db.js";

async function closeSession(token: string): Promise<Session> {
  return prisma.sessions.delete({
    where: { token },
  });
}

async function checkSession(email: string): Promise<(Session & { users: { email: string } }) | null> {
  return prisma.sessions.findFirst({
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
  return prisma.sessions.create({
    data: { user_id, token },
  });
}

async function getSessionByToken(token: string): Promise<Session | null> {
  return prisma.sessions.findUnique({
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
