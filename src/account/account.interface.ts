// aqui vai compor uma listagem de contas que vai ser criadas ao longo da contrução e aqui vai contém basicamente toda a base de dados enquanto o nosso software estiver funcionando, rodando aqui vão ter as nossas contas os nossos dados

import { Account } from "./account.class";

export interface Accounts {
    [key: number]: Account

}