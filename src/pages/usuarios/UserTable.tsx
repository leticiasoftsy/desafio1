import { Table, Card } from "react-bootstrap";
import type { User } from "../../@types/user";

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
  if (users.length === 0) return <p className="text-muted">Nenhum usuário cadastrado.</p>;

  return (
    <Card className="shadow-sm mt-3">
      <Card.Header className="bg-primary text-white">
        Lista de Usuários
      </Card.Header>
      <Card.Body className="p-0">
        <Table responsive hover bordered className="mb-0 text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Idade</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.cpf}</td>
                <td>{calcularIdade(u.dataNascimento)} anos</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
