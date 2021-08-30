import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = '';
        // dispatch(addAnecdote(content));
        // dispatch(setNotification(`created anecdote ${content}`, 10));
        props.addAnecdote(content);
        props.setNotification(`created anecdote ${content}`, 10);
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

const mapDispatchToProps = {
    addAnecdote,
    setNotification,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
