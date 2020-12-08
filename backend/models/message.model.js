const {Schema, model} = require("mongoose");


const messageSchema = new Schema({

    userName:{
        type: String
    },
    moderator:{
        type: Boolean
    },
    text:{
        type: String
    }
},{
    timestamps: true
});
const Message = new model("Message", messageSchema);
module.exports = Message