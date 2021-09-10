import { useState } from 'react';
import { Box, Button, Typography, TextField } from '@material-ui/core';
const CreateBlog = (props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = (e) => {
        e.preventDefault();
        props.handleBlogCreate({
            title: title,
            author: author,
            url: url,
            likes: 0,
            user: props.user.userID,
            username: props.user.username,
            nameOfUser: props.user.name,
        });
        setTitle('');
        setAuthor('');
        setUrl('');
    };
    return (
        <div>
            <Box>
                <Typography size="h4" color="textPrimary">
                    Create new blog
                </Typography>
                <form onSubmit={addBlog}>
                    <TextField
                        style={{ marginBottom: 5 }}
                        variant="outlined"
                        color="secondary"
                        label="Title"
                        id="title"
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                    <br />
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 5 }}
                        color="secondary"
                        label="author"
                        id="author"
                        type="text"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                    <br />
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 5 }}
                        color="secondary"
                        label="url"
                        id="url"
                        type="text"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                    <br />
                    <Button
                        variant="contained"
                        id="create-blog-button"
                        type="submit"
                        color="primary"
                    >
                        create
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default CreateBlog;
