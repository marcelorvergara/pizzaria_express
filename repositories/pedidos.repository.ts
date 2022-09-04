import { promises as fs } from "fs";
import { IPedido } from "../interfaces/IPedidosApi";

const { readFile, writeFile } = fs;

async function getPedidos() {
  const jsonData = JSON.parse((await readFile(globalThis.fileName)).toString());
  return jsonData.pedidos;
}

async function insertPedido(pedido: IPedido) {
  const jsonData = JSON.parse((await readFile(globalThis.fileName)).toString());
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
  await writeFile(globalThis.fileName, JSON.stringify(jsonData, null, 2));
  return newPedido;
}

async function updatePedido(pedido: IPedido, idx: number) {
  const jsonData = JSON.parse((await readFile(globalThis.fileName)).toString());
  jsonData.pedidos.splice(idx, 1, pedido);
  await writeFile(globalThis.fileName, JSON.stringify(jsonData, null, 2));
  return jsonData.pedidos[idx];
}

async function updateStatus(pedido: IPedido, idx: number) {
  const jsonData = JSON.parse((await readFile(globalThis.fileName)).toString());
  jsonData.pedidos.splice(idx, 1, pedido);
  await writeFile(globalThis.fileName, JSON.stringify(jsonData, null, 2));
  return jsonData.pedidos[idx];
}

async function deletePedido(id: number) {
  const jsonData = JSON.parse((await readFile(globalThis.fileName)).toString());
  jsonData.pedidos = jsonData.pedidos.filter(
    (pedido: IPedido) => pedido.id !== id
  );
  console.log(jsonData);
  await writeFile(globalThis.fileName, JSON.stringify(jsonData, null, 2));
}

export default {
  getPedidos,
  insertPedido,
  updateStatus,
  deletePedido,
  updatePedido,
};
