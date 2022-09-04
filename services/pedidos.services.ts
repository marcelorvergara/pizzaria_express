import { IPedido } from "../interfaces/IPedidosApi";
import PedidosRepository from "../repositories/pedidos.repository";
import helper from "../helpers/helper";

async function getPedidos() {
  return await PedidosRepository.getPedidos();
}

async function insertPedido(pedido: IPedido) {
  return await PedidosRepository.insertPedido(pedido);
}

async function updatePedido(pedido: IPedido) {
  // validar se o pedido existe
  const pedidos = await getPedidos();
  const idx: number = helper.chekcExist(pedidos, pedido);
  // atualização dos campos
  pedidos[idx].cliente = pedido.cliente;
  pedidos[idx].produto = pedido.produto;
  pedidos[idx].valor = pedido.valor;
  pedidos[idx].entregue = pedido.entregue;
  // enviar para o repositório
  const upPedido = await PedidosRepository.updatePedido(pedidos[idx], idx);
  return upPedido;
}

async function updateStatus(pedido: IPedido) {
  // validar se o pedido existe
  const pedidos = await getPedidos();
  const idx: number = helper.chekcExist(pedidos, pedido);
  // atualização do status
  pedidos[idx].entregue = pedido.entregue;
  // enviar para o repositório
  const upPedido = await PedidosRepository.updateStatus(pedidos[idx], idx);
  return upPedido;
}

async function deletePedido(id: number) {
  return await PedidosRepository.deletePedido(id);
}

async function consultaPedido(id: number) {
  const pedidos = await getPedidos();
  const pedido = pedidos.find((f: IPedido) => f.id === id);
  return pedido;
}

async function consultaPedidosCliente(cliente: string) {
  const pedidos = await getPedidos();
  let tot = 0;
  for (let pedido of pedidos) {
    if (pedido.cliente === cliente && pedido.entregue) {
      tot += pedido.valor;
    }
  }
  return tot;
}

async function consultaPedidosProduto(produto: string) {
  const pedidos = await getPedidos();
  let tot = 0;
  for (let pedido of pedidos) {
    if (pedido.produto === produto && pedido.entregue) {
      tot += pedido.valor;
    }
  }
  return tot;
}

async function getMaisPedidos() {
  const pedidos = await getPedidos();
  const reduced = pedidos.reduce(function (
    r: { [x: string]: number },
    a: IPedido
  ) {
    r[a.produto] = (r[a.produto] || 0) + 1;
    return r;
  },
  {});
  const sorted = Object.fromEntries(
    Object.entries<number>(reduced).sort(([, a], [, b]) => b - a)
  );
  return sorted;
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
