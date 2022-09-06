import React, { useEffect } from 'react';
import {Pagination, PaginationItem} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts';

import useStyles from './Styles';

const Paginate = ({page}) => {
    const {numberOfPages} = useSelector((state)=> state.posts)
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
            count = {numberOfPages}
            page ={Number(page) || 1}
            variant= 'outlined'
            color='primary'
            renderItem={(item) =>(
                <Link to ={`/posts?page=${item.page}`} style={{textDecoration:'none'}}>
                    <PaginationItem {...item} />
                </Link>
            )}
        />
    )
}

export default Paginate