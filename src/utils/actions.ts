import axios from "axios"

export async function getEndereco(cep:string) {
    if (!cep) return {}
    try {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        return resposta.data
    } catch (error){
        console.error(error)
    }
}

export async function getUsuarios() {
    try {
        const resposta = await axios.get(`https://fakestoreapi.com/users`)
        console.log(resposta)
        return resposta.data

    } catch (error){
        console.error(error)
    }
}