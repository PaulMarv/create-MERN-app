import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost, likePost } from '../../../actions/posts';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import useStyles from './style';


const Post = ({post, setCurrentId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post?.likes)
    
    const userId = user?.result.googleId || user?.result?._id
    const hasLikedPost =likes.find((like) => like === (userId))
    
    const handleLike = async () => {
       dispatch(likePost(post._id))

       if(hasLikedPost){
          setLikes(post.likes.filter((id) => id !== userId))
       }else {
          setLikes([...post.likes, userId])
       }
    }

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === (userId))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
      const openPost = () => {
        navigate(`/posts/${post._id}`)
      }
    
    return (
      <Card className={classes.card} raised elevation={6}>
        <ButtonBase className={classes.cardAction} onClick={openPost}>
          <CardMedia
            className={classes.media}
            image={post.selectedFiles}
            title={post.title}
          />
          <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <div className={classes.overlay2}>
              <Button
                style={{ color: "white" }}
                size="small"
                onClick={() => setCurrentId(post._id)}
              >
                <MoreHorizIcon fontSize="default" />
              </Button>
            </div>
          )}
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.message}
            </Typography>
          </CardContent>
        </ButtonBase>
        <CardActions>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={handleLike}
          >
            <Likes />
          </Button>
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    );
}

export default Post