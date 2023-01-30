import { authRouter, moviesRouter, trackerRouter } from "@/routers";
import express, { json } from "express";

import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = express();

server.use(cors()).use(json()).use(authRouter).use("/movies", moviesRouter).use("/tracker", trackerRouter);

const port = process.env.PORT;
server.listen(port, () => console.log(`Running server on http://locahost:${port}`));
