import Joi from "joi";
import { User } from "@prisma/client";

export const signUpSchema = Joi.object<User>({
  name: Joi.string().required().trim().label("name"),
  email: Joi.string().email().required().label("email"),
  password: Joi.string().min(3).max(70).required().label("password"),
});

export const signInSchema = Joi.object<Pick<User, "email" | "password">>({
  email: Joi.string().email().required().label("email"),
  password: Joi.string().min(3).max(70).required().label("senha"),
});
