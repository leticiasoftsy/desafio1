import { useEffect, useState } from "react";
import UserTable from "./UserTable"; 
import { obterUsuariosDoCookie } from "../../utils/cookies";
import type { User } from "../../@types/user";
import { Container, Spinner } from "react-bootstrap";


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
        return (
         <div 
            style={{
                color: "0d6efd",
                height: "100vh",
                backgroundColor: "#f8f9fa",
                flexDirection: "column",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Spinner animation="border" role="status" variant="primary" />
                <p className="mt-3 fs-5">Carregando usuários, aguarde...</p>
            </div>
        );
    }

    return(
       <>
       <Container>
            <h2 className="bg-light text-center text-dark py-2 px-3 rounded shadow-sm mb-4">
                Usuários Cadastrados
            </h2>
       </Container>
       <UserTable users={users} />
       </>
    )
}