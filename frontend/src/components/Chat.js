import React, {useEffect, useState, useRef} from 'react';
import {Button, Card, Form} from "react-bootstrap";
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
color: #46516e;
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
background-color: transparent;
color: lightgray;
border: 1px solid lightgray;
padding: 10px;
margin-left: 5px;
text-align: center;
border-top-left-radius: 10%;
border-bottom-left-radius: 10%;
`;


function Chat ({user}) {

  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  const socketRef = useRef()


  useEffect(()=>{
    socketRef.current = io.connect(`${process.env.REACT_APP_SERVER_URL}/Class-1`)
    socketRef.current.on("messages", msjs => {
        setMessages(msjs)
        console.log(msjs)
      })
  },[])

  const handleChange = (e) => {
    setText(e.target.value)
  }


  const handleChatSubmit = (e) => {
    e.preventDefault()
    const newObj = {
      userName: user.name,
      moderator: user.userType === "moderator",
      text
    }
    setText("")
    socketRef.current.emit("send message", newObj)
  }

    return (
            <Card className="bg-dark" style={{ height: '18rem', overflow:"auto" }}>
              <Card.Body>
              {messages.map((message, index) => {
                if (message.userName === user.name) {
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
                    {message.userName}
                    <PartnerMessage>
                      {message.text}
                    </PartnerMessage>
                  </PartnerRow>
                )
              })}
              </Card.Body>
              <Card.Footer className="justify-content-md-center">
                <Form onSubmit={handleChatSubmit}>
                <Form.Control value={text} onChange={handleChange} type="text" rows={2} />
                <Button className="bg-primary" type="submit" >Enviar</Button>
                </Form>
              </Card.Footer>
            </Card>
      );
}

export default Chat