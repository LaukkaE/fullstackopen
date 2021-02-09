import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [mostVoted, setMostVoted] = useState(0);
    const [votes, setVotes] = useState(
        new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)
    );

    const setRandomAnecdote = () => {
        const getRandomInt = (max) => {
            return Math.floor(Math.random() * max);
        };
        setSelected(getRandomInt(anecdotes.length));
        console.log(votes);
    };
    const voteAnecdote = () => {
        const tempArr = [...votes];
        tempArr[selected] += 1;
        setVotes(tempArr);
        if (tempArr[selected] > Math.max(...votes)) {
            setMostVoted(selected);
        }
    };

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <p>has {votes[selected]} votes</p>
            <div>
                <button onClick={() => voteAnecdote()}>vote</button>
                <button onClick={() => setRandomAnecdote()}>
                    Next anecdote
                </button>
            </div>
            <h1>Anecdote with most votes</h1>
            {/* Näyttää ensimmäisen anecdootin jos millään ei ääniä, mutta tehtävänannossa ei sanottu, että pitääkö näyttää silti, vai piilottaa. */}
            {props.anecdotes[mostVoted]}
            <p>has {votes[mostVoted]} votes</p>
        </div>
    );
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
