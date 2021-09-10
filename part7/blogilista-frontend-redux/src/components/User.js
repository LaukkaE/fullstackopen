import React from 'react';
import { useParams } from 'react-router';
import { Typography } from '@material-ui/core';

const User = ({ userList }) => {
    const id = useParams().id;
    const user = userList.find((user) => user.id === id);
    console.log(user, id);
    if (!user) {
        return null;
    }
    return (
        <div>
            <Typography
                style={{ marginTop: '5px' }}
                variant="h5"
                color="textPrimary"
            >
                {user.name}
            </Typography>
            <Typography variant="h6" color="textPrimary">
                Added Blogs
            </Typography>
            <ul>
                <Typography color="textPrimary">
                    {user.blogs.map((blog) => {
                        return <li key={blog.id}>{blog.title}</li>;
                    })}
                </Typography>
            </ul>
        </div>
    );
};

export default User;
