import { useState } from 'react';
const Blog = ({ blog, user, handleAddLike, handleRemove }) => {
    const [visible, setVisible] = useState(false);
    // const [likes, setLikes] = useState(blog.likes);
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {'by'} {blog.author}{' '}
                <button onClick={() => setVisible(!visible)}>
                    {visible ? 'hide' : 'show'}
                </button>
            </div>
            {visible && (
                <div>
                    {blog.url}
                    <br />
                    {`likes ${blog.likes}`}{' '}
                    <button onClick={handleAddLike}>Like</button>
                    <br />
                    {blog.author}
                    <br />
                    {/* (typeof user.username !== 'undefined') && (typeof blog.username !== 'undefined') && */}
                    {user.username === blog.username && (
                        <button onClick={handleRemove}>Remove</button>
                    )}
                </div>
            )}
        </div>
    );
};
export default Blog;
