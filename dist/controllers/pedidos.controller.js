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
const pedidos_services_1 = __importDefault(require("../services/pedidos.services"));
function getPedidos(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jsonData = yield pedidos_services_1.default.getPedidos();
            // log
            logger.info(`GET /pedidos`);
            res.send(jsonData);
        }
        catch (err) {
            next(err);
        }
    });
}
function insertPedido(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let pedido = req.body;
            // validação
            if (!pedido.cliente || pedido.valor === null || !pedido.produto) {
                throw new Error("Campos obrigatórios: cliente, valor e o produto!");
            }
            // enviando ao service
            pedido = yield pedidos_services_1.default.insertPedido(pedido);
            // log
            logger.info(`POST /pedido/novoPedido - ${JSON.stringify(pedido)}`);
            res.send(pedido);
        }
        catch (err) {
            next(err);
        }
    });
}
function updatePedido(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let pedido = req.body;
            // validação
            if (pedido.id === null ||
                !pedido.cliente ||
                pedido.valor === null ||
                !pedido.produto ||
                typeof pedido.entregue !== "boolean") {
                throw new Error("Campos obrigatórios: id, cliente, valor, entregue (boolean) e o produto!");
            }
            // log
            logger.info(`POST /pedido/updatePedido - ${JSON.stringify(pedido)}`);
            // enviando para o service
            res.send(yield pedidos_services_1.default.updatePedido(pedido));
        }
        catch (err) {
            next(err);
        }
    });
}
function updateStatus(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let pedido = req.body;
            // validação
            if (pedido.id === null || typeof pedido.entregue !== "boolean") {
                throw new Error("Campos obrigatórios: id e entregue (boolean)!");
            }
            // log
            logger.info(`POST /pedido/updateStatus - ${JSON.stringify(pedido)}`);
            // enviando para o service
            res.send(yield pedidos_services_1.default.updateStatus(pedido));
        }
        catch (err) {
            next(err);
        }
    });
}
function deletePedido(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.params.id);
            // validação
            if (isNaN(parseInt(req.params.id))) {
                throw new Error("Campos obrigatórios: id (/deletePedido/{id})!");
            }
            yield pedidos_services_1.default.deletePedido(parseInt(req.params.id));
            // log
            logger.info(`DELETE /deletePedido/${req.params.id}`);
            res.end();
        }
        catch (err) {
            next(err);
        }
    });
}
function consultaPedido(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // validação
            if (isNaN(parseInt(req.params.id))) {
                throw new Error("Campos obrigatórios: id (/consultaPedido/{id})!");
            }
            const pedido = yield pedidos_services_1.default.consultaPedido(parseInt(req.params.id));
            // log
            logger.info(`GET /consultaPedido/${req.params.id}`);
            res.send(pedido);
        }
        catch (err) {
            next(err);
        }
    });
}
function consultaPedidosCliente(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            // validação
            if (!body.cliente) {
                throw new Error("Campo obrigatório: cliente (string)!");
            }
            // log
            logger.info(`POST /consultaPedidosCliente/- ${JSON.stringify(body)}`);
            res.send((yield pedidos_services_1.default.consultaPedidosCliente(body.cliente)).toString());
        }
        catch (err) {
            next(err);
        }
    });
}
function consultaPedidosProduto(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            // validação
            if (!body.produto) {
                throw new Error("Campo obrigatório: produto (string)!");
            }
            // log
            logger.info(`POST /consultaPedidosProduto/- ${JSON.stringify(body)}`);
            res.send((yield pedidos_services_1.default.consultaPedidosProduto(body.produto)).toString());
        }
        catch (err) {
            next(err);
        }
    });
}
function getMaisPedidos(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jsonData = yield pedidos_services_1.default.getMaisPedidos();
            // log
            logger.info(`GET /maisPedidos`);
            res.send(jsonData);
        }
        catch (err) {
            next(err);
        }
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
