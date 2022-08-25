import React from 'react';
import {
  Card,
  CardActions,
  CardMedia,
  Typography,
  Button,
  CardContent,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import moment from 'moment';
import useStyle from './styles';
import Posts from '../Posts';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/Posts';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, setUpdateId }) => {
  const dispatch = useDispatch();
  const deleteItem = (id) => dispatch(deletePost(id));
  const user = JSON.parse(localStorage.getItem('profile'));
  const verifyUser = user?.result?.sub || user?.result?._id;
  const hasLikedPost = post.likeCount.find((like) => like === verifyUser);

  const likeCount = post.likeCount.length;
  const handleLike = () => {
    dispatch(likePost(post._id));
  };
  const Like = () => {
    if (likeCount > 0) {
      return hasLikedPost ? (
        <>
          <ThumbUpAltIcon fontSize='small' /> &nbsp;
          {likeCount === 1
            ? 'You'
            : `You and ${likeCount - 1} ${
                likeCount === 2 ? 'other' : 'others'
              }`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' /> &nbsp; {likeCount}
          {likeCount === 1 ? ' Like' : ' Likes'}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize='small' /> &nbsp; Like
      </>
    );
  };
  const classes = useStyle();
  const navigate = useNavigate();
  const openPost = () => {
    navigate(`/memories/${post._id}`);
  };
  return (
    <Card className={classes.card} raised elevation={6}>
      <div onClick={openPost} style={{ cursor: 'pointer' }}>
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          title={Posts.title}
        />
        <div className={classes.overlay}>
          <Typography variant='h6' className={classes.creator}>
            {post.creator}
          </Typography>
          <Typography variant='body2'>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {verifyUser === post.createdBy && (
            <Button
              style={{
                color: 'white',
              }}
              size='small'
              onClick={(e) => {
                e.stopPropagation();
                setUpdateId(post._id);
              }}
            >
              <Edit fontSize='medium' />
            </Button>
          )}
        </div>
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>
            {post.tags.map((tag) => `${tag && '#'}${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant='h5'>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component={'p'}>
            {post.message.substring(0, 80)}
            {post.message.length >= 80 && (
              <>
                ...<span style={{ color: 'blue' }}> Read more</span>
              </>
            )}
          </Typography>
        </CardContent>
      </div>

      <CardActions className={classes.cardActions}>
        <Button
          style={{ textTransform: 'none' }}
          size='small'
          color='primary'
          onClick={handleLike}
          disabled={!user?.result}
        >
          <Like />
        </Button>

        {verifyUser === post.createdBy && (
          <Button
            size='small'
            color='secondary'
            onClick={() => {
              deleteItem(post._id);
            }}
          >
            <DeleteIcon fontSize='small' /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
