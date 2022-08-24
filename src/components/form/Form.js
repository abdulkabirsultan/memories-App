import React, { useState, useEffect } from 'react';
import { Typography, Paper, Button, TextField } from '@material-ui/core';
import useStyle from './styles';
import Filebase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPosts, updatePost } from '../../actions/Posts';

const Form = ({ updateId, setUpdateId }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    updateId ? state.posts.posts.find((p) => p._id === updateId) : null
  );

  const [postData, setPostData] = useState({
    title: '',
    tags: '',
    message: '',
    selectedFile: null,
  });

  const classes = useStyle();
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (postData.title) {
      if (updateId) {
        dispatch(updatePost(updateId, postData));
        dispatch(getPosts());
      } else {
        dispatch(createPost(postData));
      }
      clear();
    }
  };
  const clear = () => {
    setUpdateId(null);
    setPostData({
      title: '',
      tags: '',
      message: '',
      selectedFile: null,
    });
  };

  if (!localStorage.getItem('profile')) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please sign in to create your own Memories and also like other's
          memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        {' '}
        <Typography variant='h6'>
          {`${updateId ? 'Editing' : 'Creating'} a memory`}
        </Typography>
        {/*  <TextField
          name='creator'
          variant='outlined'
          label='Creator'
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        /> */}
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='message'
          variant='outlined'
          multiline
          minRows={3}
          label='Message'
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags (comma seperated)'
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />
        <div className={classes.fileInput}>
          <Filebase
            multiple={false}
            type='file'
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
