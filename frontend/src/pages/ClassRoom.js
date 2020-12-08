import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {getUser} from '../utils/httpRequests';
import  swal  from "sweetalert";
import Stream from '../components/Stream';
import Chat from '../components/Chat';

//Componente que se encarga de renderizar los elementos que se presentan durante la clase(Video y Chat)
function ClassRoom() {
    //Informacion de usuario traida en la autenticacion
    const [user,setUser] = useState({})
    const history = useHistory()

    useEffect(()=>{
        //Funcion que se crea para utilizar el async/await para la peticion asincrona
        (async ()=>{
          try{
            const token = localStorage.getItem("token")
            //peticion http a la base de datos para validar el token existente
            const newUser = await getUser(token)
            
            setUser(newUser)
              }catch(err){
            swal("No estas autorizado",`Debes registrarte para acceder aqui`,"error")
            //Si el token no es valido, se procedera a eliminar del almacenamiento del navegador
            localStorage.removeItem("token")
            history.push("/login")
          }
        })()
    },[])

  return (
    <Container className="mt-3">
      <h3 style={{color:"whitesmoke"}}>Bienvenido(a) {user && user.name} a tu clase de Hoy</h3>
      <Row className="mt-5 justify-content-center">
        {/* Diseño Responsive de columnas por medio de Bootstrap*/}
        <Col md={12} lg={7}>
          <Stream/>
        </Col>
        <Col md={12} lg={5}>
          <Chat user={user} />
        </Col>
      </Row>
    </Container>
  );
}

export default ClassRoom;