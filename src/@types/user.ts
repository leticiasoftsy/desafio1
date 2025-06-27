export interface User {
    name: string;
    email: string;
    cpf: number;
    dataNascimento: string;
    endereço: Endereco;
}

export interface Endereco {
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
}