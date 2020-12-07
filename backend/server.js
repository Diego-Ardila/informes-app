require("dotenv").config({path: __dirname + '/.env.dev'});
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
//Inicializacion de socket.io y su respectiva conexion con el servidor
const io = require('socket.io')(server);
//Configuracion de la base de datos
const db = require("./connection/dbConnection");
db()
//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("common"))
app.use(helmet())


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

server.listen(port , () => console.log(`App running on port: ${port}`));