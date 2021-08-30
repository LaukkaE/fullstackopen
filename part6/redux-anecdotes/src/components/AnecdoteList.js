import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const [sortedAnecdotes, setSortedAnecdotes] = useState([]);
    const dispatch = useDispatch();
    const anecdotes = useSelector((state) => state.anecdotes);
    const filter = useSelector((state) => state.filter);

    //redux storen sorttaamiseen varmaan parempikin tapa kun tehdä se komponentin sisällä uuteen muuttujaan, mutta en nyt pikaisella googlauksella löytänyt hyvää tapaa.
    useEffect(() => {
        setSortedAnecdotes(anecdotes.sort((a, b) => b.votes - a.votes));
    }, [anecdotes]);
    const handleClick = (anecdote) => {
        dispatch(voteAnecdote(anecdote));
        dispatch(setNotification(`you voted "${anecdote.content}"`, 10));
    };
    return (
        <div>
            <h2>Saved Anecdotes</h2>
            {sortedAnecdotes
                .filter((anecdote) => anecdote.content.includes(filter))
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
export default AnecdoteList;
