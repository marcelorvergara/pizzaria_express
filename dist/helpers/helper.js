"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function chekcExist(pedidos, pedido) {
    const idx = pedidos.findIndex((ped) => ped.id === pedido.id);
    if (idx === -1) {
        throw new Error("Pedido não encontrado!");
    }
    return idx;
}
exports.default = {
    chekcExist,
};
