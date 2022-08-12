import { CC } from "./cc.class";
import { CP } from "./cp.class";
import { Accounts } from "./account.interface";
import { Account } from "./account.class";

let accounts: Accounts = {
    1: new CC("01", "01"),
    2: new CP("02", "01")
}

// comportamentos acessando as lista de contas
export const findAll = async (): Promise<Accounts> => Object.values(accounts)

// acessando uma lista especifica pelo id
export const find = async (id:number): Promise<Account> => accounts[id]

// criando cont cc ou cp
export const create = async (newAccount: CP | CC): Promise<Account>  => {
    const id = new Date().valueOf() // vai pegar um valor aleatorio

    accounts[id] = newAccount
    return accounts[id]
}

// atualizando conta cc ou cp
export const update = async (id: number, accountUpdate: Account): Promise<Account | null> => { 
    // Promise<Account | null> --> se o id não existir vai me retornar null

    const account = await find(id)

    // se a conta não existe e vai me retornar null
    if(!account){
        return null
    }

    // se a conta existir
    accounts[id] = accountUpdate
    return accounts[id]
}

// deletando conta cc ou cp
export const remove = async (id: number): Promise< null | void > => {
    const account = await find(id)

    if(!account) {
        return null
    }

    delete accounts[id]
}

