export interface IPedido {
  id: number;
  cliente: string;
  produto: string;
  valor: number;
  entregue: boolean;
  timestamp: Date;
}
