import React, { useEffect } from 'react';
import {Pagination, PaginationItem} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts';

import useStyles from './Styles';

const Paginate = ({page}) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    useEffect(()=>{
        if(page){
            dispatch(getPosts(page));
        }
    },[page])

    return(
        <Pagination
            classes = {{ul:classes.ui}}
            count = {5}
            page ={1}
            variant= 'outlined'
            color='primary'
            renderItem={(item) =>(
                <PaginationItem {...item} element = {<Link/>} to ={`/posts?page=${1}`} />
            )}
        />
    )
}

export default Paginate