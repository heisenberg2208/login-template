import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import firebase from "firebase/app";
import { toast } from "react-toastify";

const Home = () => {

    const context = useContext(UserContext);

    if(! context.user?.uid)
    {
        return <Redirect to="/signin" />
    }

    const logOut = () => {
        firebase
        .auth()
        .signOut()
        .then(
            res=> {
                context.setUser(null);
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