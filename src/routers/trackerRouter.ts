import { Request, Response, Router } from "express";

const trackerRouter = Router();

trackerRouter
  .get("/tracker", (req: Request, res: Response) => res.sendStatus(501))
  .post("/tracker/:id", (req: Request, res: Response) => res.sendStatus(501))
  .delete("/tracker/:id", (req: Request, res: Response) => res.sendStatus(501));

export { trackerRouter };
