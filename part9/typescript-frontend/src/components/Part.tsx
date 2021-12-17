import React from 'react';
import { CoursePart } from '../App';

interface PartProps {
    part: CoursePart;
}
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ part }: PartProps) => {
    const renderswitch = () => {
        switch (part.type) {
            case 'normal':
                return (
                    <div>
                        <p style={{ fontWeight: 'bold' }}>
                            {part.name} {part.exerciseCount}{' '}
                        </p>
                        <p style={{ fontStyle: 'italic' }}>
                            {part.description}
                        </p>
                    </div>
                );
            case 'groupProject':
                return (
                    <div>
                        <p style={{ fontWeight: 'bold' }}>
                            {part.name} {part.exerciseCount}{' '}
                        </p>
                        <p style={{ fontStyle: 'italic' }}>
                            Project Exercises: {part.groupProjectCount}
                        </p>
                    </div>
                );
            case 'submission':
                return (
                    <div>
                        <p style={{ fontWeight: 'bold' }}>
                            {part.name} {part.exerciseCount}{' '}
                        </p>
                        <p style={{ fontStyle: 'italic' }}>
                            {part.description} <br />
                            submit to: {part.exerciseSubmissionLink}
                        </p>
                    </div>
                );
            case 'special':
                return (
                    <div>
                        <p style={{ fontWeight: 'bold' }}>
                            {part.name} {part.exerciseCount}{' '}
                        </p>
                        <p style={{ fontStyle: 'italic' }}>
                            {part.description} <br />
                            required skills: {part.requirements.join(',')}
                        </p>
                    </div>
                );
            default:
                return assertNever(part);
        }
    };

    return <div>{renderswitch()}</div>;
};

export default Part;
