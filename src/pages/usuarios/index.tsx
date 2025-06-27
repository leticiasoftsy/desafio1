import { useEffect, useState } from "react";
import UserTable from "./UserTable"; 
import { obterUsuariosDoCookie } from "../../utils/cookies";
import type { User } from "../../@types/user";


export default function UsersPage(){

    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout (() => {
        const usuariosSalvos = obterUsuariosDoCookie();
        setUsers(usuariosSalvos);
        setLoading(false);
       }, 960 )

    }, []);

    if (loading) {
        return <div 
                style={{
                    color: "lightskyblue",
                    display: "flex",
                    justifyContent: "center"
                    }}>
                <h2>Carregando usuários, aguarde...</h2>
                </div>
    }

    return(
       <>
       <div style={{color: "lightskyblue"}}>
       <h2 className="mb-4 text-center">Usuários Cadastrados</h2>
       </div>
       <UserTable users={users} />
       </>
    )
}