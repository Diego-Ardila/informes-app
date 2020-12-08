import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from './pages/Login';
import Header from './pages/Header';
import Register from './pages/Register';
import ClassRoom from './pages/ClassRoom';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

//Componente principal que maneja el enrutamiento de la aplicacion
function App() {

  return (
    <div className="App">
      <Header/>
      <Router>
        <Switch>
          <PrivateRoute exact path="/classRoom" component={ClassRoom} />
          <Route exact path="/registro" component={Register} />
          <Route exact path="/login" component={Login} />
          <Redirect from="*" to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
