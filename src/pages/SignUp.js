import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from '../components/Copyright';
import useStyles from "../Config/myStyles";

import { toast } from "react-toastify";

import firebase from "firebase/app";
import { UserContext } from '../context/UserContext';
import { Redirect, useHistory } from 'react-router-dom';
import { SET_USER } from '../context/action.types';

const SignUp = () =>
{
  //

  const {state, dispatch} = useContext(UserContext);
  const {isLoading, user} = state;
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  firebase
    .auth()
    .onAuthStateChanged(res=>{
        if(res)
        {
            dispatch({
                type: SET_USER,
                payload: {email: res.email, uid: res.uid}
            });
            history.push('/');
        }
        else
        {

        }
    });

  const handleSignUp = () => {
      
    firebase
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .then(
        res=>{
            console.log(res);
            toast(res.user.email, {type:"success"});

            dispatch({
              type: SET_USER,
              payload: {email: res.user.email, uid: res.user.uid}
            });

            history.push('/');
            
            
        }
    )
    .catch(
        error=>{
            console.log(error);
            toast(error.message, {type:"error"});
        }
    )

  }

  const handleSubmit = (e) => {
      e.preventDefault();
      handleSignUp();

  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={ e=>setEmail(e.target.value) }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={ e=>setPassword(e.target.value) }
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp;