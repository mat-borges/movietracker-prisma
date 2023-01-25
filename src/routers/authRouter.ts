import { Request, Response, Router } from "express";
import {
  checkEmailExists,
  generateToken,
  sessionExists,
  signInSchemaValidation,
  signUpSchemaValidation,
  verifyUserCredentials,
} from "@/middlewares";
import { signIn, signUp } from "@/services";

const authRouter = Router();

authRouter.post("/sign-up", signUpSchemaValidation, checkEmailExists, signUp);
authRouter.post("/sign-in", signInSchemaValidation, verifyUserCredentials, sessionExists, generateToken, signIn);
authRouter.delete("/sign-out", (req: Request, res: Response) => res.sendStatus(501));

export { authRouter };
