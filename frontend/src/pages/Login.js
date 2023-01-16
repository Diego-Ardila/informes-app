import React from "react";
import * as Yup from "yup";
import { Container, Form, Button, Col, Image, Spinner } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { login } from "../utils/httpRequests";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";

//Esquema de Validaciones del formulario
const formSchema = Yup.object().shape({
  user: Yup.string().required("campo requerido"),
  password: Yup.string().required("campo requerido"),
});

//Componente que renderiza el Formulario del login con sus respectivas validaciones
function Login() {
  const history = useHistory();
  let {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  //Callback que envia la data recogida de los input para ser procesada en la base de datos
  const onSubmit = async (data) => {
    try {
      isSubmitting = true;
      const token = await login(data);
      localStorage.setItem("token", token);
      swal(
        "Registro Satisfactorio",
        "Ya podras iniciar tu clase vigente",
        "success"
      );
      history.push("/classRoom");
    } catch (err) {
      swal("Error", `${err.response.data}`, "error");
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} className="card mt-5 p-3">
        <Form.Row className="mt-5 justify-content-center">
          <Col sm={6} md={4} className="text-center">
            <h3 style={{ color: "white" }}>Classroom chat</h3>
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center mt-3">
          <Col className="col-lg-6">
            <Form.Group className="text-left" controlId="formBasicEmail">
              <Form.Label style={{ color: "white" }}>Usario</Form.Label>
              <Form.Control
                name="user"
                ref={register}
                type="text"
                placeholder="Escriba su usuario"
                className={errors.user ? "is-invalid" : null}
              />
              {errors.user && (
                <div style={{ color: "white" }} className="error-message">
                  {errors.user.message}
                </div>
              )}
              <Form.Text className="text-muted">
                Nunca compartiremos tu correo con nadie.
              </Form.Text>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center mt-3">
          <Col className="col-lg-6">
            <Form.Group className="text-left" controlId="formBasicPassword">
              <Form.Label style={{ color: "white" }}>Contraseña</Form.Label>
              <Form.Control
                name="password"
                ref={register}
                type="password"
                placeholder="XXXXXX"
                className={errors.password ? "is-invalid" : null}
              />
              {errors.password && (
                <div style={{ color: "white" }} className="error-message">
                  {errors.password.message}
                </div>
              )}
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center mt-3">
          <Col className="col-lg-6 text-center">
            {isSubmitting ? (
              <Col className="col-lg-6 text-center">
                <Spinner animation="border" variant="warning" size="xl" />
              </Col>
            ) : null}
            <Button
              disabled={isSubmitting}
              variant="outline-warning"
              type="submit"
            >
              {!isSubmitting ? "Entrar" : "...Cargando"}
            </Button>
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center mt-2">
          <Link style={{ color: "yellow" }} to="/registro">
            Crea una cuenta
          </Link>
        </Form.Row>
      </Form>
    </Container>
  );
}

export default Login;
