import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { router } from "./routes";

import "./database";
import { handleErrors } from "./middlewares/handleErrors";

const app = express();

app.use(express.json());

app.use(router);

app.use(handleErrors);

app.listen(3000, () => console.log("Server is running"));
