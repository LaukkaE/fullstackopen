import { useState } from 'react';
import blogsRouter from '../services/blogs';
const Blog = ({ blog, user, getData }) => {
    const [visible, setVisible] = useState(false);
    const [likes, setLikes] = useState(blog.likes);
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    const handleAddLike = async () => {
        const blogObject = {
            likes: likes + 1,
        };
        await blogsRouter.updateBlog(blog.id, blogObject);
        setLikes(likes + 1);
    };
    const handleRemove = async () => {
        if (
            window.confirm(
                `Are you sure you want to remove blog ${blog.title} by ${blog.author}`
            )
        ) {
            await blogsRouter.deleteBlog(blog.id);
            getData();
        }
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
                    {`likes ${likes}`}{' '}
                    <button onClick={handleAddLike}>Like</button>
                    <br />
                    {blog.author}
                    <br />
                    {user.username === blog.username && (
                        <button onClick={handleRemove}>Remove</button>
                    )}
                </div>
            )}
        </div>
    );
};
export default Blog;
