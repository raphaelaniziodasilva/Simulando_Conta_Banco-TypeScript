// aqui vamos tratar somente das rotas

import express, {Request, Response} from "express" // ja esta atribuindo o express ha uma variavel

// vamos fazer a importação de tudo que esta na AccountService, quando usamos o * quer dizer que estamos importando tudo o que tem dentro daquela classe
import * as AccountService from "./accountservice"

import { Account } from "./account.class"

import { CC } from "./cc.class"

import { CP } from "./cp.class"

import { Accounts } from "./account.interface"

export const accountsRouter = express.Router() // importando o express dentro da variavel

// criando o comportamento de rotas
// listando todas as contas
accountsRouter.get("/", async(req: Request, res: Response) => {

    // trantando erro quando houver ouver erro
    try {
        const accounts: Accounts = await AccountService.findAll()

        res.status(200).send(accounts)
    } catch (e: any) {
        res.status(500).send(e.message)        
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

        res.status(404).send("Account not found")
    } catch (error: any) {
        res.status(500).send(error.message)        
    }
})

// criando uma conta do tipo cc ou cp
accountsRouter.post("/create", async(req: Request, res: Response) => {
    try {
        let account: Account

        // tipo de conta corrente
        if(req.body.type == "cc") {
            account = new CC(req.body.account_number, req.body.agency)
        } else { // tipo de conta poupança
            account = new CP(req.body.account_number, req.body.agency)
        }

        // criando uma nova conta que pode ser cc ou cp
        const newAccount = await AccountService.create(account)

        res.status(201).json(newAccount)
    } catch (error: any) {
        res.status(500).send(error.message)        
    }
    /* use o postman para cadastrar uma nova conta
        {
            "type": "cc", --> tipo de conta
            "account_number": "04", --> numero da conta
            "agency": "01" --> agência
        }
    */
})

// editando conta
accountsRouter.put("/:id", async(req: Request, res: Response) => {

    // transfrmando o id para inteiro
    const id: number = parseInt(req.params.id, 10)
    try {
        // criando como uma nova conta com o valor que vem do body ou seja criando uma conta que vem com o valor que esta dentro do body do postaman
       const accountUpdate: Account = req.body

       // verificando se a conta existe
       const account: Account = await AccountService.find(id)

       // se a conta existir vamos fazer a atualização
       if(account) {
          const updateAccount = await AccountService.update(id, accountUpdate)
          return res.status(200).json(updateAccount)
        } 

        // se a conta não existir eu quero que crie a conta
       const newAccount = await AccountService.create(accountUpdate)

       res.status(201).json(newAccount)
    } catch (error: any) {
        res.status(500).send(error.message)        
    }
})

// deletando conta
accountsRouter.delete("/:id", async(req: Request, res: Response) => {
    try {
        // transfrmando o id para inteiro
        const id: number = parseInt(req.params.id, 10)

        await AccountService.remove(id)

        res.status(204)
    } catch (error: any) {
        res.status(500).send(error.message)        
    }
})

// agora vamos para o nosso server.ts
