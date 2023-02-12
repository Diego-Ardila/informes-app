//Modulo que almacena todas las peticiones HTTP
import axios from "axios";

//Creacion de un nuevo usuario, retorna un token de autenticacion
export const createUser = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: "/user",
      data,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

//Autenticacion de un usuario ya existente, retorna un token de autenticacion
export const login = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: "/user/login",
      data,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

//Llamado a la base de datos para validar la vigencia del token almacenado en el localstorage del navegador
export const getUser = async (token) => {
  try {
    const response = await axios({
      method: "GET",
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: "/user",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getGroups = async () => {
  try {
    const response = await axios({
      method: "GET",
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: "/groups",
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const createReport = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: "/report",
      data,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
