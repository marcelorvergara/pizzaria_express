import { IPedido } from "../interfaces/IPedidosApi";

function chekcExist(pedidos: IPedido[], pedido: IPedido) {
  const idx = pedidos.findIndex((ped: IPedido) => ped.id === pedido.id);
  if (idx === -1) {
    throw new Error("Pedido não encontrado!");
  }
  return idx;
}

export default {
  chekcExist,
};
