"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pedidos_controller_1 = __importDefault(require("../controllers/pedidos.controller"));
const router = express_1.default.Router();
router.get("/", pedidos_controller_1.default.getPedidos);
router.get("/maisPedidos", pedidos_controller_1.default.getMaisPedidos);
router.post("/novoPedido", pedidos_controller_1.default.insertPedido);
router.put("/updatePedido", pedidos_controller_1.default.updatePedido);
router.patch("/updateStatus", pedidos_controller_1.default.updateStatus);
router.delete("/deletePedido/:id", pedidos_controller_1.default.deletePedido);
router.get("/consultaPedido/:id", pedidos_controller_1.default.consultaPedido);
router.post("/consultaPedidosCliente", pedidos_controller_1.default.consultaPedidosCliente);
router.post("/consultaPedidosProduto", pedidos_controller_1.default.consultaPedidosProduto);
router.use((err, req, res, next) => {
    const errorStr = `Method ${req.method}; URL ${req.baseUrl}; Error msg: ${err.message}`;
    console.error(errorStr);
    res.status(400).send(errorStr);
    next();
});
exports.default = router;
