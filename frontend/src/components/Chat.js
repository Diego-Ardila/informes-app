import React, {useEffect, useState, useRef} from 'react';
import {Button, Card, Form, Row} from "react-bootstrap";
import styled from "styled-components";
import io from "socket.io-client";


const MyRow = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
margin-top: 10px;
`;

const MyMessage = styled.div`
width: 45%;
background-color: #c7d40a;
color: black;
padding: 10px;
margin-right: 5px;
text-align: center;
border-top-right-radius: 10%;
border-bottom-right-radius: 10%;
`;

const PartnerRow = styled(MyRow)`
justify-content: flex-start;
`;

const PartnerMessage = styled.div`
width: 45%;
display: "grid";
grid-template-rows: 20px 30px;
background-color: transparent;
border: 1px solid lightgray;
padding: 5px;
margin-left: 5px;
border-top-left-radius: 10%;
border-bottom-left-radius: 10%;
`;

const Name = styled.p`
grid-row: 1;
color: yellow;
text-align: start;
margin: 0;
`;

const Text = styled.p`
grid-row: 2;
color: lightgray;
text-align: center;
`;


function Chat ({user}) {
  const messageEl = useRef(null);
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  const socketRef = useRef()


  useEffect(()=>{
    socketRef.current = io.connect(`${process.env.REACT_APP_SERVER_URL}/Class-1`)
    socketRef.current.on("database messages", msjs => {
        setMessages(msjs)
        console.log(msjs)
      })
    socketRef.current.on("new messages", msj => {
        setMessages(prevMsjs => prevMsjs.concat(msj))
        console.log(msj)
    })
  },[])

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  const handleChange = (e) => {
    setText(e.target.value)
  }


  const handleChatSubmit = (e) => {
    e.preventDefault()
    const newObj = {
      userName: user.user,
      moderator: user.userType === "moderator",
      text
    }
    setText("")
    socketRef.current.emit("send message", newObj)
  }

    return (
            <Card className="mt-3">
              <Card.Body ref={messageEl} style={{ height: '18rem', overflow:"auto" }}>
              {messages.map((message, index) => {
                if (message.userName === user.user) {
                  return (
                    <MyRow key={index}>
                      <MyMessage>
                        {message.text}
                      </MyMessage>
                    </MyRow>
                  )
                }
                return (
                  <PartnerRow key={index}>
                        <PartnerMessage>
                            <Name>{message.userName} {message.moderator && "(moderador)"}</Name>
                            <Text>{message.text}</Text>
                        </PartnerMessage>
                  </PartnerRow>
                )
              })}
              </Card.Body>
              <Card.Footer className="justify-content-md-center">
                <Form onSubmit={handleChatSubmit}>
                <Form.Control value={text} onChange={handleChange} type="text" rows={2} />
                <Button variant="outline-warning" className="m-3" type="submit" >Enviar</Button>
                </Form>
              </Card.Footer>
            </Card>
      );
}

export default Chat