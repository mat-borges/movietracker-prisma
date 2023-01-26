import { authRouter, moviesRouter, trackerRouter } from "@/routers";
import express, { json } from "express";

import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = express();

server.use(cors()).use(json()).use(authRouter).use(moviesRouter).use(trackerRouter);

const port = String(process.env.PORT);
server.listen(port, () => console.log(`Running server on http://locahost:${port}`));