import { User } from "protocols.js";
import prisma from "@/database/db.js";

async function registerUser(name: string, email: string, password: string): Promise<User> {
  return prisma.users.create({
    data: { name, email, password },
  });
}

async function checkEmail(email: string): Promise<User | null> {
  return prisma.users.findUnique({
    where: { email },
  });
}

const userRepository = {
  registerUser,
  checkEmail,
};

export default userRepository;
