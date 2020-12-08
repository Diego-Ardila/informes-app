const {Schema, model} = require("mongoose");

//Esquema de la entidad de Mensajes
const messageSchema = new Schema({
//El nombre de usuario o nickname que selecciono cada usuario
    userName:{
        type: String
    },
//para determinar si el usuario es moderador
    moderator:{
        type: Boolean
    },
//texto correspondiente del mensaje
    text:{
        type: String
    }
},{
    timestamps: true
});
const Message = new model("Message", messageSchema);
module.exports = Message