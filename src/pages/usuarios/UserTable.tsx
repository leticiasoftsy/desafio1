import { Table, Button } from "react-bootstrap";
import type { User } from "../../@types/user";
import { useNavigate } from "react-router-dom";

interface Props {
  users: User[];
}

function calcularIdade(dataNascimento: string): number {

  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
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
              <th>CPF</th>
              <th>Idade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.cpf}</td>
                <td>{calcularIdade(u.dataNascimento)} anos</td>
                <td>
                  <Button
                  variant="btn btn-outline-dark"
                  size="sm"
                  onClick={() => navigate(`/usuarios/editar/${u.id}`)}
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
