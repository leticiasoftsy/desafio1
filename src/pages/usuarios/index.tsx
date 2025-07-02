import { useEffect, useState } from "react";
import UserTable from "./UserTable"; 
import { obterUsuariosDoCookie } from "../../utils/cookies";
import type { User } from "../../@types/user";
import { Button, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function UsersPage(){

    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setTimeout (() => {
        const usuariosSalvos = obterUsuariosDoCookie();
        setUsers(usuariosSalvos);
        setLoading(false);
       }, 960 )

    }, []);

    const handleVoltar = () => {
        navigate("/")
    };

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
       <Container className="w-75 mx-auto mb-4">
            <h2 className="text-dark py-5 m-1">Usuários Cadastrado</h2>
       </Container>

       <UserTable users={users} />

       <div className="text-center py-4">
        <Button onClick={handleVoltar} variant="secondary">
            Voltar para tela de cadastro
        </Button>
       </div>
       </>
    )
}