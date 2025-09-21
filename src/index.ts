import { Cliente } from './Cliente';
import { ContaCorrente } from './ContaCorrente';
import { ContaPoupanca } from './ContaPoupanca';
import { ChavePix } from './ChavePix';
import { Conta } from './Conta';

console.log("--- Início da Simulação Bancária ---");

// 1. Criação de Clientes
console.log("\n[ETAPA 1: Criando clientes]");
const clienteJoao = new Cliente("João Ribeiro", "111.222.333-44");
const clienteMaria = new Cliente("Maria Rosa", "555.666.777-88");
console.log(`Cliente criado: ${clienteJoao.nome}`);
console.log(`Cliente criado: ${clienteMaria.nome}`);

// 2. Criação de Contas
console.log("\n[ETAPA 2: Criando contas para os clientes]");
const ccJoao = new ContaCorrente(500, 101, 1000); // Limite de R$500, Conta nº 101, Saldo inicial de R$1000
const cpJoao = new ContaPoupanca(0.5, 102, 4000); // Taxa de juros de 0.5%, Conta nº 102, Saldo inicial de R$2000
const ccMaria = new ContaCorrente(200, 201, 500); // Limite de R$200, Conta nº 201, Saldo inicial de R$500

// 3. Associação de Contas aos Clientes
console.log("\n[ETAPA 3: Associando contas aos clientes]");
clienteJoao.adicionarConta(ccJoao);
clienteJoao.adicionarConta(cpJoao);
clienteMaria.adicionarConta(ccMaria);
console.log(`${clienteJoao.nome} agora possui ${clienteJoao.contas.length} contas.`);
console.log(`${clienteMaria.nome} agora possui ${clienteMaria.contas.length} contas.`);

// 4. Realização de Operações
console.log("\n[ETAPA 4: Realizando operações bancárias]");

// Operações na Conta Corrente de João
console.log("\n--- Operações na Conta Corrente de João (CC 101) ---");
console.log(`Saldo inicial: R$ ${ccJoao.saldo.toFixed(2)}`);
ccJoao.depositar(250.50);
ccJoao.sacar(100);
console.log(`Saldo após depósito e saque: R$ ${ccJoao.saldo.toFixed(2)}`);
console.log("Tentando sacar valor maior que o saldo, usando o limite...");
ccJoao.sacar(1500); // Saldo ficará negativo: 1150.50 - 1500 = -349.50
console.log(`Saldo após saque com limite: R$ ${ccJoao.saldo.toFixed(2)}`);
console.log("Tentando sacar valor maior que o saldo + limite...");
ccJoao.sacar(500); // Deve falhar: Saldo disp: -349.50 + 500 = 150.50. Saque de 500 falha.

// Operações na Conta Poupança de João
console.log("\n--- Operações na Conta Poupança de João (CP 102) ---");
console.log(`Saldo inicial: R$ ${cpJoao.saldo.toFixed(2)}`);
console.log('Depositando os Juros que renderam')
cpJoao.renderJuros();
console.log(`Saldo após render juros: R$ ${cpJoao.saldo.toFixed(2)}`);

// Transferência entre contas
console.log("\n--- Transferência da Conta Corrente de Maria para a Conta Poupança de João ---");
console.log(`Saldo inicial CC Maria: R$ ${ccMaria.saldo.toFixed(2)}`);
console.log(`Saldo inicial CP João: R$ ${cpJoao.saldo.toFixed(2)}`);
ccMaria.transferir(150, cpJoao);
console.log(`Saldo final CC Maria: R$ ${ccMaria.saldo.toFixed(2)}`);
console.log(`Saldo final CP João: R$ ${cpJoao.saldo.toFixed(2)}`);

// 5. Simulação de PIX
console.log("\n[ETAPA 5: Simulação de PIX]");
const registroChavesPix = new Map<string, Conta>();

const chaveEmailMaria = new ChavePix("maria.s@email.com", "email", ccMaria);
registroChavesPix.set(chaveEmailMaria.valor, chaveEmailMaria.conta);
console.log(`Chave PIX registrada: ${chaveEmailMaria.valor} para a conta ${chaveEmailMaria.conta.numero}`);

const chaveDestinoPix = "maria.s@email.com";
const contaDestinoPix = registroChavesPix.get(chaveDestinoPix);
if (contaDestinoPix) {
  console.log(`\nTransferindo via PIX de João para Maria...`);
  ccJoao.transferir(50, contaDestinoPix);
}

// 6. Visualização de Extratos e Serialização
console.log("\n[ETAPA 6: Visualização de extratos e dados em JSON]");

console.log("\n--- Extrato da Conta Corrente de João (CC 101) ---");
ccJoao.extrato.forEach(transacao => {
  console.log(`- Tipo: ${transacao.tipo}, Valor: R$ ${transacao.valor.toFixed(2)}, Data: ${transacao.data.toLocaleString('pt-BR')}`);
});

console.log("\n--- Serialização (toJSON) ---");
console.log("\nConta Corrente de João (JSON com extrato):");
console.log(JSON.stringify(ccJoao.toJSON(), null, 2));

console.log("\nCliente João (JSON):");
console.log(JSON.stringify(clienteJoao.toJSON(), null, 2));

console.log("\nConta Poupança de João (JSON com extrato):");
console.log(JSON.stringify(cpJoao.toJSON(), null, 2));

console.log("\nChave PIX de Maria (JSON):");
console.log(JSON.stringify(chaveEmailMaria.toJSON(), null, 2));

console.log("\n--- Fim da Simulação ---");
