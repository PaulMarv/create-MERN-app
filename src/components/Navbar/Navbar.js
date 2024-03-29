import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import {Typography,AppBar, Toolbar, Avatar, Button} from '@mui/material';
import useStyles from './styles';
import memoriesLogo from '../../images/logo.png';
import memoriesText from '../../images/memories-Text.png';

export const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
      dispatch({type:'LOGOUT'});
      navigate('/auth')
      setUser(null)
    }

    useEffect(()=>{
      const token = user?.token
      
      if(token) {
        const decodedToken = decode(token);
        
        if(decodedToken.exp * 1000 < new Date().getTime()) logout()
      }
      setUser(JSON.parse(localStorage.getItem('profile'))) 
    },[location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link className={classes.brandContainer} to="/">
          <img src={memoriesLogo} alt="icon" height="70px" />
          {/* <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" /> */}
        </Link>
      <Toolbar className={classes.toolbar}>
        {
            user?(
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                    <Button variant='contained' className={classes.logout} color="secondary" onClick = {logout}>Logout</Button>
                </div>
            ):(
                <Link className={classes.signButton} to ='/auth' style={{textDecoration:'none'}}>
                    <Button variant='contained' color='primary'>Sign In</Button>
                </Link>
            )
        }
      </Toolbar>
    </AppBar>
  );
}
