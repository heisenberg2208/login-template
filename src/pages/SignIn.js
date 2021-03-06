import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from '../components/Copyright';
import useStyles from "../Config/myStyles";
import { UserContext } from '../context/UserContext';
import firebase from "firebase/app";
import { toast } from 'react-toastify';
import { Redirect, useHistory } from 'react-router-dom';
import { SET_LOADING, SET_USER } from '../context/action.types';


//https://reactjsexample.com/build-a-smooth-and-lightweight-react-component-loading-with-css/
import { CommonLoading } from 'react-loadingg';




const SignIn = () =>
{
  //

  console.log("Inside SignIn");
  const classes = useStyles();

  const {state, dispatch} = useContext(UserContext);

  const {isLoading, user} = state;

  const history = useHistory();

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[loading, setLoading] = useState(true);


  firebase
    .auth()
    .onAuthStateChanged(res=>{

      setLoading(false);

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

  const handleSignIn = () => {

    

    
    
      firebase
      .auth()
      .signInWithEmailAndPassword(email,password)
      .then(res=>{
          console.log(res);
          dispatch({
            type: SET_USER,
            payload: {email:res.user.email, uid:res.user.uid}
          });
          history.push("/");
      })
      .catch(error=>{
          console.log(error);
          toast("Login failed", {type: "error"});
      })
    

  }


  const handleSubmit = (e) => {
      //
      e.preventDefault();
      handleSignIn();
  }

  if(loading)
  {
    return(<CommonLoading />);
  }
  else
  {


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            onChange={e=>setEmail(e.target.value)}
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
            onChange={e=>setPassword(e.target.value)}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );

  }
}

export default SignIn;