import { useState } from 'react';

export const CreateBlog = (props) => {
    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={props.handleBlogCreate}>
                title:{' '}
                <input
                    type="text"
                    value={props.title}
                    onChange={({ target }) => props.setTitle(target.value)}
                />
                <br />
                author:{' '}
                <input
                    type="text"
                    value={props.author}
                    onChange={({ target }) => props.setAuthor(target.value)}
                />
                <br />
                url:{' '}
                <input
                    type="text"
                    value={props.url}
                    onChange={({ target }) => props.setUrl(target.value)}
                />
                <br />
                <button type="submit">create</button>
            </form>
        </div>
    );
};
