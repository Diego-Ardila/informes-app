import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Header from "./pages/Header";
import Register from "./pages/Register";
import ClassRoom from "./pages/ClassRoom";
import Reports from "./pages/Reports";
import GetReport from "./pages/GetReport";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

//Componente principal que maneja el enrutamiento de la aplicacion
function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <PrivateRoute exact path="/comentarios" component={ClassRoom} />
          <PrivateRoute exact path="/generar-reporte" component={GetReport} />
          <Route exact path="/registro" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/report" component={Reports} />
          <Redirect from="*" to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
