import pino from "pino";
import pretty from "pino-pretty";

const stream = pretty({
  colorize: true,
  translateTime: "SYS:mm/dd HH:MM:ss",
  ignore: "pid,hostname",
});

const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
  },
  stream
);

export default logger;
