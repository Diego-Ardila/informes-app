const { Schema , model, models } = require("mongoose");


const userSchema = new Schema ({
    name:{
        type: String,
        required: true,
        trim: true
    },
    user:{
        type: String,
        required: true,
        validate: {
            async validator(user){
                try{
                  const userName = await models.User.findOne({user})
                  return !userName
                }catch(err){
                    return false
                }
            },
            message:"El nombre de Usuario ya existe"
        }
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    }
},{
    timestamps: true
})



const User = new model("User", userSchema)

module.exports = User