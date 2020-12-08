import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Login from './pages/Login';
import Header from './pages/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Route exact path="/login" component={Login} />
        <Redirect from="*" to="/login" />
      </Router>
    </div>
  );
}

export default App;
