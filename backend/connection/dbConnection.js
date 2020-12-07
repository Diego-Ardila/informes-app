const { connection, connect } = require("mongoose")

function db () {
    //setUp de las variables
    const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017/kuepa"

    const options = { 
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex: true,
        useFindAndModify:false
    }

    //conexion a base de datos
    connect(uri, options)

    //funciones ejecutadas tras la conexion
    connection.once("open", () => console.log("connection to database stablished"))
    connection.on("error", (err) => console.log("connection lost", err))
    
}
module.exports = db