import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useStyle from './styles';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = user?.token;
  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate('/');
    setUser(null);
    window.location.reload();
  };
  useEffect(() => {
    if (!token?.startsWith('eyJ')) {
      if (3559 > Date.now()) {
        logout();
      }
    } else {
      const expiry = decode(token)?.exp;
      if (expiry * 1000 < Date.now()) {
        logout();
      }
    }

    //jwt
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, token]);

  const classes = useStyle();
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to={'/'} className={classes.brandContainer}>
        <img src={memoriesText} alt='icon' height='45px' />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt='icon'
          height='40px'
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.picture}
            >
              {user?.result.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant='h6' className={classes.userName}>
              {user?.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
