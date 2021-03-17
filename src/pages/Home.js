import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import firebase from "firebase/app";
import { toast } from "react-toastify";
import { SET_USER } from "../context/action.types";

const Home = () => {

    
    const {state, dispatch} = useContext(UserContext);
    console.log("Inside Home");

    
    const {user , isLoading} = state;
    
    const history = useHistory();

    if(! user?.uid)
    {
        history.push("/signin");
    }


    

    const logOut = () => {
        firebase
        .auth()
        .signOut()
        .then(
            res=> {
                dispatch({
                    type: SET_USER,
                    payload: null
                })
                toast("Logged out successfully..");
            }
        )

    }

    return(
        <div>
            <h1>This is Home</h1>
            <Button onClick={logOut}>Log me out</Button>
        </div>
        
        );
}

export default Home;