import React, {useEffect, useState, useRef} from 'react';
import {Col, Button, Card, Form, Container, Row} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {getUser} from '../utils/httpRequests';
import styled from "styled-components";
import  swal  from "sweetalert";
import Stream from '../components/Stream';
import Chat from '../components/Chat';


function ClassRoom() {
    const [user,setUser] = useState({})
    const history = useHistory()

    useEffect(()=>{
        (async ()=>{
          try{
            const token = localStorage.getItem("token")
            const newUser = await getUser(token)
            
            setUser(newUser)
              }catch(err){
            swal("No estas autorizado",`Debes registrarte para acceder aqui`,"error")
            history.push("/login")
          }
        })()
    },[])

  return (
    <Container className="mt-3">
      <h3 style={{color:"whitesmoke"}}>Bienvenido(a) {user && user.name} a tu clase de Hoy</h3>
      <Row className="mt-5 justify-content-center">
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