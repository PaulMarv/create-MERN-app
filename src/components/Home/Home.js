import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { getPosts } from "../../actions/posts";
import Chip from "@mui/material/Chip"
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from "../Pagination/Pagination";
import useStyles from './styles';


function useQuery () {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch()
    const classes = useStyles();
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get ('page') || 1;
    const searchQuery = query.get('searchQuery');

    useEffect(()=>{
        dispatch(getPosts());
    }, [currentId, dispatch])
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value = "TEST"
                onChange={() => {}}
              />
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Paginate/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home