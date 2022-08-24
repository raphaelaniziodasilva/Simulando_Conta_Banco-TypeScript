// criando o modelo do cliente com os seus dados

export class Client {
    public name: string
    public lasName: string
    public cpf: string

    constructor(name: string, lasName: string, cpf: string) {
        this.name = name
        this.lasName = lasName
        this.cpf = cpf
    }
}