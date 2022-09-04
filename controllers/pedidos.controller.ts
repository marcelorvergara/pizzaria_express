import { NextFunction, Request, Response } from "express";
import { IPedido } from "../interfaces/IPedidosApi";
import PedidosService from "../services/pedidos.services";

async function getPedidos(req: Request, res: Response, next: NextFunction) {
  try {
    const jsonData = await PedidosService.getPedidos();
    // log
    logger.info(`GET /pedidos`);
    res.send(jsonData);
  } catch (err) {
    next(err);
  }
}

async function insertPedido(req: Request, res: Response, next: NextFunction) {
  try {
    let pedido: IPedido = req.body;
    // validação
    if (!pedido.cliente || pedido.valor === null || !pedido.produto) {
      throw new Error("Campos obrigatórios: cliente, valor e o produto!");
    }
    // enviando ao service
    pedido = await PedidosService.insertPedido(pedido);
    // log
    logger.info(`POST /pedido/novoPedido - ${JSON.stringify(pedido)}`);
    res.send(pedido);
  } catch (err) {
    next(err);
  }
}

async function updatePedido(req: Request, res: Response, next: NextFunction) {
  try {
    let pedido: IPedido = req.body;
    // validação
    if (
      pedido.id === null ||
      !pedido.cliente ||
      pedido.valor === null ||
      !pedido.produto ||
      typeof pedido.entregue !== "boolean"
    ) {
      throw new Error(
        "Campos obrigatórios: id, cliente, valor, entregue (boolean) e o produto!"
      );
    }
    // log
    logger.info(`POST /pedido/updatePedido - ${JSON.stringify(pedido)}`);
    // enviando para o service
    res.send(await PedidosService.updatePedido(pedido));
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req: Request, res: Response, next: NextFunction) {
  try {
    let pedido: IPedido = req.body;
    // validação
    if (pedido.id === null || typeof pedido.entregue !== "boolean") {
      throw new Error("Campos obrigatórios: id e entregue (boolean)!");
    }
    // log
    logger.info(`POST /pedido/updateStatus - ${JSON.stringify(pedido)}`);
    // enviando para o service
    res.send(await PedidosService.updateStatus(pedido));
  } catch (err) {
    next(err);
  }
}

async function deletePedido(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.params.id);
    // validação
    if (isNaN(parseInt(req.params.id))) {
      throw new Error("Campos obrigatórios: id (/deletePedido/{id})!");
    }
    await PedidosService.deletePedido(parseInt(req.params.id));
    // log
    logger.info(`DELETE /deletePedido/${req.params.id}`);
    res.end();
  } catch (err) {
    next(err);
  }
}

async function consultaPedido(req: Request, res: Response, next: NextFunction) {
  try {
    // validação
    if (isNaN(parseInt(req.params.id))) {
      throw new Error("Campos obrigatórios: id (/consultaPedido/{id})!");
    }
    const pedido = await PedidosService.consultaPedido(parseInt(req.params.id));
    // log
    logger.info(`GET /consultaPedido/${req.params.id}`);
    res.send(pedido);
  } catch (err) {
    next(err);
  }
}

async function consultaPedidosCliente(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    // validação
    if (!body.cliente) {
      throw new Error("Campo obrigatório: cliente (string)!");
    }
    // log
    logger.info(`POST /consultaPedidosCliente/- ${JSON.stringify(body)}`);
    res.send(
      (await PedidosService.consultaPedidosCliente(body.cliente)).toString()
    );
  } catch (err) {
    next(err);
  }
}

async function consultaPedidosProduto(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    // validação
    if (!body.produto) {
      throw new Error("Campo obrigatório: produto (string)!");
    }
    // log
    logger.info(`POST /consultaPedidosProduto/- ${JSON.stringify(body)}`);
    res.send(
      (await PedidosService.consultaPedidosProduto(body.produto)).toString()
    );
  } catch (err) {
    next(err);
  }
}

async function getMaisPedidos(req: Request, res: Response, next: NextFunction) {
  try {
    const jsonData = await PedidosService.getMaisPedidos();
    // log
    logger.info(`GET /maisPedidos`);
    res.send(jsonData);
  } catch (err) {
    next(err);
  }
}

export default {
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
