import express, {Request, Response} from "express"
import * as AccountService from "./accountservice"
import { Account } from "./account.class"
import { CC } from "./cc.class"
import { CP } from "./cp.class"
import { Accounts } from "./account.interface"

export const accountsRouter = express.Router()

// listando todas as contas
accountsRouter.get("/", async(req: Request, res: Response) => {
    try {
        const accounts: Accounts = await AccountService.findAll()

        res.status(200).send(accounts)
    } catch (e: any) {
        res.status(500).send(e.message)        
    }
})

// listando uma unica conta pelo id
accountsRouter.get("/:id", async(req: Request, res: Response) => {

    const id: number = parseInt(req.params.id, 10)
    try {
        const account: Account = await AccountService.find(id)

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

        if(req.body.type == "cc") {
            account = new CC(req.body.account_number, req.body.agency)
        } else {
            account = new CP(req.body.account_number, req.body.agency)
        }

        const newAccount = await AccountService.create(account)

        res.status(201).json(newAccount)
    } catch (error: any) {
        res.status(500).send(error.message)        
    }
})

// editando conta
accountsRouter.put("/:id", async(req: Request, res: Response) => {

    const id: number = parseInt(req.params.id, 10)
    try {
       const accountUpdate: Account = req.body

       const account: Account = await AccountService.find(id)

       if(account) {
          const updateAccount = await AccountService.update(id, accountUpdate)
          return res.status(200).json(updateAccount)
        } 

       const newAccount = await AccountService.create(accountUpdate)

       res.status(201).json(newAccount)
    } catch (error: any) {
        res.status(500).send(error.message)        
    }
})

// deletando conta
accountsRouter.delete("/:id", async(req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10)

        await AccountService.remove(id)

        res.status(204)
    } catch (error: any) {
        res.status(500).send(error.message)        
    }
})
