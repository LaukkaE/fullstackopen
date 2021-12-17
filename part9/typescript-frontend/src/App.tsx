import React from 'react';
import Content from './components/Content';
import Header from './components/Header';
import TotalExercises from './components/TotalExercises';

const courseName = 'Half Stack application development';
// new types
interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}
interface CourseDescription {
    description: string;
}

interface CourseNormalPart extends CoursePartBase, CourseDescription {
    type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
    type: 'groupProject';
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase, CourseDescription {
    type: 'submission';
    exerciseSubmissionLink: string;
}
interface CourseSpecialPart extends CoursePartBase, CourseDescription {
    type: 'special';
    requirements: Array<string>;
}

export type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseSpecialPart;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
    {
        name: 'Fundamentals',
        exerciseCount: 10,
        description: 'This is the leisured course part',
        type: 'normal',
    },
    {
        name: 'Advanced',
        exerciseCount: 7,
        description: 'This is the harded course part',
        type: 'normal',
    },
    {
        name: 'Using props to pass data',
        exerciseCount: 7,
        groupProjectCount: 3,
        type: 'groupProject',
    },
    {
        name: 'Deeper type usage',
        exerciseCount: 14,
        description: 'Confusing description',
        exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
        type: 'submission',
    },
    {
        name: 'Backend development',
        exerciseCount: 21,
        description: 'Typing the backend',
        requirements: ['nodejs', 'jest'],
        type: 'special',
    },
];
const App = () => {
    return (
        <div>
            <Header courseName={courseName} />
            <Content courseParts={courseParts} />
            <TotalExercises courseParts={courseParts} />
        </div>
    );
};

export default App;
