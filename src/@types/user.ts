export interface User {
    id?: string;
    name: string;
    email: string;
    cpf: string;
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