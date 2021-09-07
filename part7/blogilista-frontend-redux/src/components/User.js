import React from 'react';
import { useParams } from 'react-router';

const User = ({ userList }) => {
    const id = useParams().id;
    const user = userList.find((user) => user.id === id);
    console.log(user, id);
    if (!user) {
        return null;
    }
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Added blogs</h3>
            <ul>
                {user.blogs.map((blog) => {
                    return <li key={blog.id}>{blog.title}</li>;
                })}
            </ul>
        </div>
    );
};

export default User;
