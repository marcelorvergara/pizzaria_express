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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const { readFile, writeFile } = fs_1.promises;
function getPedidos() {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonData = JSON.parse((yield readFile(globalThis.fileName)).toString());
        return jsonData.pedidos;
    });
}
function insertPedido(pedido) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonData = JSON.parse((yield readFile(globalThis.fileName)).toString());
        // atribuir o id, incrementar o id e colocar em primeiro lugar no obj
        const newPedido = {
            id: jsonData.nextId++,
            produto: pedido.produto,
            cliente: pedido.cliente,
            valor: pedido.valor,
            entregue: false,
            timestamp: new Date(),
        };
        // adicionar ao array o novo pedido
        jsonData.pedidos.push(newPedido);
        // escrever no arquivo a nova conta
        yield writeFile(globalThis.fileName, JSON.stringify(jsonData, null, 2));
        return newPedido;
    });
}
function updatePedido(pedido, idx) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonData = JSON.parse((yield readFile(globalThis.fileName)).toString());
        jsonData.pedidos.splice(idx, 1, pedido);
        yield writeFile(globalThis.fileName, JSON.stringify(jsonData, null, 2));
        return jsonData.pedidos[idx];
    });
}
function updateStatus(pedido, idx) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonData = JSON.parse((yield readFile(globalThis.fileName)).toString());
        jsonData.pedidos.splice(idx, 1, pedido);
        yield writeFile(globalThis.fileName, JSON.stringify(jsonData, null, 2));
        return jsonData.pedidos[idx];
    });
}
function deletePedido(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonData = JSON.parse((yield readFile(globalThis.fileName)).toString());
        jsonData.pedidos = jsonData.pedidos.filter((pedido) => pedido.id !== id);
        console.log(jsonData);
        yield writeFile(globalThis.fileName, JSON.stringify(jsonData, null, 2));
    });
}
exports.default = {
    getPedidos,
    insertPedido,
    updateStatus,
    deletePedido,
    updatePedido,
};
