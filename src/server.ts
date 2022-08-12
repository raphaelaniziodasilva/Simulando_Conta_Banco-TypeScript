import express from "express"
import {Router, Request, Response} from "express"
import {accountsRouter} from "./account/accounts.router"

const app = express()

// testando servidor --> const route = Router()

app.use(express.json())

/* testando servidor
    route.get("/", (req: Request, res: Response) => {
    res.json({message: "Hello world"})
    })
*/

app.use(accountsRouter)

app.listen(3333, () => console.log("Server running on port 3333"))


