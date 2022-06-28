import express from "express";
// import { loggerMiddleware } from "./utils/logger";
require("express-async-errors");

const app = express();

app.use(express.json());

// app.use(loggerMiddleware);

export default app;
