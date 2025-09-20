import { Conta } from './Conta';
import { Transacao } from './Transacao';

export class ContaCorrente extends Conta {

  constructor(
    public limite: number,
    numero: number,
    saldo: number
  ) {
    super(numero, saldo);
  }

  public override sacar(valor: number): void {
    if (valor <= 0) {
      console.log("Valor de saque deve ser positivo.");
      return;
    }

    const saldoDisponivel = this._saldo + this.limite;

    if (saldoDisponivel >= valor) {
      this._saldo -= valor;
      this._extrato.push(new Transacao("saque", valor));
      console.log(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso. Saldo atual: R$ ${this._saldo.toFixed(2)}`);
    } else {
      console.log(`Saque recusado. Saldo e limite insuficientes. Saldo disponível (com limite): R$ ${saldoDisponivel.toFixed(2)}`);
    }
  }
}