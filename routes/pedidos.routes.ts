import express, { NextFunction, Request, Response } from "express";
import PedidosController from "../controllers/pedidos.controller";

const router = express.Router();

router.get("/", PedidosController.getPedidos);
router.get("/maisPedidos", PedidosController.getMaisPedidos);
router.post("/novoPedido", PedidosController.insertPedido);
router.put("/updatePedido", PedidosController.updatePedido);
router.patch("/updateStatus", PedidosController.updateStatus);
router.delete("/deletePedido/:id", PedidosController.deletePedido);
router.get("/consultaPedido/:id", PedidosController.consultaPedido);
router.post(
  "/consultaPedidosCliente",
  PedidosController.consultaPedidosCliente
);
router.post(
  "/consultaPedidosProduto",
  PedidosController.consultaPedidosProduto
);

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStr = `Method ${req.method}; URL ${req.baseUrl}; Error msg: ${err.message}`;
  console.error(errorStr);
  res.status(400).send(errorStr);
  next();
});

export default router;
