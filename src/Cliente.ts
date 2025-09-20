import { Conta } from './Conta';

export class Cliente {

  public contas: Conta[] = [];
  constructor(
    public nome: string,
    public cpf: number
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