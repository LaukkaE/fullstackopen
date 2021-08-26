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
                <button
                    className="showButton"
                    onClick={() => setVisible(!visible)}
                >
                    {visible ? 'hide' : 'show'}
                </button>
            </div>
            {visible && (
                <div>
                    {blog.url}
                    <br />
                    {/* {`likes: ${blog.likes}`}{' '} */}
                    {/* Workaround että saadaan variable helposti */}
                    <div style={{ display: 'flex' }}>
                        {'likes :'} <div className="likes">{blog.likes}</div>{' '}
                        <button onClick={handleAddLike}>Like</button>
                    </div>
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
