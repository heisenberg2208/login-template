import React from 'react';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";


import { UserContext } from "./context/UserContext";

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';


//firebase
import firebase from "firebase/app";
import "firebase/auth";

import firebaseConfig from "./Config/firebaseConfig";
import { useState } from 'react';


firebase.initializeApp(firebaseConfig);

const App = () =>
{
  //

  const[user,setUser]= useState(null);
  return(

    <Router>
    <ToastContainer />

    <UserContext.Provider value={{user,setUser}}>
    
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/signup" component={SignUp}/>
    </Switch>
    
    </UserContext.Provider>

  </Router>

  );
  
}

export default App;