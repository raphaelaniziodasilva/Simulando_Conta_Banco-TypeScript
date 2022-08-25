"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
// conta pai vai criar o nosso modelo de conta
class Account {
    constructor(account_number, agency, client, id) {
        this.id = id;
        this.account_number = account_number;
        this.agency = agency;
        this.balance = 0;
        this.client = client;
    }
    getClient() {
        return this.client;
    }
    getId() {
        return this.id;
    }
    // vai pegar e retornar o valor do saldo que temos na conta
    getBalance() {
        return this.balance;
    }
    // depositando dinheiro    
    deposit(value) {
        // para evitar que o usuario digite valores negativos -10, -10.5 quando for fazer o deposito
        if (value > 0) {
            this.balance += value;
            // vai retornar o nosso saldo atual
            return this.getBalance();
        }
        return 0;
    }
    // para fazer saque
    withdraw(value) {
        if (value > 0) {
            this.balance -= value;
            return this.getBalance();
        }
        return 0;
    }
}
exports.Account = Account;
