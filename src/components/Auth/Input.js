import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const Input = ({
  half,
  name,
  label,
  autoFocus,
  type,
  handleShowPassword,
  handleChange,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        autoFocus={autoFocus}
        required
        variant='outlined'
        onChange={handleChange}
        type={type}
        fullWidth
        InputProps={{
          endAdornment: name === 'password' && (
            <InputAdornment position='end'>
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default Input;
