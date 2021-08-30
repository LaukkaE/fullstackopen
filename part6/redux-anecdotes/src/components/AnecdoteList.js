import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
    const handleClick = (anecdote) => {
        // dispatch(voteAnecdote(anecdote));
        // dispatch(setNotification(`you voted "${anecdote.content}"`, 10));
        props.voteAnecdote(anecdote);
        props.setNotification(`you voted "${anecdote.content}"`, 10);
    };
    return (
        <div>
            <h2>Saved Anecdotes</h2>
            {props.anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => handleClick(anecdote)}>
                                vote
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};
const mapDispatchToProps = {
    voteAnecdote,
    setNotification,
};
const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes.filter((anecdote) =>
            anecdote.content.includes(state.filter)
        ),
    };
};

const connectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList);
export default connectedAnecdoteList;
