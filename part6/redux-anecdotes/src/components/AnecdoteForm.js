import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = '';
        dispatch(addAnecdote(content));
        dispatch(setNotification(`created anecdote ${content}`));
        setTimeout(() => {
            dispatch(setNotification(''));
        }, 5000);
    };
    return (
        <div>
            <h2>create new Anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
