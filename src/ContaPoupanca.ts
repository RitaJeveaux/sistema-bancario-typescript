import { Conta } from './Conta';

export class ContaPoupanca extends Conta {
  constructor(
    private readonly _taxaJuros: number, // em percentual
    numero: number,
    saldo: number
  ) {
    super(numero, saldo);
  }

  public renderJuros(): void {
    const juros = this.saldo * (this._taxaJuros / 100);
    this.depositar(juros);
  }
}