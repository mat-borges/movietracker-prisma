import { Request, Response } from "express";

import httpStatus from "http-status";
import sessionRepository from "@/repositories/session-repositories";
import userRepository from "@/repositories/users-repositories";

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = res.locals.user;

  try {
    await userRepository.registerUser(name, email, password);
    res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function signIn(req: Request, res: Response) {
  const { token } = res.locals;
  const { user_id, name, email } = res.locals.user;

  try {
    res.status(httpStatus.OK).send({ token, user_id, name, email });
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function signOut(req: Request, res: Response) {
  const { token } = res.locals;
  try {
    await sessionRepository.closeSession(token);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
