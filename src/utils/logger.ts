import pinoHttp from "pino-http";
import pino from "pino";
import dayjs from "dayjs";
import config from "../config";
import { Request, Response } from "express";
import fs from "fs";

const { rootPath } = config;

if (!fs.existsSync("./logs")) {
  fs.mkdirSync("./logs");
}

const LOG_PATH = rootPath.resolve("/logs/combined.log");

const streams = [
  { stream: process.stdout },
  { stream: pino.destination(LOG_PATH) },
];

const transport = {
  target: "pino-pretty",
  options: {
    colorize: true,
    singleLine: true,
    ignore: "pid,hostname",
  },
};

const logger = pino({
  transport,
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

const loggerMiddleware = pinoHttp(
  {
    transport,
    base: { pid: false },
    timestamp: () => `,"time":"${dayjs().format()}"`,
    serializers: {
      req(req: Request) {
        const { method, url, query, params } = req;
        return { request: `${method}:${url}`, query, params };
      },
      res(res: Response) {
        const { statusCode } = res;
        return { statusCode };
      },
    },
  },
  pino.multistream(streams)
);

export { logger, loggerMiddleware };
