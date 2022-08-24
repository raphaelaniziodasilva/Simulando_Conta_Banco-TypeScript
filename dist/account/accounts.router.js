"use strict";
// aqui vamos tratar somente das rotas
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountsRouter = void 0;
const express_1 = __importDefault(require("express")); // ja esta atribuindo o express ha uma variavel
// vamos fazer a importação de tudo que esta na AccountService, quando usamos o * quer dizer que estamos importando tudo o que tem dentro daquela classe
const AccountService = __importStar(require("./accountservice"));
const cc_class_1 = require("./cc.class");
const cp_class_1 = require("./cp.class");
const client_class_1 = require("../client/client.class");
exports.accountsRouter = express_1.default.Router(); // importando o express dentro da variavel
// criando o comportamento de rotas
// listando todas as contas
exports.accountsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // trantando erro quando houver ouver erro
    try {
        const accounts = yield AccountService.findAll();
        return res.status(200).send(accounts);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
}));
// listando uma unica conta pelo id
exports.accountsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // transfrmando o id para inteiro
    const id = parseInt(req.params.id, 10);
    try {
        const account = yield AccountService.find(id);
        // se a conta existir 
        if (account) {
            res.status(200).send(account);
        }
        return res.status(404).send("Account not found");
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
// criando uma conta do tipo cc ou cp
exports.accountsRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = new Date().valueOf(); // vai pegar um valor aleatorio
        const client = new client_class_1.Client(req.body.name, req.body.lasName, req.body.cpf);
        let account;
        // tipo de conta corrente
        if (req.body.type == "cc") {
            account = new cc_class_1.CC(req.body.account_number, req.body.agency, client, id);
        }
        else { // tipo de conta poupança
            account = new cp_class_1.CP(req.body.account_number, req.body.agency, client, id);
        }
        // criando uma nova conta que pode ser cc ou cp
        const newAccount = yield AccountService.create(account);
        return res.status(201).json(newAccount);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
    /* use o postman para cadastrar uma nova conta
        {
            "type": "cc", --> tipo de conta
            "account_number": "04", --> numero da conta
            "agency": "01" --> agência
        }
    */
}));
// editando conta
exports.accountsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // transfrmando o id para inteiro
    const id = parseInt(req.params.id, 10);
    try {
        // criando como uma nova conta com o valor que vem do body ou seja criando uma conta que vem com o valor que esta dentro do body do postaman
        const accountUpdate = req.body;
        // verificando se a conta existe
        const account = yield AccountService.find(id);
        // se a conta existir vamos fazer a atualização
        if (account) {
            const updateAccount = yield AccountService.update(id, accountUpdate);
            return res.status(200).json(updateAccount);
        }
        // se a conta não existir eu quero que crie a conta
        const newAccount = yield AccountService.create(accountUpdate);
        return res.status(201).json(newAccount);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
// deletando conta
exports.accountsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // transfrmando o id para inteiro
        const id = parseInt(req.params.id, 10);
        yield AccountService.remove(id);
        return res.status(204);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
exports.accountsRouter.post("/:id/deposit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const account = yield AccountService.find(id);
        if (account) {
            const value = parseFloat(req.body.value);
            const balance = yield AccountService.deposit(id, value);
            let message = (value <= 0) ? "Error! Negative or zero value is not allowed" : "Deposit made";
            return res.status(201).json({ message: "Deposit made", newBalance: balance });
        }
        return res.status(404).send("Account not found");
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
// agora vamos para o nosso server.ts
