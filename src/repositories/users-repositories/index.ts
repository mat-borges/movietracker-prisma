import { User } from "@prisma/client";
import prisma from "@/database/db";

async function registerUser(name: string, email: string, password: string): Promise<User> {
  return prisma.user.create({
    data: { name, email, password },
  });
}

async function checkEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

const userRepository = {
  registerUser,
  checkEmail,
};

export default userRepository;
