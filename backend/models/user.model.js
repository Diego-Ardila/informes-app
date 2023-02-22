const { Schema, model, models } = require("mongoose");

//Essquema de la entidad de usuarios
const userSchema = new Schema(
  {
    //Nombre completo del usuario, no importa si otros usuarios tienen el mismo
    name: {
      type: String,
      required: true,
      trim: true,
    },
    //Nickname del usuario, debe ser unico!
    user: {
      type: String,
      required: true,
      validate: {
        async validator(user) {
          try {
            const userName = await models.User.findOne({ user });
            return !userName;
          } catch (err) {
            return false;
          }
        },
        message: "El nombre de Usuario ya existe",
      },
    },
    password: {
      type: String,
      required: true,
    },
    //Tipo de usuario: Estudiante o Moderador
    groupId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Group",
    },
  },
  {
    timestamps: true,
  }
);

const User = new model("User", userSchema);

module.exports = User;
