# Sistema Bancário Simplificado - O Desafio Lógico

## Conceito

Modelar a lógica de um pequeno sistema bancário, focando na segurança das transações e na integridade dos dados. Este projeto é excelente para demonstrar um encapsulamento rigoroso e regras de negócio bem definidas.

## Classes Essenciais

*   **`Cliente`**: Gerencia os dados do correntista.
*   **`Conta`**: Modela a conta bancária, com saldo e histórico de transações.
*   **`Transacao`**: Representa uma operação única (depósito, saque, transferência).

## Requisitos de POO

*   **Encapsulamento Máximo**: O atributo `saldo` da `Conta` deve ser `private` e não deve ter um setter público. A única forma de alterar o saldo é através de métodos como `depositar(valor)` e `sacar(valor)`.

*   **Validação em Métodos**:
    *   `sacar(valor)`: Deve verificar se `valor` é positivo e se há saldo suficiente.
    *   `depositar(valor)`: Deve verificar se `valor` é positivo.
    *   `transferir(valor, contaDestino)`: Deve orquestrar uma chamada de `sacar()` em si mesma e `depositar()` na conta de destino, garantindo que a operação seja atômica.

*   **Relacionamentos Claros (UML)**:
    *   `Cliente` e `Conta` (Associação: 1 para N).
    *   `Conta` e `Transacao` (Composição: uma conta é composta por seu extrato de transações).

*   **Métodos Estáticos**: Crie um método `Transacao.criarTransferencia(...)` que gera duas instâncias de `Transacao`: um débito para a conta de origem e um crédito para a de destino.

*   **Serialização**: Implemente `toJSON()` para `Cliente` e `Conta`, tomando cuidado para não expor informações sensíveis. O extrato (lista de transações) deve ser serializável.

## Desafios Avançados (Para ir além)

*   **Aplique Herança**: Crie uma classe abstrata `Conta` e classes filhas `ContaCorrente` (com limite de cheque especial) e `ContaPoupanca` (com um método `renderJuros()`).

*   **Crie um sistema de "chaves PIX"**: Onde um `Cliente` pode registrar chaves (email, cpf) e as transferências podem ser feitas usando essas chaves em vez da referência direta do objeto `Conta`.

## Comandos

  - para instalar as dependências:

    npm init -y

    npm install typescript ts-node @types/node --save-dev

    npx tsc --init

  - para executar:

    npx ts-node src/index.ts 

