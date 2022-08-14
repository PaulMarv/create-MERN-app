import React, {useState} from 'react';
import {Avatar, Button, Grid, Typography, Container, Paper} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Icon from './icon'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import {signin, signup} from '../../actions/auth'

const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}
const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState);
    const [isSignUp, setIsSignup] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isSignUp){
            dispatch(signup(formData, navigate))
        }else{
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const switchMode = ()=> {
        setIsSignup((prevIsSignUp) => !prevIsSignUp)
    }

    const googleSuccess = async (credentialResponse) =>{
        const result = jwt_decode(credentialResponse?.credential) ;
        const token = credentialResponse?.credential;
        
        try {
            dispatch({type: 'AUTH', data:{result, token}})
            navigate("/", { replace: true });

        } catch (error) {
            console.log(error)
        }
      
    }
    const googleError = (error) =>{
        console.log(error)
    }
    
  return (
   <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
        </Avatar>
        <Typography varaiant='h5'> {isSignUp ? 'Sign Up':'Sign In'} </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {
                    isSignUp &&(
                        <>
                            <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half/>
                            <Input name='lastName' label="Last Name" handleChange={handleChange} half/>
                        </>
                    )
                }
                <Input name='email' label="Email Address" handleChange={handleChange} type='email'/>
                <Input name='password' label='Password' handleChange={handleChange} type={showPassword?'text' : 'password'} handleShowPassword={handleShowPassword}/>
                {isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}
            </Grid>
            <Button type='submit' fullWidth variant="contained" color='primary' className={classes.submit}>
                {isSignUp ? 'Sign Up' :  'Sign In'}
            </Button>
            <GoogleLogin
                render ={(renderProps) => (
                    <Button
                      className={classes.googleButton}
                      color="primary"
                      fullWidth
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      startIcon={<Icon/>}
                      variant="contained"
                    >
                      Google Sign In
                    </Button>
                )}
                onSuccess={googleSuccess}
                onError={googleError}
                state_cookie_domain="single_host_origin"
            />
            <Grid container justify= "flex-end">
                <Grid item>
                    <Button onClick={switchMode}>
                        {isSignUp? 'Already have an account' : "Don't have an account? Sign Up"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Paper>
   </Container>
  )
}

export default Auth