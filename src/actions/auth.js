import { AUTH } from '../constants/actionTypes';
import axios from 'axios';
export const signin = (user, navigate) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/user/signin`,
      user
    );
    // const { data } = await api.siginin(user);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};
export const signup = (user, navigate) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/user/signup`,
      user
    );

    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};
