// aqui vamos tratar somente dos serviços

// aqui no account service vai ser um serviço que vai prover para nos algumas coisas algumas funcionalidades importantes para podermos trabalhar como o banco de dados funciona

import { CC } from "./cc.class";
import { CP } from "./cp.class";
import { Accounts } from "./account.interface";
import { Account } from "./account.class";
import { Client } from "../client/client.class";

let accounts: Accounts = {
    1: new CC("01", "01", new Client("Raphael", "Anizio da silva", "110.675.987-44"), 1),
    2: new CP("02", "01", new Client("Raphael","Anizio da silva", "110.675.987-44"), 2)
}
// definindo comportamentos para o nosso serviço, que são formas de acessar os metodos
// acessando as lista de contas
export const findAll = async (): Promise<Accounts> => Object.values(accounts)

// acessando uma lista especifica pelo id
export const find = async (id:number): Promise<Account> => accounts[id]

// criando cont cc ou cp
export const create = async (newAccount: CP | CC): Promise<Account>  => {
    
    const id = newAccount.getId()

    accounts[id] = newAccount
    return accounts[id]
}

// atualizando conta cc ou cp
export const update = async (id: number, accountUpdate: Account): Promise<Account | null> => { 
    // Promise<Account | null> --> se o id não existir vai me retornar null ou seja nada

    // verficando se o id existe
    const account = await find(id)

    // se a id não existe e vai me retornar null
    if(!account){
        return null
    }

    // se a conta existir vai alterar
    accounts[id] = accountUpdate
    return accounts[id]
}

// deletando conta cc ou cp
export const remove = async (id: number): Promise< null | void > => {

    // procurando o id
    const account = await find(id)

    // se o id não existir 
    if(!account) {
        return null
    }

    // deletando o id que eu estou passando
    delete accounts[id]
}

// agora que a estrutura de serviço esta montada, vamos trabalhar com rotas, crie um arquivo chamado accounts.router.ts

export const deposit = async (id: number, value: number): Promise<number> => {
    
    const account = await find(id)

    return account.deposit(value)

}

