import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from '@material-ui/core';
import Posts from '../posts/Posts';
import Form from '../form/Form';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPostBySearch } from '../../actions/Posts';
import useStyle from './styles';
import Paginate from '../Pagination/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyle();
  const [updateId, setUpdateId] = useState(null);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  // const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (deleteTag) =>
    setTags(tags.filter((tag) => tag !== deleteTag));
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostBySearch({ search, tags: tags.join(',') }));
      navigate(
        `/memories/search?searchQuery=${search || null}&tags=${tags.join(',')}`
      );
    } else {
      navigate('/');
    }
  };
  /* const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  }; */
  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setUpdateId={setUpdateId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <TextField
                name='search'
                variant='outlined'
                label='Search Memories'
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <ChipInput
                value={tags}
                style={{ margin: '10px 0' }}
                label='Search Tags'
                variant='outlined'
                onAdd={(chip) => handleAdd(chip)}
                onDelete={(chip) => handleDelete(chip)}
                newChipKeyCodes={[15]}
              />
              <Button
                onClick={searchPost}
                className={classes?.searchButton}
                color='primary'
                variant='contained'
                type='button'
              >
                Search
              </Button>
            </AppBar>
            <Form setUpdateId={setUpdateId} updateId={updateId} />

            <Paper elevation={6}>
              <Paginate className={classes.pagination} page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
