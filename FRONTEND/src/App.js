import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css'

import Login from './Pages/REGISTRATION/login';
import Register from './Pages/REGISTRATION/register';
import Admin from './Pages/Panels/admin';
import User from './Pages/Panels/user';
import Home from './Pages/Panels/home';


class App extends React.Component {
  render() {
    return (

      <>


        
        <Router>
          <Switch>
            <Route path="/login"> <Login /> </Route>
            <Route path="/register"> <Register /> </Route>
            <Route path="/admin"> <Admin /> </Route>
            <Route path="/user"> <User /> </Route>
            <Route path="/"> <Home /> </Route>
          </Switch>
        </Router>

      </>
    );
  }
}

export default App;