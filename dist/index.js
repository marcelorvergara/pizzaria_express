"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pedidos_routes_1 = __importDefault(require("./routes/pedidos.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = require("fs");
const winston_1 = __importDefault(require("winston"));
const { readFile } = fs_1.promises;
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
// global
globalThis.fileName = "./db/pedidos.json";
// losgs
const { combine, timestamp, label, printf } = winston_1.default.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
globalThis.logger = winston_1.default.createLogger({
    level: "silly",
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: "./public/pedidos.log" }),
    ],
    format: combine(label({ label: "pedidos já" }), timestamp(), myFormat),
});
app.use("/log", express_1.default.static("public"));
// router
app.use("/pedidos", pedidos_routes_1.default);
app.get("/", (req, res) => {
    res.send("Express + Typescript Server");
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield readFile(fileName);
        console.log(`[server]: Server is running at http://localhost:${port} and file loaded`);
    }
    catch (err) {
        console.error(err);
    }
}));
