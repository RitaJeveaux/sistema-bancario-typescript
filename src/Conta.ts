import { Cliente } from './Cliente';
import { Transacao } from './Transacao';

export abstract class Conta {

  public clientes: Cliente[] = [];
  private _extrato: Transacao[] = [];

  constructor(
    private _numero: number,
    private _saldo: number,

  ) { }

  public sacar(valor: number): void {
    if (valor <= 0) {
      console.log("Valor de saque deve ser positivo.");
      return;
    }

    if (this._saldo >= valor) {
      this._saldo -= valor;
      this._extrato.push(new Transacao("saque", valor));
      console.log(`Saque de R$${valor.toFixed(2)} realizado com sucesso.`);
    } else {
      console.log(`Saque recusado. Saldo insuficiente.`);
    }
  }

  public depositar(valor: number): void {
    if (valor > 0) {
      this._saldo += valor;
      this._extrato.push(new Transacao("deposito", valor));
      console.log(`Depósito de R$${valor.toFixed(2)} realizado com sucesso!`);
    } else {
      console.log("Valor de depósito deve ser positivo.");
    }
  }

  public get saldo(): number {
    return this._saldo;
  }

  public get extrato(): Transacao[] {
    return [...this._extrato]; // Retorna uma cópia para proteger o array original
  }

  public toJSON() {
    return {
      numero: this._numero,
      saldo: this._saldo,
      extrato: this._extrato.map(transacao => transacao.toJSON())
    }
  }
}