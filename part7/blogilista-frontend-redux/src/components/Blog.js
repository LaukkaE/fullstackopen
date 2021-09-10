// import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Typography } from '@material-ui/core';
const Blog = ({ blog }) => {
    // const [visible, setVisible] = useState(false);
    // const [likes, setLikes] = useState(blog.likes);
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        color: '#d04',
    };

    return (
        <div>
            <Box style={blogStyle}>
                <Link
                    style={{ textDecoration: 'none' }}
                    component={RouterLink}
                    to={`/blogs/${blog.id}`}
                >
                    <Typography color="textPrimary">
                        {`${blog.title} by ${blog.author}`}
                    </Typography>
                </Link>
            </Box>
        </div>
    );
};
export default Blog;
