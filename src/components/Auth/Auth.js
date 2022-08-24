import React, { useState } from 'react';
import {
  Avatar,
  Typography,
  Container,
  Grid,
  Button,
  Paper,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useGoogleLogin /* GoogleLogin */ } from '@react-oauth/google';
import Input from './Input';
import useStyle from './style';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classes = useStyle();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const initialUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [user, setUser] = useState(initialUser);
  const handleChange = (e) => {
    const name = e.target.name;
    setUser({ ...user, [name]: e.target.value });
  };
  const handleShowPassword = () => setShowPassword(!showPassword);
  // const state = null;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      if (isSignup) {
        dispatch(signup(user, navigate));
      } else {
        dispatch(signin(user, navigate));
      }
      setUser(initialUser);
    }
  };
  const onSuccess = async (response) => {
    const token = response?.access_token;
    try {
      const { data } = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch({
        type: AUTH,
        data: { result: data, token },
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const onError = () => {
    console.log('Login Failed');
  };
  const login = useGoogleLogin({
    onSuccess,
    onError,
  });
  return (
    <Container component={'main'} maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  half
                  autoFocus
                ></Input>
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                ></Input>
              </>
            )}
            <Input
              name={'email'}
              label='Email Address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name={'password'}
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />

            {isSignup && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                handleChange={handleChange}
              />
            )}
          </Grid>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          {
            <Button
              className={classes.googleButton}
              fullWidth
              variant='contained'
              color='primary'
              onClick={login}
              startIcon={<Icon />}
            >
              Google sign in{' '}
            </Button>
          }

          {/* <GoogleLogin
              onSuccess={onSuccess}
              onError={onError}
              auto_select
              useOneTap
              width='400'
              size='large'
              shape='rectangular'
              theme='filled_blue'
              logo_alignment='left'
            /> */}

          <Grid container justifyContent='center'>
            <Grid item>
              <Button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setUser(initialUser);
                }}
              >
                {isSignup
                  ? 'Already have an account? Sign in'
                  : 'Dont have an account? Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
// client id:   935621686965-dquni885cbdqohkskc3s06egkhg67m9u.apps.googleusercontent.com
// client secret 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
export default Auth;

/* aud: '935621686965-dquni885cbdqohkskc3s06egkhg67m9u.apps.googleusercontent.com';
azp: '935621686965-dquni885cbdqohkskc3s06egkhg67m9u.apps.googleusercontent.com';
email: 'abdulkabirsultan@gmail.com';
email_verified: true;
exp: 1660645477;
family_name: 'Sultan';
given_name: 'Abdulkabir';
iat: 1660641877;
iss: 'https://accounts.google.com';
jti: 'c6b6f068186acd060cead865a2c7374ae7fd1d9f';
name: 'Abdulkabir Sultan';
nbf: 1660641577;
picture: 'https://lh3.googleusercontent.com/a/AItbvmmdxC97vtCFvDqB7o0fs2FEkPSa-lF6VBc826nL=s96-c';
sub: '118075691184063234015'; */
