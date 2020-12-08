import React from 'react';
import {Container} from "react-bootstrap";
import ReactPlayer from 'react-player';


//Componente que renderiza un reproductor con un video simulando una clase
function Stream() {

  return (
    <Container className="mt-3">
        <ReactPlayer width="auto" height="300px" url="https://youtu.be/i0Ot3flriJI"/>
    </Container>
  );
}

export default Stream; 