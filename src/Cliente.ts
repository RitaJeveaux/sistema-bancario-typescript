import { Conta } from './Conta';

export class Cliente {

  public contas: Conta[] = [];
  constructor(
    public nome: string,
    public readonly cpf: string // CPF como string para preservar zeros à esquerda e formato.
  ) { }

  public adicionarConta(conta: Conta): void {
    this.contas.push(conta);
    console.log(`Conta adicionada com sucesso para o cliente ${this.nome}.`);
  }

  public toJSON() {
    return {
      nome: this.nome,
      cpf: this.cpf
    }
  }
}