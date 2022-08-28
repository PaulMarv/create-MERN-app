import React from 'react';
import {Pagination, PaginationItem} from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './Styles';

const Paginate = () => {
    const classes = useStyles();

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