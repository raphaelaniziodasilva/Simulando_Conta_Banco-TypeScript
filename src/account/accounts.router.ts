// aqui vamos tratar somente das rotas

import express, {Request, Response} from "express" // ja esta atribuindo o express ha uma variavel

// vamos fazer a importação de tudo que esta na AccountService, quando usamos o * quer dizer que estamos importando tudo o que tem dentro daquela classe
import * as AccountService from "./accountservice"

import { Account } from "./account.class"

import { CC } from "./cc.class"

import { CP } from "./cp.class"

import { Accounts } from "./account.interface"
import { Client } from "../client/client.class"

export const accountsRouter = express.Router() // importando o express dentro da variavel

// criando o comportamento de rotas
// listando todas as contas
accountsRouter.get("/", async(req: Request, res: Response) => {

    // trantando erro quando houver ouver erro
    try {
        const accounts: Accounts = await AccountService.findAll()

        return res.status(200).send(accounts)
    } catch (e: any) {
        return res.status(500).send(e.message)        
    }
})

// listando uma unica conta pelo id
accountsRouter.get("/:id", async(req: Request, res: Response) => {
    
    // transfrmando o id para inteiro
    const id: number = parseInt(req.params.id, 10)
    try {
        const account: Account = await AccountService.find(id)

        // se a conta existir 
        if(account) {
            res.status(200).send(account)
        }

        return res.status(404).send("Account not found")
    } catch (error: any) {
        return res.status(500).send(error.message)        
    }
})

// criando uma conta do tipo cc ou cp
accountsRouter.post("/create", async(req: Request, res: Response) => {
    try {
        const id = new Date().valueOf() // definindo o id vai pegar um valor aleatorio

        // vamos precisar adicionar uma intração para poder dicionar um client        
        const client: Client = new Client(req.body.name, req.body.lasName, req.body.cpf)

        let account: Account
        // tipo de conta corrente
        if(req.body.type == "cc") {

            // vamos colocar o nosso cliente dentro das contas cc e cp, agora agente ja consegue adicionar clientes dentro do create rout
            account = new CC(req.body.account_number, req.body.agency, client, id) 
        } else { // tipo de conta poupança
            account = new CP(req.body.account_number, req.body.agency, client, id)
        }

        // criando uma nova conta que pode ser cc ou cp
        const newAccount = await AccountService.create(account)

        return res.status(201).json(newAccount)
    } catch (error: any) {
         return res.status(500).send(error.message)        
    }
    /* use o postman para cadastrar uma nova conta
        {
        
        
            "name": "feferfesf",
            "lastName": "Yegar",
            "cpf": "145.957.322-98",
            "account_number": "01",
            "agency": "02"}
        }
    */
})

// editando conta
accountsRouter.put("/:id", async(req: Request, res: Response) => {

    // transformando o id para inteiro
    const id: number = parseInt(req.params.id, 10)
    try {
       // verificando se a conta existe
       const account: Account = await AccountService.find(id)

       // se a conta existir vamos fazer a atualização
       if(account) {

            let accountUpdate: Account = new Account(req.body.account_number, req.body.agency, account.getClient(), account.getId())

            const updateAccount = await AccountService.update(id, accountUpdate)
            return res.status(200).json(updateAccount)
        } 

        return res.status(404).json("Account not found")
    } catch (error: any) {
        return res.status(500).send(error.message)        
    }
})

// deletando conta
accountsRouter.delete("/:id", async(req: Request, res: Response) => {
    try {
        // transformando o id para inteiro
        const id: number = parseInt(req.params.id, 10)

        await AccountService.remove(id)

        return res.status(204).send("Account deleted")
    } catch (error: any) {
        return res.status(500).send(error.message)        
    }
})

// fazendo deposito
accountsRouter.post("/:id/deposit", async(req: Request, res: Response) => {
    try {
        // transformando o id para inteiro
        const id: number = parseInt(req.params.id, 10)

        // pegando uma conta 
        const account: Account = await AccountService.find(id)

        // se a conta existir
        if(account) {

            // transformando o value em valores reais
            const value: number = parseFloat(req.body.value)

            // fazendo o deposito
            const balance = await AccountService.deposit(id, value)

            // se o valor do deposito for menor ou igual a zero vai aparecer a menssagem de erro, se o meu valor for maior que zero o deposito esta feito
            let message = (value <= 0)? "Error! Negative or zero value is not allowed": "Deposit made"

            return res.status(201).json({message: "Deposit made", newBalance: balance})
        }

        // conta não encontrada 
        return res.status(404).send("Account not found")        
    } catch (error: any) {
        return res.status(500).send(error.message)
    }

} )

accountsRouter.post("/withdraw/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10)

        const account: Account = await AccountService.find(id)

        if(account) {
            const value: number = parseFloat(req.body.value)

            const balance: number | null = await AccountService.withdraw(id, value)

            let message: string = (value <= 0)? "Error! Negative or zero value is not allowed": "Withdrawal made"
            return res.status(201).json({message: message, newBalance: balance})
        }

        return res.status(404).send("Account not found")   

    } catch (error: any) {
        return res.status(500).send(error.message)        
    }
} )

// agora vamos para o nosso server.ts
