import React, {useEffect} from 'react';
import { Route, useHistory } from "react-router-dom";

//Rutas privadas que impiden el ingreso de usuarios no autenticados con token
function PrivateRoute(props){
    const history = useHistory()
    useEffect(()=>{
      const token = localStorage.getItem("token")
      if(!token){
        //Si no se esta autenticado se reenvia a Login
        history.push("/login")
      }
    },[])
    return(
      <Route {...props}></Route>
    )
  }

export default PrivateRoute