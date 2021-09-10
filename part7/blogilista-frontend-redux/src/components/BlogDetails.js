import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { addComment, voteBlog } from '../reducers/blogReducer';
import { Button, Typography, Link, TextField, Box } from '@material-ui/core';
// import { Link as BrowserLink } from 'react-router-dom';

const BlogDetails = ({ handleBlogRemove }) => {
    const [comment, setComment] = useState('');
    const id = useParams().id;
    const dispatch = useDispatch();
    const store = useSelector((state) => state.blogs);
    const user = store.find((store) => store.user);

    const blog = store.find((blog) => blog.id === id);

    const handleClick = () => {
        dispatch(addComment(blog, comment));
        setComment('');
    };

    if (!user || !blog) {
        return null;
    }

    return (
        <div>
            <Typography
                style={{ marginTop: '10px' }}
                color="textPrimary"
                variant="h6"
            >{`${blog.title} by ${blog.author}`}</Typography>

            <Typography color="textPrimary" style={{ marginTop: '10px' }}>
                <Link
                    color="secondary"
                    style={{ textDecoration: 'none' }}
                    target="_blank"
                    rel="noreferrer"
                    href={`http://${blog.url}`}
                >
                    {blog.url}
                </Link>
            </Typography>

            <br />
            {/* {`likes: ${blog.likes}`}{' '} */}
            {/* Workaround että saadaan variable helposti testatessa */}
            <div style={{ display: 'flex' }}>
                <Typography color="textPrimary">{'likes :'} </Typography>
                <Typography color="textPrimary" className="likes">
                    {blog.likes}
                </Typography>{' '}
                <Button
                    style={{ marginLeft: '5px' }}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => dispatch(voteBlog(blog))}
                >
                    Like
                </Button>
            </div>
            <Typography color="textPrimary">
                {blog.author}
                <br />
                {`Added by ${blog.nameOfUser}`}
                <br />
            </Typography>
            {user.username === blog.username && (
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleBlogRemove(blog)}
                >
                    Remove blog
                </Button>
            )}
            <br />
            <Typography
                variant="h4"
                color="textPrimary"
                style={{ marginTop: '10px', marginBottom: '10px' }}
            >
                Comments
            </Typography>
            <Typography color="textPrimary">write new comment</Typography>
            <Box style={{ display: 'inline' }}>
                <TextField
                    value={comment}
                    variant="standard"
                    onChange={({ target }) => setComment(target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClick()}
                >
                    add comment
                </Button>
            </Box>
            <ul>
                <Typography color="textPrimary">
                    {blog.comments.map((comment, index) => {
                        return <li key={index}>{comment}</li>;
                    })}
                </Typography>
            </ul>
        </div>
    );
};

export default BlogDetails;
