export type TipoTransacao = "deposito" | "saque" | "transferencia";

export class Transacao {
  public readonly data: Date;

  constructor(
    public readonly tipo: TipoTransacao,
    public readonly valor: number
  ) {
    this.data = new Date();
  }

  public toJSON() {
    return {
      tipo: this.tipo,
      valor: this.valor,
      data: this.data.toISOString(),
    }
  }
}