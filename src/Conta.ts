import { Cliente } from './Cliente';
import { Transacao } from './Transacao';

export abstract class Conta {

  public clientes: Cliente[] = [];
  protected _extrato: Transacao[] = [];

  constructor(
    public readonly numero: number,
    protected _saldo: number,

  ) { }

  public sacar(valor: number): boolean {
    if (valor <= 0) {
      console.log("Valor de saque deve ser positivo.");
      return false;
    }
    if (this._saldo >= valor) {
      this._saldo -= valor;
      this._extrato.push(new Transacao("saque", valor));
      console.log(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso.`);
      return true;
    } else {
      console.log(`Saque recusado. Saldo insuficiente.`);
      return false;
    }
  }

  public depositar(valor: number): boolean {
    if (valor > 0) {
      this._saldo += valor;
      this._extrato.push(new Transacao("deposito", valor));
      console.log(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso!`);
      return true;
    } else {
      console.log("Valor de depósito deve ser positivo.");
      return false;
    }
  }

  public transferir(valor: number, contaDestino: Conta): void {
    const saqueRealizado = this.sacar(valor);
    if (saqueRealizado) {
      contaDestino.depositar(valor);
      console.log(`Transferência de R$ ${valor.toFixed(2)} para a conta ${contaDestino.numero} completada.`);
    } else {
      console.log(`Transferência de R$ ${valor.toFixed(2)} para a conta ${contaDestino.numero} falhou. Verifique o saldo de origem.`);
    }
  }

  public get saldo(): number {
    return this._saldo;
  }

  public get extrato(): Transacao[] {
    return [...this._extrato];
  }

  public toJSON() {
    return {
      numero: this.numero,
      extrato: this._extrato.map(transacao => transacao.toJSON())
    }
  }
}