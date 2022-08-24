import React from 'react';
import Post from './post/post';
import useStyle from './styles';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Posts = ({ setUpdateId }) => {
  const classes = useStyle();
  const { posts, isLoading } = useSelector((state) => state.posts);
  if (!posts?.length && !isLoading)
    return (
      <div>
        <h1>No Memories found</h1>
        <Link to={'/'} style={{ color: '#fff' }}>
          <Button color='primary' variant='contained'>
            Return Home
          </Button>
        </Link>
      </div>
    );
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems='stretch'
      spacing={3}
    >
      {posts.map((post) => {
        return (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
            <Post post={post} setUpdateId={setUpdateId} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Posts;
