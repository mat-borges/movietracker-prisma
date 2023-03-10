import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { signInSchema, signUpSchema } from "@/schemas";

import { NextFunction } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import httpStatus from "http-status";
import sessionRepository from "@/repositories/session-repositories";
import userRepository from "@/repositories/users-repositories";

dotenv.config();

export function signUpSchemaValidation(req: Request, res: Response, next: NextFunction) {
  if (!req.body) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  const { name, email, password }: { name: string; email: string; password: string } = req.body;

  const user = { name, email: email.toLowerCase(), password };

  const { error } = signUpSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ errors });
  } else {
    const hashPassword = bcrypt.hashSync(password, 12);
    res.locals.user = { ...user, password: hashPassword };
    next();
  }
}

export function signInSchemaValidation(req: Request, res: Response, next: NextFunction) {
  const { email, password }: { email: string; password: string } = req.body;
  const user = { email: email.toLowerCase(), password };
  const { error } = signInSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: errors });
  } else {
    res.locals.user = user;
    next();
  }
}

export async function checkEmailExists(req: Request, res: Response, next: NextFunction) {
  const { email }: { email: string } = res.locals.user;
  try {
    const emailExists = await userRepository.checkEmail(email);

    if (emailExists) {
      return res.sendStatus(httpStatus.CONFLICT);
    } else {
      next();
    }
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function verifyUserCredentials(req: Request, res: Response, next: NextFunction) {
  const { email, password }: { email: string; password: string } = res.locals.user;
  try {
    const user = await userRepository.checkEmail(email);
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).send({ message: "Usu??rio inv??lido!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(httpStatus.UNAUTHORIZED).send({ message: "Senha inv??lida!" });
    } else {
      res.locals.user.user_id = user.id;
      res.locals.user.name = user.name;
      next();
    }
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function sessionExists(req: Request, res: Response, next: NextFunction) {
  const { email }: { email: string } = res.locals.user;

  try {
    const sessionExist = await sessionRepository.checkSession(email);
    if (sessionExist) {
      const { token } = sessionExist;
      return res.status(httpStatus.OK).send({ token });
    } else {
      next();
    }
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function generateToken(req: Request, res: Response, next: NextFunction) {
  const { user_id, name, email }: { user_id: number; name: string; email: string } = res.locals.user;

  const token = jwt.sign({ user_id, name, email }, String(process.env.JWT_SECRET));

  try {
    await sessionRepository.newSession(user_id, token);
    res.locals.token = token;
    next();
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

  const token: string = authorization?.replace("Bearer ", "");
  try {
    const { user_id, name, email } = jwt.verify(token, String(process.env.JWT_SECRET)) as JwtPayload;
    res.locals.token = token;
    res.locals.user = { user_id, name, email };
    next();
  } catch (err) {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function verifySession(req: Request, res: Response, next: NextFunction) {
  const { token } = res.locals;

  try {
    const session = await sessionRepository.getSessionByToken(token);
    if (!session) {
      res.sendStatus(httpStatus.UNAUTHORIZED);
    } else {
      next();
    }
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
