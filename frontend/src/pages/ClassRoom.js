import React, {useEffect, useState, useRef} from 'react';
import {Col, Button, Card, Form, Container} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {getUser} from '../utils/httpRequests';
import styled from "styled-components";
import  swal  from "sweetalert";


function ClassRoom() {
    const [user,setUser] = useState({})
    const history = useHistory()

    useEffect(()=>{
        const getData = (async()=>{
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

    </Container>
  );
}

export default ClassRoom;