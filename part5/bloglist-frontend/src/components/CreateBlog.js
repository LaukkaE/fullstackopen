import { useState } from 'react';

export const CreateBlog = (props) => {
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
        });
        setTitle('');
        setAuthor('');
        setUrl('');
    };
    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={addBlog}>
                title:{' '}
                <input
                    type="text"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
                <br />
                author:{' '}
                <input
                    type="text"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
                <br />
                url:{' '}
                <input
                    type="text"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
                <br />
                <button type="submit">create</button>
            </form>
        </div>
    );
};
