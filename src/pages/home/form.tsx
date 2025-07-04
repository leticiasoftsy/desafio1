import React, { useEffect, useState } from "react";
import { Form, Button, Col, Card, CardBody } from "react-bootstrap";
import type { User, } from "../../@types/user";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type DataForm } from "./formData";
import { useForm } from "react-hook-form";

interface UserFormProps {
  id?: string;
}

export default function UserForm({ id }: UserFormProps){
  const navigate = useNavigate();

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

    async function carregarUsuarioDaAPI() {
      try {
        const res = await fetch(`https://fakestoreapi.com/users/${id}`);
        if (!res.ok) throw new Error("Usuario não encontrado");

        const data = await res.json();
        setFormData(data);

        setValue("name", `${data.name.firstname} ${data.name.lastname}`);
        setValue("email", data.email);
        setValue("password", data.password)

        setFormData({
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
      } catch (error) {
        console.log("Id invalido ou erro:", error)
      }
    }

    carregarUsuarioDaAPI();
    }, [id, setValue])


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

  useEffect(() => {
    if (id && formData.name.firstname && formData.email) {
    setValue("name", formData.name.firstname);
    setValue("email", formData.email)
    setValue("password", formData.password)
    }
  }, [id, formData, setValue])

  const onSubmit = (data:DataForm) => {
    navigate("/usuarios", {state: {usuarioCadastrado: true}}); //mostrar os usuarios apos fazer o cadastro
    console.log("Dados do formulario", data);
    <data value="" className="name"></data>
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
                {...register("name")}
                isInvalid={!!errors.name}
                maxLength={50}
                placeholder="Digite seu nome"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: {
                      ...formData.name,
                      firstname: e.target.value
                    }
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
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
                onChange={handleInputChange}
              />
               <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>
                Senha<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                {...register("password")}
                isInvalid={!!errors.password}
                placeholder="Digite sua senha"
                name="password"
                onChange={handleInputChange}
                maxLength={14}
                inputMode="numeric"
              />
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
