"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    constructor(account_number, agency) {
        this.account_number = account_number;
        this.agency = agency;
        this.balance = 0;
    }
    deposit(value) {
        this.balance += value;
    }
    withdraw(value) {
        this.balance -= value;
    }
}
exports.Account = Account;
