import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Container, Form, Button, Col, Spinner, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createUser, getGroups } from "../utils/httpRequests";
import swal from "sweetalert";

//Esquema de Validaciones del formulario, incluyendo si las contraseñas coinciden
const formSchema = Yup.object().shape({
  name: Yup.string().required("Campo Requerido"),
  user: Yup.string().required("Campo Requerido"),
  password: Yup.string().required("Campo Requerido"),
  v_password: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
    .required("Campo Requerido"),
  keyWord: Yup.string()
    .matches(/Reino1914/, "Palabra clave incorrecta")
    .required("Campo Requerido"),
});

//Componente que se encarga de Renderizar el formulario de registro, con sus respectivas validaciones,
//incluyendo la revision en base de datos de que no se este ingresando un nombre de usuario(nickname) repetido
function Register() {
  const history = useHistory();
  let {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const [groupsList, setGroupsList] = useState([]);

  useEffect(() => {
    const getGroupsWrapper = async () => {
      const groups = await getGroups();
      setGroupsList(groups);
    };
    getGroupsWrapper();
  }, []);

  //Callback que envia la data recogida de los input para ser procesada en la base de datos
  const onSubmit = async (data) => {
    try {
      isSubmitting = true;
      const token = await createUser(data);
      localStorage.setItem("token", token);
      swal(
        "Registro Satisfactorio",
        "Tu usuario fue creado satisfactoriamente",
        "success"
      );
      history.push("/classRoom");
    } catch (err) {
      swal("Error", `${err.response.data}`, "error");
      isSubmitting = false;
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col className="card p-3 mb-5" md={4} sm={11}>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="text-left">
              <Form.Label style={{ color: "white" }}>Nombre</Form.Label>
              <Form.Control
                ref={register}
                name="name"
                type="text"
                placeholder="Ingresa tu nombre"
                className={errors.name ? "is-invalid" : null}
              />
              {errors.name && (
                <div style={{ color: "red" }} className="error-message">
                  {errors.name.message}
                </div>
              )}
            </Form.Group>
            <Form.Group className="text-left">
              <Form.Label style={{ color: "white" }}>Usuario</Form.Label>
              <Form.Control
                ref={register}
                name="user"
                type="text"
                placeholder="Ingresa tu usuario, debe ser Unico"
                className={errors.user ? "is-invalid" : null}
              />
              {errors.user && (
                <div style={{ color: "red" }} className="error-message">
                  {errors.user.message}
                </div>
              )}
            </Form.Group>
            <Form.Group className="text-left">
              <Form.Label style={{ color: "white" }}>Contraseña</Form.Label>
              <Form.Control
                ref={register}
                name="password"
                type="password"
                placeholder="Ingresa tu Contraseña"
                className={errors.password ? "is-invalid" : null}
              />
              {errors.password && (
                <div style={{ color: "red" }} className="error-message">
                  {errors.password.message}
                </div>
              )}
            </Form.Group>
            <Form.Group className="text-left">
              <Form.Label style={{ color: "white" }}>
                Validar Contraseña
              </Form.Label>
              <Form.Control
                ref={register}
                name="v_password"
                type="password"
                placeholder="Ingresa nuevamente tu Contraseña"
                className={errors.v_password ? "is-invalid" : null}
              />
              {errors.v_password && (
                <div style={{ color: "red" }} className="error-message">
                  {errors.v_password.message}
                </div>
              )}
            </Form.Group>
            <Form.Group className="text-left">
              <Form.Label style={{ color: "white" }}>Palabra clave</Form.Label>
              <Form.Control
                ref={register}
                name="keyWord"
                type="password"
                placeholder="Ingresa la palabra clave"
                className={errors.keyWord ? "is-invalid" : null}
              />
              {errors.keyWord && (
                <div style={{ color: "red" }} className="error-message">
                  {errors.keyWord.message}
                </div>
              )}
            </Form.Group>
            <Form.Group className="text-left">
              <Form.Label style={{ color: "white" }}>Grupo numero</Form.Label>
              <Form.Control
                name="groupId"
                ref={register({ required: true })}
                as="select"
              >
                {groupsList.map(({ number, _id }) => (
                  <option key={_id} value={_id}>
                    {number}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
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
                  {!isSubmitting ? "Enviar" : "...Cargando"}
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
