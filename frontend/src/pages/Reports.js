import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Container, Form, Button, Col, Spinner, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createReport, getGroups } from "../utils/httpRequests";
import swal from "sweetalert";
import { monthsList } from "../utils/constants";

//Esquema de Validaciones del formulario, incluyendo si las contraseñas coinciden
const formSchema = Yup.object().shape({
  name: Yup.string().required("Campo Requerido"),
  publications: Yup.string().required("Campo Requerido"),
  videos: Yup.string().required("Campo Requerido"),
  hours: Yup.string().required("Campo Requerido"),
  revisits: Yup.string().required("Campo Requerido"),
  students: Yup.string().required("Campo Requerido"),
  month: Yup.string().required("Campo Requerido"),
});

//Componente que se encarga de Renderizar el formulario de registro, con sus respectivas validaciones,
//incluyendo la revision en base de datos de que no se este ingresando un nombre de usuario(nickname) repetido
function Register() {
  let {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
    reset,
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
      await createReport({
        ...data,
        year: new Date().getFullYear(),
      });
      swal(
        "Registro Satisfactorio",
        "Tu informe fue creado satisfactoriamente",
        "success"
      );
      reset();
    } catch (err) {
      swal("Error", `${err.response.data}`, "error");
      isSubmitting = false;
    }
  };

  const getDefaultMonth = () => {
    const currentMonth = new Date().getMonth();
    return currentMonth ? currentMonth - 1 : 11;
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col className="card p-3 mb-5" md={4} sm={11}>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="text-left">
              <Form.Label style={{ color: "white" }}>Mes</Form.Label>
              <Form.Control
                name="month"
                ref={register({ required: true })}
                as="select"
                defaultValue={getDefaultMonth()}
              >
                {monthsList.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
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
              <Form.Label style={{ color: "white" }}>Publicaciones</Form.Label>
              <Form.Control
                ref={register}
                name="publications"
                type="number"
                defaultValue={0}
                placeholder="Ingresa tu numero de publicaciones"
                className={errors.publications ? "is-invalid" : null}
              />
              {errors.publications && (
                <div style={{ color: "red" }} className="error-message">
                  {errors.publications.message}
                </div>
              )}
            </Form.Group>
            <Form.Group className="text-left">
              <Form.Label style={{ color: "white" }}>Videos</Form.Label>
              <Form.Control
                ref={register}
                name="videos"
                type="number"
                defaultValue={0}
                placeholder="Ingresa la cantidad de videos"
                className={errors.videos ? "is-invalid" : null}
              />
              {errors.videos && (
                <div style={{ color: "red" }} className="error-message">
                  {errors.videos.message}
                </div>
              )}
            </Form.Group>
            <Form.Group className="text-left">
              <Form.Label style={{ color: "white" }}>Horas</Form.Label>
              <Form.Control
                ref={register}
                name="hours"
                type="number"
                defaultValue={0}
                placeholder="Ingresa el numero de horas"
                className={errors.hours ? "is-invalid" : null}
              />
              {errors.hours && (
                <div style={{ color: "red" }} className="error-message">
                  {errors.hours.message}
                </div>
              )}
            </Form.Group>
            <Form.Group className="text-left">
              <Form.Label style={{ color: "white" }}>Revisitas</Form.Label>
              <Form.Control
                ref={register}
                name="revisits"
                type="number"
                defaultValue={0}
                placeholder="Ingresa la cantidad de revisitas"
                className={errors.revisits ? "is-invalid" : null}
              />
              {errors.revisits && (
                <div style={{ color: "red" }} className="error-message">
                  {errors.revisits.message}
                </div>
              )}
            </Form.Group>
            <Form.Group className="text-left">
              <Form.Label style={{ color: "white" }}>Estudios</Form.Label>
              <Form.Control
                ref={register}
                name="students"
                type="number"
                defaultValue={0}
                placeholder="Ingresa la cantidad de estudios biblicos"
                className={errors.students ? "is-invalid" : null}
              />
              {errors.students && (
                <div style={{ color: "red" }} className="error-message">
                  {errors.students.message}
                </div>
              )}
            </Form.Group>
            <Form.Group className="text-left">
              <Form.Label style={{ color: "white" }}>
                Grupo al que pertenece
              </Form.Label>
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
