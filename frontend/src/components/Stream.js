import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import ReactPlayer from 'react-player';



function Stream() {

  return (
    <Container>
        <ReactPlayer width="auto" height="300px" url="https://youtu.be/i0Ot3flriJI"/>
    </Container>
  );
}

export default Stream; 