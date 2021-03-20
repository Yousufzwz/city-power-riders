import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Destination from './Components/Destination/Destination';
import PrivateRoute from './Components/Login/PrivateRoute';
import Going from './Components/Going/Going';
export const UserContext = createContext();  
function App() {
  const[user, setUser]=useState({})  
  return (
    <main>
      <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Header/>
        <Switch>
          <Route path="/home">
          <Home/>
          </Route>
          <Route path="/login">
          <Login/>
          </Route>
          <PrivateRoute path="/destination/:placeName">
          <Destination/>
          </PrivateRoute>
          <Route path="/going/:destination-area">
          <Going></Going>
          </Route>
          <Route exact path="/">
          <Home/>
          </Route>
        </Switch>
      </Router>
      </UserContext.Provider>
    </main>
  );
}

export default App;
