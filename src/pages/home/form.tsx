import React, { useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup, ToastHeader, ToastBody } from "react-bootstrap";
import type { User, } from "../../@types/user";
import { getEndereco } from "../../utils/actions";
import { Link } from "react-router-dom";
import { salvarUsuariosNoCookie, obterUsuariosDoCookie } from "../../utils/cookies";
import { Toast, ToastContainer } from "react-bootstrap";

export default function UserForm() {

  const [showToast, setShowToast] = useState(false)

  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    cpf: "",
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
      const somenteNumeros = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, cpf: somenteNumeros }));
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

    setShowToast(true);
    console.log("Usuários salvos:", novosUsuarios);
  };
  
  return (
    <Container className="mt-mt-4 p-4 bg-light rounded shadow-sm">
      <h3 className="text-center bg-light text-dark py-3 px-4 rounded shadow-sm mb-4">
        Cadastro de Usuário
        </h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                className="rounded-pill"
                type="text"
                placeholder="Digite seu nome"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                maxLength={50}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                className="rounded-pill"
                type="email"
                placeholder="Digite seu e-mail"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>CPF (Apenas numeros)</Form.Label>
              <Form.Control
                className="rounded-pill"
                type="text"
                placeholder="Digite seu CPF"
                name="cpf"
                value={formData.cpf || ""}
                onChange={handleInputChange}
                maxLength={11}
                inputMode="numeric"
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                className="rounded-pill"
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleInputChange}
                min="1900-01-01"
                max="2025-12-31"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h5 className="mt-4">Endereço</h5>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>CEP</Form.Label>
              <InputGroup>
              <Form.Control
                className="rounded-pill"
                type="text"
                placeholder="Digite seu CEP"
                name="cep"
                value={formData.endereço.cep}
                onChange={handleEnderecoChange}
                maxLength={9}
                inputMode="numeric"
                required
              />
              <Button variant="outline-primary" onClick={buscarCep}>
               Buscar CEP
              </Button>
            </InputGroup>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Logradouro</Form.Label>
              <Form.Control
                className="rounded-pill"
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
                className="rounded-pill"
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
                className="rounded-pill"
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
                className="rounded-pill"
                type="text"
                name="estado"
                value={formData.endereço.estado}
                onChange={handleEnderecoChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="px-4 py-2 rounded-pill">
          Cadastrar Usuário
        </Button>
      </Form>
      <ToastContainer position="top-end" className="p-3">
        <Toast bg="success" className="text-white"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={4000}
          autohide
        >
       <ToastHeader closeButton>
          <strong className="me-auto">Sucesso</strong>
       </ToastHeader>
       <ToastBody className="text-white">
          Usuário cadastrado com sucesso!
       </ToastBody>
       </Toast>
      </ToastContainer>
      <Link to="/usuarios" className="btn btn-link mt-3">Ver usuários</Link>
    </Container>
  );
}
