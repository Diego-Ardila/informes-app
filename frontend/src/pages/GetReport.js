import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Container, Form, Button, Col, Image, Spinner } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getGroups, getReport } from "../utils/httpRequests";
import swal from "sweetalert";
import { monthsList } from "../utils/constants";

//Esquema de Validaciones del formulario
const formSchema = Yup.object().shape({
  month: Yup.number().typeError("campo requerido"),
  year: Yup.number().typeError("campo requerido"),
  groupId: Yup.string().required("campo requerido"),
});

//Componente que renderiza el Formulario del login con sus respectivas validaciones
function Login() {
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
      const token = localStorage.getItem("token");
      const response = await getReport({ ...data, token });
      const url = URL.createObjectURL(
        new Blob([response], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "nombre-archivo.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      const message =
        err.response.data instanceof Blob
          ? await err.response.data?.text()
          : "Hubo un error, vuelve a intentarlo";
      swal("Error", `${message}`, "error");
    }
  };

  const getDefaultMonth = () => {
    const currentMonth = new Date().getMonth();
    return currentMonth ? currentMonth - 1 : 11;
  };

  const getDefaultYear = () => {
    return new Date().getFullYear();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} className="card mt-5 p-3">
        <Form.Row className="mt-5 justify-content-center">
          <Col sm={6} md={4} className="text-center">
            <h3 style={{ color: "white" }}>Descargar informe</h3>
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center mt-3">
          <Col className="col-lg-6">
            <Form.Group className="text-left">
              <Form.Label style={{ color: "white" }}>Mes</Form.Label>
              <Form.Control
                name="month"
                ref={register({ required: true })}
                as="select"
                defaultValue={getDefaultMonth()}
              >
                {monthsList.map((month, i) => (
                  <option key={i} value={i}>
                    {month}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center mt-3">
          <Col className="col-lg-6">
            <Form.Group className="text-left" controlId="formBasicPassword">
              <Form.Label style={{ color: "white" }}>Año</Form.Label>
              <Form.Control
                name="year"
                ref={register}
                type="number"
                placeholder="Escriba el año"
                className={errors.year ? "is-invalid" : null}
                defaultValue={getDefaultYear()}
              />
              {errors.year && (
                <div style={{ color: "red" }} className="error-message">
                  {errors.year.message}
                </div>
              )}
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center mt-3">
          <Col className="col-lg-6">
            <Form.Group className="text-left">
              <Form.Label style={{ color: "white" }}>Grupo</Form.Label>
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
              {!isSubmitting ? "Descargar" : "...Cargando"}
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
}

export default Login;
