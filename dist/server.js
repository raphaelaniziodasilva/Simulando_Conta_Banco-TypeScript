"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accounts_router_1 = require("./account/accounts.router");
const app = (0, express_1.default)();
// testando servidor --> const route = Router()
app.use(express_1.default.json());
/* testando servidor
    route.get("/", (req: Request, res: Response) => {
    res.json({message: "Hello world"})
    })
*/
app.use(accounts_router_1.accountsRouter);
app.listen(3333, () => console.log("Server running on port 3333"));
