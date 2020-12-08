import React, {useEffect} from 'react';
import { Route, useHistory } from "react-router-dom";


function PrivateRoute(props){
    const history = useHistory()
    useEffect(()=>{
      const token = localStorage.getItem("token")
      if(!token){
        history.push("/login")
      }
    },[])
    return(
      <Route {...props}></Route>
    )
  }

export default PrivateRoute