import React, {useEffect} from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import useStyles from './styles'

const PostDetails = () => {
    const {post, posts, isLoading} = useSelector((state)=> state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const classes = useStyles();

  return (
    <div>PostDetails</div>
  )
}

export default PostDetails