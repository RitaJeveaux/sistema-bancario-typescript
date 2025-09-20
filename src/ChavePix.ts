import { Conta } from './Conta';

export type TipoChavePix = 'cpf' | 'email' | 'telefone' | 'aleatoria';

export class ChavePix {
  constructor(
    public readonly valor: string,
    public readonly tipo: TipoChavePix,
    public readonly conta: Conta
  ) { }

  public toJSON() {
    return {
      valor: this.valor,
      tipo: this.tipo,
    };
  }
}