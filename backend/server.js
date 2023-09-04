require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const groupsRouter = require("./routes/groups.routes");
const reportRouter = require("./routes/report.routes");

//Configuracion de la base de datos
const db = require("./connection/dbConnection");
db();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(helmet());

//End points
app.use("/user", userRouter);
app.use("/groups", groupsRouter);
app.use("/report", reportRouter);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => console.log(`App running on port: ${port}`));
