import { Conta } from './Conta';
import { Transacao } from './Transacao';


export class ContaPoupanca extends Conta {

    constructor(
    private _taxaJuros: number,
    numero: number,
    saldo: number
  ) {
    super(numero, saldo);
  }

  public renderJuros(): void {
    if (this._saldo <= 0) {
      console.log("Não há saldo para render juros.");
      return;
    }

    const juros = this._saldo * this._taxaJuros;
    this._saldo += juros;
    this._extrato.push(new Transacao("deposito", juros));
    console.log(`Juros de R$ ${juros.toFixed(2)} aplicados. Novo saldo: R$ ${this._saldo.toFixed(2)}`);
  }
}