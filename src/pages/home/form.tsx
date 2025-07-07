import React, { useEffect, useState } from "react";
import { Form, Button, Col, Card, CardBody } from "react-bootstrap";
import type { User, } from "../../@types/user";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type DataForm } from "./formData";
import { useForm } from "react-hook-form";
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";

interface UserFormProps {
  id?: string;
}

export default function UserForm({ id }: UserFormProps){
  const navigate = useNavigate();

  const [mostrarSenha, setMostrarSenha] = useState(false)


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DataForm>({
    resolver: zodResolver(formSchema),
  });

  const [formData, setFormData] = useState<User>({
    name: {
    firstname: "",
    lastname: ""
  },
    email: "",
    phone: "",
    username: "",
    password: "",
    address: {
    city: "",
    geolocation: {
      lat: "",
      long: "",
    },
    number: 0,
    street: "",
    zipcode: ""
  },
});

  useEffect(() => {
    console.log(id);

    if (!id) return;

    const carregarUsuarioDaAPI = async () => {
      try {
        const res = await axios(`https://fakestoreapi.com/users/${id}`);
        const user = res.data;
        setFormData(user);

        setValue("name", user.name);
        setValue("email", user.email);
        setValue("password", user.password);
        
      } catch (error) {
        console.error("Id invalido ou erro:", error)
      }
    }

    carregarUsuarioDaAPI();
    }, [id, setValue])

  const onSubmit = async (data:DataForm) => {
    try {
      if (id) {
        const response = await axios.put(`https://fakestoreapi.com/users/${id}`, {
          email: data.email,
          username: data.name,
          password: data.password,
          name: {
            firstname: data.name,
            lastname: data.name,
          },
        });
        console.log("Usuario atualizado com sucesso!", response.data);
      } else {
        const response = await axios.post("https://fakestoreapi.com/users", {
          email: data.email,
          username: data.name,
          password: data.password,
          name: {
            firstname: data.name,
            lastname: data.name,
          }
        })
        console.log("Usuario criado:", response.data)
      }
      navigate("/usuarios", {state: {usuarioCadastrado: true}});
      } catch (error) {
      console.error("Erro ao salvar", error);
    }
  };
  
  return (
    <Card className="mx-auto mt-5 shadow" style={{ maxWidth: "50%", maxHeight:"1000px" }}>
      <Card.Header className="text-center fw-bold bg-light">
        <h5>{id ? "Editar usuario" : "Cadastro de Usuário"}</h5>
      </Card.Header>
          <hr className="w-100 border-dark opacity p-0 my-0 m-0"/>
        <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>
                Nome<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                {...register("name.firstname")}
                isInvalid={!!errors.name?.firstname}
                maxLength={50}
                placeholder="Digite seu nome"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.firstname?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>
                Sobrenome<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                {...register("name.lastname")}
                isInvalid={!!errors.name?.lastname}
                maxLength={50}
                placeholder="Digite seu sobrenome"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.lastname?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>
                E-mail<span 
                className="text-danger"
                >*</span>
              </Form.Label>
              <Form.Control
                type="email"
                {...register("email")}
                isInvalid={!!errors.email}
                placeholder="Digite seu e-mail"
                name="email"
              />
               <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3 position-relative">
              <Form.Label>
                Senha<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type={mostrarSenha ? "text" : "password"}
                {...register("password")}
                isInvalid={!!errors.password}
                placeholder="Digite sua senha"
                name="password"
                maxLength={14}
                inputMode="numeric"
              />
                <Button
                variant="link"
                type="button"
                className="position-absolute end-0 top-0 mt-2 me-2 p-0"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                style={{ zIndex: 10 }}
                >
                </Button>
               <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          </div>

      <div className="text-center">
        <Button 
              type="submit" 
              variant="primary" 
              className="px-4 py-2">
         {id ? "Atualizar Usuario" : "Cadastrar Usuário"}
        </Button>
        </div>
      </Form>
      </CardBody>

      
    </Card>
  );
}
