import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
    if (props.good + props.neutral + props.bad === 0)
        return <p>No feedback given</p>;

    return (
        <table>
            <tbody>
                <tr>
                    <StatisticsLine type="good" value={props.good} />
                </tr>
                <tr>
                    <StatisticsLine type="neutral" value={props.neutral} />
                </tr>
                <tr>
                    <StatisticsLine type="bad" value={props.bad} />
                </tr>
                <tr>
                    <StatisticsLine
                        type="all"
                        value={props.good + props.neutral + props.bad}
                    />
                </tr>
                <tr>
                    <StatisticsLine
                        type="average"
                        value={
                            (props.good - props.bad) /
                            (props.good + props.neutral + props.bad)
                        }
                    />
                </tr>
                <tr>
                    <StatisticsLine
                        type="positive"
                        value={
                            (props.good /
                                (props.good + props.neutral + props.bad)) *
                            100
                        }
                        postfix="%"
                    />
                </tr>
            </tbody>
        </table>
    );
};
const StatisticsLine = ({ type, value, postfix }) => {
    return (
        <td>
            {type} {value} {postfix}
        </td>
    );
};

const Button = (props) => {
    return (
        <div>
            <button onClick={props.handleClick}>{props.name}</button>
        </div>
    );
};
const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>
            <div style={{ display: 'flex' }}>
                <Button handleClick={() => setGood(good + 1)} name="good" />
                <Button
                    handleClick={() => setNeutral(neutral + 1)}
                    name="neutral"
                />
                <Button handleClick={() => setBad(bad + 1)} name="bad" />
            </div>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
