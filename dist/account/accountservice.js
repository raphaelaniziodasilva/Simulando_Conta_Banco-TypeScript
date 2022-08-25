"use strict";
// aqui vamos tratar somente dos serviços.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdraw = exports.deposit = exports.remove = exports.update = exports.create = exports.find = exports.findAll = void 0;
// vamos criar aqui um banco de dados local ou seja todos os dados que forem adicionados nesse banco serão apagados, para poder guardar os dados precisamos de um baco de dados de verdade
// aqui no account service vai ser um serviço que vai prover para nos algumas coisas algumas funcionalidades importantes para podermos trabalhar como o banco de dados funciona
const cc_class_1 = require("./cc.class");
const cp_class_1 = require("./cp.class");
const client_class_1 = require("../client/client.class");
// passando o parametro do client
// passando o id 1 e 2 depois do cliente
let accounts = {
    1: new cc_class_1.CC("01", "01", new client_class_1.Client("Raphael", "Anizio da silva", "110.675.987-44"), 1),
    2: new cp_class_1.CP("02", "01", new client_class_1.Client("Raphael", "Anizio da silva", "110.675.987-44"), 2)
};
// definindo comportamentos para o nosso serviço, que são formas de acessar os metodos
// acessando as lista de contas
const findAll = () => __awaiter(void 0, void 0, void 0, function* () { return Object.values(accounts); });
exports.findAll = findAll;
// acessando uma lista especifica pelo id
const find = (id) => __awaiter(void 0, void 0, void 0, function* () { return accounts[id]; });
exports.find = find;
// criando cont cc ou cp
const create = (newAccount) => __awaiter(void 0, void 0, void 0, function* () {
    const id = newAccount.getId();
    accounts[id] = newAccount;
    return accounts[id];
});
exports.create = create;
// atualizando conta cc ou cp
const update = (id, accountUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    // Promise<Account | null> --> se o id não existir vai me retornar null ou seja nada
    // verficando se o id existe
    const account = yield (0, exports.find)(id);
    // se a id não existe e vai me retornar null
    if (!account) {
        return null;
    }
    // se a conta existir vai alterar
    accounts[id] = accountUpdate;
    return accounts[id];
});
exports.update = update;
// deletando conta cc ou cp
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // procurando o id
    const account = yield (0, exports.find)(id);
    // se o id não existir 
    if (!account) {
        return null;
    }
    // deletando o id que eu estou passando
    delete accounts[id];
});
exports.remove = remove;
// agora que a estrutura de serviço esta montada, vamos trabalhar com rotas, crie um arquivo chamado accounts.router.ts
// criando uma nova funcionalidade para depositar dinheiro. Usamos o id para identificar a conta e o value para depositar o valor na conta
const deposit = (id, value) => __awaiter(void 0, void 0, void 0, function* () {
    // buscando a conta    
    const account = yield (0, exports.find)(id);
    // fazendo deposito e retornando o valor do deposito
    return account.deposit(value);
    // criamos uma interação aqui que ja deposita o saldo, só que não temos nehuma operação que consegue mostrar essa saldo para a gente. Agora vamos criar uma interação um metodo na account.class.ts para conseguir pegar o saldo
    // Agora vamos criar uma rota para realizar o deposito
});
exports.deposit = deposit;
// criando uma nova funcionalidade para saque de dinheiro
const withdraw = (id, value) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield (0, exports.find)(id);
    if (!account) {
        return null;
    }
    return account.withdraw(value);
});
exports.withdraw = withdraw;
