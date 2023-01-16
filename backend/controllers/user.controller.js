const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  //Controlador que se encarga de manejar la creacion de un nuevo usuario, almacenarlo en la base de datos
  //y retornar el JWT para la autenticacion del mismo
  async createUser(req, res) {
    const data = req.body;
    try {
      //Encriptar la contraseña
      data.password = await bcrypt.hash(data.password, 7);
      const userDb = await User.create(data);
      //generacion de token
      const token = jwt.sign({ id: userDb._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).json(token);
    } catch (err) {
      //manejo de errores prediseñados en las validaciones del modelo
      if (err?.errors?.user?.properties.message) {
        res.status(400).json(err.errors.user.properties.message);
      } else {
        res.status(400).json(err.message);
      }
    }
  },

  //Controlador que se encarga de Validar la identidad de un usuario que ya existe en la base de datos
  async login(req, res) {
    try {
      const { user, password } = req.body;
      //Revisar existencia de un usuario con ese nickname(que es unico)
      const userDb = await User.findOne({ user });
      if (!userDb) {
        throw new Error("El usuario es invalido");
      }
      //Validando que su contraseña sea correcta
      const isValid = await bcrypt.compare(password, userDb.password);
      if (!isValid) {
        throw new Error("La contraseña es invalida");
      }
      const token = jwt.sign({ id: userDb._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).json(token);
    } catch (err) {
      res.status(400).json(err.message);
    }
  },

  //Controlador que se encarga de validar la autenticidad del token suministrado,
  //por medio de un middleware que retorna el id del usuario
  getUser: async function (req, res) {
    const { userId } = req;
    try {
      const userDb = await User.findById(userId);
      if (!userDb) throw new Error("usuario invalido");
      res.status(200).json(userDb);
    } catch (err) {
      res.status(400).json(err.message);
    }
  },
};
