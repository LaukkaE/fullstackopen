import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
    return (
        <div>
            <h1>{course}</h1>
        </div>
    );
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((obj, index) => {
                return (
                    <Part key={index} part={obj.name} numOfEx={obj.exercises} />
                );
            })}
        </div>
    );
};
const Total = ({ parts }) => {
    return (
        <div>
            <p>
                Number of exercises{' '}
                {parts[0].exercises + parts[1].exercises + parts[2].exercises}
            </p>
        </div>
    );
};
const Part = ({ part, numOfEx }) => {
    return (
        <div>
            <p>
                {part} {numOfEx}
            </p>
        </div>
    );
};

const App = () => {
    const course = 'Half Stack application development';
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10,
        },
        {
            name: 'Using props to pass data',
            exercises: 7,
        },
        {
            name: 'State of a component',
            exercises: 14,
        },
    ];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
