import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Typography,
  Paper,
  CircularProgress,
  Divider,
  Button,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import useStyles from './styles';
import { getPost, getPosts } from '../../actions/Posts';
import Comments from './Comments';

const PostDetails = () => {
  const classes = useStyles();
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const openPost = (id) => navigate(`/memories/${id}`);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);
  useEffect(() => {
    if (post) {
      dispatch(getPosts(1));
    }
  }, [post]);

  if (!post) return null;
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size={'7em'} />
      </Paper>
    );
  }
  const recomendedPost = posts.filter(({ _id }) => _id !== id);
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant='h3' component='h2'>
            {post.title}
          </Typography>
          <Typography variant='h6' color='textSecondary' component='h2'>
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography variant='body1' component='p'>
            {post.message}
          </Typography>
          <Typography variant='h6'>
            Created by:{' '}
            <strong style={{ textTransform: 'capitalize' }}>
              {post.creator}
            </strong>
          </Typography>
          <Typography variant='body1'>
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant='body1'>
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Comments post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </div>
      </div>
      {recomendedPost.length > 0 && (
        <section className={classes.section2}>
          <div className={classes.section}>
            <Typography variant='h5'>You might also Like:</Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {recomendedPost.map(
                ({ _id, title, message, likeCount, creator, selectedFile }) => {
                  return (
                    <div
                      style={{ margin: '20px', cursor: 'pointer' }}
                      onClick={() => openPost(_id)}
                      key={_id}
                    >
                      <Typography gutterButtom variant='h6'>
                        {title}
                      </Typography>
                      <Typography gutterButtom variant='subtitle2'>
                        {creator}
                      </Typography>
                      <Typography gutterButtom variant='subtitle2'>
                        {message.substring(0, 80)}
                        {message.length >= 80 && (
                          <>
                            ...<span style={{ color: 'blue' }}> Read more</span>
                          </>
                        )}
                      </Typography>
                      <Typography gutterButtom variant='subtitle1'>
                        Likes: {likeCount.length}
                      </Typography>
                      <img src={selectedFile} alt={title} width='200px' />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>
      )}
      <Link to='/'>
        <Button variant='contained' color='primary'>
          Back to Home
        </Button>
      </Link>
    </Paper>
  );
};

export default PostDetails;
