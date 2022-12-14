import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import {Container, Grow, Grid, Paper, AppBar, TextField, InputAdornment, Button} from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Chip from '@mui/material/Chip';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from "../Pagination/Pagination";
import useStyles from './styles';


function useQuery () {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState('')
    const dispatch = useDispatch()
    const classes = useStyles();
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get ('page') || 1;
    const searchQuery = query.get('searchQuery');


    
    const searchPost = () =>{
      if (search.trim() || tagsArray){
    
        dispatch(getPostsBySearch({search, tags: tagsArray.join(',')}))
        
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tagsArray.join(',')}`);
      } else{
        navigate('/')
      }
    }
    const handleKeyPress = (e) =>{
      if (e.keyCode === 13){
        searchPost();
      }
    }
    const [tagsArray, setTagsArray] = useState([]);

    const handleAdd = (e) => {
      if (e.key === 'Enter'){
        setTagsArray([...tagsArray, tags]);
        setTags('');
      }
    }
    const handleDelete = (index) => {
      // setTagsArray(tagsArray.filter((tag) => tag !== index))
    }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <TextField
                label="Search Tags"
                style={{ margin: "10px 0" }}
                variant="outlined"
                fullWidth
                onKeyPress={handleAdd}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {tagsArray?.map((tag, index) => (
                        <Chip
                          key={tagsArray.length + 1}
                          label={tag}
                          onDelete={(index)=>handleDelete(index)}
                        />
                      ))}
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className = {classes.pagination}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home