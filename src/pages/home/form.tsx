import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup, ToastHeader, ToastBody, Toast, ToastContainer, Card, CardBody } from "react-bootstrap";
import type { User, } from "../../@types/user";
import { getEndereco } from "../../utils/actions";
import { useNavigate } from "react-router-dom";
import { salvarUsuariosNoCookie, obterUsuariosDoCookie } from "../../utils/cookies";

export default function UserForm() {

  const [showToast, setShowToast] = useState(false)

  const navigate = useNavigate();

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
    e: React.ChangeEvent<HTMLInputElement>)  => {
    const { name, value } = e.target;

    if (name === "cpf") {
     const somenteNumeros = value.replace(/\D/g, "").slice(0, 11);

     let cpfFormatado = "";
     
      for (let i = 0; i < somenteNumeros.length; i++) {
       cpfFormatado += somenteNumeros[i];
       if (i === 2 || i === 5) cpfFormatado += ".";
       if (i === 8) cpfFormatado += "-";
    }
       
     setFormData((prev) => ({ ...prev, cpf: cpfFormatado }));
     } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEnderecoChange = (
    e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;

     if (name === "cep") {
      const somenteNumeros = value.replace(/\D/g, "").slice(0, 8);

      let cepFormatado = "";
      for (let i = 0; i < somenteNumeros.length; i++) {
        cepFormatado += somenteNumeros[i];
        if (i === 4 && i !== somenteNumeros.length - 1) {
          cepFormatado += "-";
        }
      }

    setFormData((prev) => ({
      ...prev, 
      endereço: {
        ...prev.endereço, 
        [name]: cepFormatado,
      },
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      endereço: {
        ...prev.endereço,
        [name]: value,
      },
    }))
    }
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
    navigate("/usuarios"); //mostrar os usuarios apos fazer o cadastro


    setShowToast(true);
    console.log("Usuários salvos:", novosUsuarios);
  };
  
  return (
    <Card className="mx-auto mt-5 shadow" style={{ maxWidth: "90%", maxHeight:"1000px" }}>
      <Card.Header className="text-center fw-bold bg-light">
        <h5>Cadastro de Usuário</h5>
        </Card.Header>
        <hr className="w-100 border-dark opacity p-0 my-0 m-0"/>
        <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Nome<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
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
              <Form.Label>
                E-mail<span 
                className="text-danger"
                >*</span>
              </Form.Label>
              <Form.Control
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
              <Form.Label>
                CPF<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu CPF"
                name="cpf"
                value={formData.cpf || ""}
                onChange={handleInputChange}
                maxLength={14}
                inputMode="numeric"
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Data de Nascimento<span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
              <Form.Control
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleInputChange}
                min="1900-01-01"
                max="2025-12-31"
                required
                style={{ appearance: "none"}}
              />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <h5 className="mt-4">Endereço</h5>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                CEP<span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
              <Form.Control
                type="text"
                placeholder="Digite seu CEP"
                name="cep"
                value={formData.endereço.cep}
                onChange={handleEnderecoChange}
                maxLength={9}
                inputMode="numeric"
                required
              />
              <Button 
              variant="outline-primary" 
              onClick={buscarCep}
              className="rounded-end"
              >
               Buscar CEP
              </Button>
            </InputGroup>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Logradouro
              </Form.Label>
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
              <Form.Label>
                Bairro
              </Form.Label>
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
              <Form.Label>
                Cidade
              </Form.Label>
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
              <Form.Label>
                Estado
                </Form.Label>
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

      <div className="text-center">
        <Button 
              type="submit" 
              variant="primary" 
              className="px-4 py-2">
          Cadastrar Usuário
        </Button>
        </div>
      </Form>
      </CardBody>

      <ToastContainer //alerta de usuario cadastrado
          position="top-end" 
          className="p-3">
        <Toast 
          bg="success" 
          className="text-white"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={4000}
          autohide
        >
       <ToastHeader closeButton>
          <strong 
          className="me-auto">
            Sucesso
            </strong>
       </ToastHeader>
       <ToastBody 
          className="text-white">
          Usuário cadastrado com sucesso!
       </ToastBody>
          </Toast>
     </ToastContainer>
    </Card>
  );
}
