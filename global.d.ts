import { Logger } from "winston";

export declare global {
  declare module globalThis {
    // variáveis globais
    var fileName: string;
    var logger: Logger;
  }
}
