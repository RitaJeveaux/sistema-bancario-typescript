import { Conta } from './Conta';

export class Cliente {
  public contas: Conta[] = [];

  constructor(
    public readonly nome: string,
    public readonly cpf: string
  ) { }

  public adicionarConta(conta: Conta): void {
    this.contas.push(conta);
    conta.clientes.push(this);
  }

  public toJSON() {
    return {
      nome: this.nome,
      cpf: this.cpf,
    };
  }
}