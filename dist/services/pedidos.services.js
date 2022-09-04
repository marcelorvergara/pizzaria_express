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
const pedidos_repository_1 = __importDefault(require("../repositories/pedidos.repository"));
const helper_1 = __importDefault(require("../helpers/helper"));
function getPedidos() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield pedidos_repository_1.default.getPedidos();
    });
}
function insertPedido(pedido) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield pedidos_repository_1.default.insertPedido(pedido);
    });
}
function updatePedido(pedido) {
    return __awaiter(this, void 0, void 0, function* () {
        // validar se o pedido existe
        const pedidos = yield getPedidos();
        const idx = helper_1.default.chekcExist(pedidos, pedido);
        // atualização dos campos
        pedidos[idx].cliente = pedido.cliente;
        pedidos[idx].produto = pedido.produto;
        pedidos[idx].valor = pedido.valor;
        pedidos[idx].entregue = pedido.entregue;
        // enviar para o repositório
        const upPedido = yield pedidos_repository_1.default.updatePedido(pedidos[idx], idx);
        return upPedido;
    });
}
function updateStatus(pedido) {
    return __awaiter(this, void 0, void 0, function* () {
        // validar se o pedido existe
        const pedidos = yield getPedidos();
        const idx = helper_1.default.chekcExist(pedidos, pedido);
        // atualização do status
        pedidos[idx].entregue = pedido.entregue;
        // enviar para o repositório
        const upPedido = yield pedidos_repository_1.default.updateStatus(pedidos[idx], idx);
        return upPedido;
    });
}
function deletePedido(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield pedidos_repository_1.default.deletePedido(id);
    });
}
function consultaPedido(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const pedidos = yield getPedidos();
        const pedido = pedidos.find((f) => f.id === id);
        return pedido;
    });
}
function consultaPedidosCliente(cliente) {
    return __awaiter(this, void 0, void 0, function* () {
        const pedidos = yield getPedidos();
        let tot = 0;
        for (let pedido of pedidos) {
            if (pedido.cliente === cliente && pedido.entregue) {
                tot += pedido.valor;
            }
        }
        return tot;
    });
}
function consultaPedidosProduto(produto) {
    return __awaiter(this, void 0, void 0, function* () {
        const pedidos = yield getPedidos();
        let tot = 0;
        for (let pedido of pedidos) {
            if (pedido.produto === produto && pedido.entregue) {
                tot += pedido.valor;
            }
        }
        return tot;
    });
}
function getMaisPedidos() {
    return __awaiter(this, void 0, void 0, function* () {
        const pedidos = yield getPedidos();
        const reduced = pedidos.reduce(function (r, a) {
            r[a.produto] = (r[a.produto] || 0) + 1;
            return r;
        }, {});
        const sorted = Object.fromEntries(Object.entries(reduced).sort(([, a], [, b]) => b - a));
        return sorted;
    });
}
exports.default = {
    getPedidos,
    insertPedido,
    updatePedido,
    updateStatus,
    deletePedido,
    consultaPedido,
    consultaPedidosCliente,
    consultaPedidosProduto,
    getMaisPedidos,
};
