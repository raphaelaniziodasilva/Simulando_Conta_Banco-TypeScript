import { Client } from "../client/client.class"

// conta pai vai criar o nosso modelo de conta
export class Account {
    private id: number
    protected account_number: string
    protected agency: string
    private balance: number

    // definindo o cliente. Estou dizendo que eu tenho um atributo que é uma classe chamada client 
    public client: Client 

    constructor(account_number: string, agency: string, client: Client, id: number) {
        this.id = id
        this.account_number = account_number
        this.agency = agency
        this.balance = 0
        this.client = client
    }

    public getId(): number {
        return this.id
    }

    // vai nos retornar o valor do saldo que temos na conta
    public getBalance(): number {
        return this.balance
    }

    // depositando dinheiro    
    public deposit(value: number):number { // vai receber um valor
        
        // para evitar que o usuario digite valores negativos -10, -10.5 quando for fazer o deposito
        if(value > 0) {
            this.balance += value

            // vai retornar o nosso saldo atual
            return this.getBalance()
        } 
        return 0
    }

    public withdraw(value: number): void{
        this.balance -= value
    }
    
}