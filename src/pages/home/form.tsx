import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import type { User, } from "../../@types/user";
import { getEndereco } from "../../utils/actions";
import { Link } from "react-router-dom";
import { salvarUsuariosNoCookie, obterUsuariosDoCookie } from "../../utils/cookies";

export default function UserForm() {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    cpf: 0,
    dataNascimento: "",
    endereço: {
      cep: "",
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      setFormData((prev) => ({ ...prev, cpf: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEnderecoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      endereço: {
        ...prev.endereço,
        [name]: value,
      },
    }));
  };

  const buscarCep = async () => {
    try {
      const cep = formData.endereço.cep.replace(/\D/g, "");
      const data = await getEndereco(cep)

      setFormData((prev) => ({
        ...prev,
        endereço: {
          ...prev.endereço,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        },
      }));
    } catch  {
      alert("Erro ao buscar o CEP.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const usuariosSalvos = obterUsuariosDoCookie();
    const novosUsuarios = [...usuariosSalvos, formData];
    salvarUsuariosNoCookie(novosUsuarios);
    alert("Usuário cadastrado com sucesso!");
    console.log("Usuários salvos:", novosUsuarios);
  };
  
  return (
    <Container className="mt-4">
      <h3 className="mb-4 title-center">Cadastro de Usuário</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu nome"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="number"
                name="cpf"
                value={formData.cpf || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h5 className="mt-4">Endereço</h5>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                name="cep"
                value={formData.endereço.cep}
                onChange={handleEnderecoChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button variant="secondary" onClick={buscarCep}>
              Buscar CEP
            </Button>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Logradouro</Form.Label>
              <Form.Control
                type="text"
                name="logradouro"
                value={formData.endereço.logradouro}
                onChange={handleEnderecoChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                name="bairro"
                value={formData.endereço.bairro}
                onChange={handleEnderecoChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                name="cidade"
                value={formData.endereço.cidade}
                onChange={handleEnderecoChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                name="estado"
                value={formData.endereço.estado}
                onChange={handleEnderecoChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="secondary">
          Cadastrar Usuário
        </Button>
      </Form>
      <Link to="/usuarios" className="btn btn-link mt-3">Ver usuários</Link>
    </Container>
  );
}
