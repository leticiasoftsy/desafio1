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