require("dotenv").config({path: __dirname + '/.env.dev'});
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require('./routes/user.routes');
const Message = require("./models/message.model");

//Inicializacion de socket.io y su respectiva conexion con el servidor, se tuvo que agregar una configuracion de cors
const options={
  cors:true,
  origins:["http://localhost:3000"],
}
const io = require('socket.io')(server,options);

//Configuracion de la base de datos
const db = require("./connection/dbConnection");

db()

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("common"))
app.use(helmet())

//End points
app.use("/user", userRouter)

//Web Sockets
io.of("Class-1").on("connection", async (socket) => {

  try{
    const messages = await Message.find()
    socket.emit("database messages", messages)
    socket.on("send message", async (msj) => {
      const newMessage = await Message.create(msj)
      io.of("Class-1").emit("new messages", newMessage)
    })
  }catch(err){
    console.log(err)
  }
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

server.listen(port , () => console.log(`App running on port: ${port}`));