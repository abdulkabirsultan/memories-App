import { Button, Container, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <main style={{ display: 'grid', placeContent: 'center' }}>
      <Container maxWidth='sm' style={{ textAlign: 'center' }}>
        <Typography variant='h1' style={{ letterSpacing: '.5rem' }}>
          404
        </Typography>
        <Paper
          variant='outlined'
          style={{ padding: '2rem', backgroundColor: '#eeeeee' }}
        >
          <Typography variant='h5'>Ooops!!</Typography>
          <Typography variant='body1'>SORRY WE CAN'T FIND THAT PAGE</Typography>

          <Typography variant='body2'>
            Either something went wrong, or the page doesn't exists again.
          </Typography>
          <Button
            variant='contained'
            color='primary'
            style={{ display: 'block', margin: 'auto', marginTop: '1.5rem' }}
          >
            <Link
              to='/memories'
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              Go Back to Home
            </Link>
          </Button>
        </Paper>
      </Container>
    </main>
  );
};

export default Error;
