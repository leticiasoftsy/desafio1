import { useEffect, useState } from "react";
import UserTable from "./UserTable"; 
import type { User } from "../../@types/user";
import { Button, Container, Spinner, Toast, ToastContainer, ToastHeader, ToastBody } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUsuarios } from "../../utils/actions";


export default function UsersPage(){

    const [users, setUsers] = useState<User[]>([])

    const [loading, setLoading] = useState(false);

    const [showToast, setShowToast] = useState(false)

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        async function fetchUsuarios() {
        setLoading(true);
        const usuariosSalvos = await getUsuarios();
        setUsers(usuariosSalvos);
        console.log(usuariosSalvos)
        setLoading(false);
        }

    fetchUsuarios();

    }, []);

    useEffect(() => {
        if (location.state?.usuarioCadastrado) {
            setShowToast(true);
            navigate(location.pathname, { replace: true, state: {}});
        }
    }, [location, navigate]);

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
            <Button onClick={handleVoltar} variant="secondary">
            + Novo cadastro
        </Button>
       </Container>

        <div className="text-center py-4">
        
       </div>
       <Link to="/editar"></Link>

       <UserTable users={users} //tabela de usuarios
       />

       <ToastContainer //alerta de usuario cadastrado
        position="top-end" className="p-3">
        <Toast 
        style={{
          backgroundColor: "#343a40",
          color: "#f8f9fa"
        }}
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={4000}
          autohide
        >
       <ToastHeader
          closeButton
          style={{
            backgroundColor: "#6c757d",
            color: "#fff",
          }}
          >
          <strong className="me auto">Sucesso</strong>
       </ToastHeader>
       <ToastBody>
          Usuário cadastrado com sucesso!
       </ToastBody>
          </Toast>
     </ToastContainer>
       </>
    )
}