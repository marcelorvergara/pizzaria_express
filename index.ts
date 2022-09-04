import express, { Express, Request, Response } from "express";
import pedidosRouter from "./routes/pedidos.routes";
import dotenv from "dotenv";
import { promises as fs } from "fs";
import winston from "winston";
const { readFile } = fs;

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

// global
globalThis.fileName = "./db/pedidos.json";

// losgs
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
globalThis.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "./public/pedidos.log" }),
  ],
  format: combine(label({ label: "pedidos já" }), timestamp(), myFormat),
});
app.use("/log", express.static("public"));

// router
app.use("/pedidos", pedidosRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server");
});

app.listen(port, async () => {
  try {
    await readFile(fileName);
    console.log(
      `[server]: Server is running at http://localhost:${port} and file loaded`
    );
  } catch (err) {
    console.error(err);
  }
});
