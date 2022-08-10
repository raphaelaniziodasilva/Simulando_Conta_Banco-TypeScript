import { CC } from "./cc.class";
import { CP } from "./cp.class";
import { Accounts } from "./account.interface";

let accounts: Accounts = {
    1: {
        account_number: "01",
        agency: "01",
        balance: 0
    },
    2: {
        account_number: "01",
        agency: "01",
        balance: 0
    }
}

export const findAll = async (): Promise<Accounts> => Object.values(accounts)