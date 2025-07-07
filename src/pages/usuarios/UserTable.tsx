import { Table, Button } from "react-bootstrap";
import type { User } from "../../@types/user";
import { useNavigate } from "react-router-dom";

interface Props {
  users: User[];
}

export default function UserTable({ users }: Props) {
  const navigate = useNavigate();

  if (users.length === 0) return <p className="text-muted">Nenhum usuário cadastrado.</p>;

  return (
        <Table 
          striped 
          bordered 
          hover 
          variant="light" 
          responsive 
          className="mb-4 align-middle w-75 mx-auto table-height"
          >
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Usuário</th>
              <th>Senha</th>
              <th>Cidade</th>
              <th className="fs-5">#</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id || index}>
                <td>{user.name.firstname} {user.name.lastname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.address.city}</td>
                <td>
                  <Button
                  variant="btn btn-outline-dark"
                  size="sm"
                  onClick={() => navigate(`/usuarios/editar/${user.id}`)}
              >
                  Editar
                </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  );
}
