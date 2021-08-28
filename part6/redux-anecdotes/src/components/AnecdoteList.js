import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
    const [sortedAnecdotes, setSortedAnecdotes] = useState([]);
    const dispatch = useDispatch();
    const anecdotes = useSelector((state) => state);

    //redux storen sorttaamiseen varmaan parempikin tapa kun tehdä se komponentin sisällä uuteen muuttujaan, mutta en nyt pikaisella googlauksella löytänyt hyvää tapaa.
    useEffect(() => {
        setSortedAnecdotes(anecdotes.sort((a, b) => b.votes - a.votes));
    }, [anecdotes]);
    return (
        <div>
            <h2>Saved Anecdotes</h2>
            {sortedAnecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button
                            onClick={() => dispatch(voteAnecdote(anecdote.id))}
                        >
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default AnecdoteList;
