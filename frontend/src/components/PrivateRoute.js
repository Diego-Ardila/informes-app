import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { getUser } from "../utils/httpRequests";

//Rutas privadas que impiden el ingreso de usuarios no autenticados con token
function PrivateRoute(props) {
  const [user, setUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    getUser(token)
      .then((res) => setUser(res))
      .catch(() => {
        swal(
          "No estas autorizado",
          `Debes registrarte para acceder aqui`,
          "error"
        );
        //Si el token no es valido, se procedera a eliminar del almacenamiento del navegador
        localStorage.removeItem("token");
        history.push("/login");
      });
  }, []);
  return <Route {...props} user={user}></Route>;
}

export default PrivateRoute;
