import React from 'react';

//tekisin kaikki komponentit omiin filuihin, mutta sitä tässä ei nyt haluttu.
const Header = ({ course }) => {
    return (
        <div>
            <h2>{course.name}</h2>
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
    console.log(parts);
    const totalNumberOfEx = parts.reduce(
        (total, current) => total + current.exercises,
        0
    );

    return (
        <div>
            <p style={{ fontWeight: 'bold' }}>
                Total of {totalNumberOfEx} Exercises
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

const Course = ({ courses }) => {
    console.log(courses);
    return (
        <div>
            {courses.map((course, index) => {
                return (
                    <div key={index}>
                        <Header course={course} />
                        <Content parts={course.parts} />
                        <Total parts={course.parts} />
                    </div>
                );
            })}
        </div>
    );
};

export default Course;
