import React from "react";
import {useHistory} from 'react-router-dom';
import * as Yup from "yup";
import { Container, Form, Button, Col, Spinner, Row } from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import {createUser} from '../utils/httpRequests';
import swal from 'sweetalert';


const formSchema = Yup.object().shape({   
    name: Yup.string().required("Campo Requerido"),
    user: Yup.string().required("Campo Requerido"),
    password: Yup.string().required("Campo Requerido"),
    v_password: Yup.string().oneOf([Yup.ref('password')], "Las contraseñas deben coincidir").required("Campo Requerido")
})

function Register() {
    const history = useHistory()
    let { register, handleSubmit, errors, formState:{isSubmitting} } = useForm({
        resolver: yupResolver(formSchema)
    });

      const onSubmit= async (data)=>{
          try{
            isSubmitting= true
            const token = await createUser(data)
            localStorage.setItem("token", token)
            swal("Registro Satisfactorio","Tu usuario fue creado satisfactoriamente","success")
            history.push("/classRoom")
          }catch(err){
              swal("Error",`${err.response.data}`,"error")
              isSubmitting= false
          }
      }
    return (
        <Container>
            <Row className="justify-content-md-center mt-3">
                <Col className="card p-3" md={4} sm={11}>
                <Form onSubmit={handleSubmit(onSubmit)}  noValidate>
                    <Form.Group className="text-left">
                        <Form.Label  style={{color: "white"}}>Nombre</Form.Label>
                        <Form.Control ref={register} name="name" type="text" placeholder="Ingresa tu nombre"  className={ errors.name ? "is-invalid" : null}  />
                        { errors.name && <div style={{color:"red"}} className="error-message">{errors.name.message}</div>}
                    </Form.Group>                      
                    <Form.Group className="text-left">
                        <Form.Label  style={{color: "white"}}>Usuario</Form.Label>
                        <Form.Control ref={register} name="user" type="text" placeholder="Ingresa tu usuario, debe ser Unico"  className={ errors.user ? "is-invalid" : null}  />
                        { errors.user && <div style={{color:"red"}} className="error-message">{errors.user.message}</div>}
                    </Form.Group> 
                    <Form.Group className="text-left">
                        <Form.Label  style={{color: "white"}}>Contraseña</Form.Label>
                        <Form.Control ref={register} name="password" type="password" placeholder="Ingresa tu Contraseña" className={ errors.password ? "is-invalid" : null}  />
                        { errors.password && <div style={{color:"red"}} className="error-message">{errors.password.message}</div>}
                    </Form.Group> 
                    <Form.Group className="text-left">
                        <Form.Label  style={{color: "white"}}>Validar Contraseña</Form.Label>
                        <Form.Control ref={register} name="v_password" type="password" placeholder="Ingresa nuevamente tu Contraseña" className={ errors.v_password ? "is-invalid" : null}  />
                        { errors.v_password && <div style={{color:"red"}} className="error-message">{errors.v_password.message}</div>}
                    </Form.Group> 
                    <Form.Group className="text-left">
                        <Form.Label style={{color: "white"}}>Tipo de Usuario</Form.Label>
                        <Form.Control name="userType" ref={register({required: true})} as="select">
                            <option value="student"> Estudiante </option>
                            <option value="moderator"> Moderador </option>
                        </Form.Control>
                    </Form.Group>
                  <Form.Row className="justify-content-center mt-3">
                    <Col className="col-lg-6 text-center">
                    {isSubmitting ? <Col className="col-lg-6 text-center"><Spinner animation="border" variant="warning" size="xl" /></Col>  : null}
                        <Button disabled={isSubmitting} variant="outline-warning" type="submit">
                         {!isSubmitting ? "Enviar" : "...Cargando"}
                        </Button>
                    </Col>
                  </Form.Row>
                </Form>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Register