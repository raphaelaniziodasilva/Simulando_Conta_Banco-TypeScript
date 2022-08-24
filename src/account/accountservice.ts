// aqui vamos tratar somente dos serviços.

// vamos criar aqui um banco de dados local ou seja todos os dados que forem adicionados nesse banco serão apagados, para poder guardar os dados precisamos de um baco de dados de verdade

// aqui no account service vai ser um serviço que vai prover para nos algumas coisas algumas funcionalidades importantes para podermos trabalhar como o banco de dados funciona

import { CC } from "./cc.class";
import { CP } from "./cp.class";
import { Accounts } from "./account.interface";
import { Account } from "./account.class";
import { Client } from "../client/client.class";

// passando o parametro do client
// passando o id 1 e 2 depois do cliente
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


// criando uma nova funcionalidade para depositar dinheiro. Usamos o id para identificar a conta e o value para depositar o valor na conta
export const deposit = async (id: number, value: number): Promise<number> => {

    // buscando a conta    
    const account = await find(id)

    // fazendo deposito e retornando o valor do deposito
    return account.deposit(value)

    // criamos uma interação aqui que ja deposita o saldo, só que não temos nehuma operação que consegue mostrar essa saldo para a gente. Agora vamos criar uma interação um metodo na account.class.ts para conseguir pegar o saldo

    // Agora vamos criar uma rota para realizar o deposito

}

