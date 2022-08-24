import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const SharedLayout = () => {
  return (
    <Container maxWidth='xl'>
      <Navbar />
      <Outlet />
      <footer style={{ margin: '2rem 0 .5rem' }}>
        <Typography variant='subtitle1' align='center'>
          Made with
          <span style={{ color: 'red', fontSize: '1.3rem' }}>
            {' '}
            &hearts;
          </span>{' '}
          by&nbsp;
          <Link to='' style={{ textDecoration: 'none' }}>
            <strong>Abdulkabir Sultan</strong>
          </Link>
        </Typography>
      </footer>
    </Container>
  );
};

export default SharedLayout;
