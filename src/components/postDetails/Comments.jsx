import React, { useState, useRef } from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyle from './styles';
import { postComment } from '../../actions/Posts';

const Comments = ({ post }) => {
  const classes = useStyle();
  const [comments, setComments] = useState(post?.comments);
  const [commentText, setCommentText] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const commentRef = useRef(null);
  const handleClick = async () => {
    const finalComment = `${user?.result.name}: ${commentText}`;
    const newComments = await dispatch(postComment(finalComment, post._id));
    setComments(newComments);
    setCommentText('');
    commentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          {!comments.length ? (
            <Typography variant='h6'>
              No Comments yet be the first to comment
            </Typography>
          ) : (
            <>
              <Typography variant='h6'>Comments</Typography>
              {comments.map((comment, i) => {
                const name = comment.split(': ')[0];
                const message = comment.split(': ')[1];
                return (
                  <Typography variant='subtitle1' key={i}>
                    <strong>{name}:</strong> {message}
                  </Typography>
                );
              })}
              <div ref={commentRef} />
            </>
          )}
        </div>
        {user && (
          <div style={{ width: '70%' }}>
            <Typography variant='h6'>Write a Comment</Typography>
            <TextField
              variant='outlined'
              multiline
              minRows={4}
              label='Comment'
              fullWidth
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <Button
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!commentText}
              variant='contained'
              onClick={handleClick}
              color='primary'
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
