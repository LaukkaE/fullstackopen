import React from 'react';
import { CoursePart } from '../App';
import Part from './Part';

interface ContentProps {
    courseParts: Array<CoursePart>;
}

const Content = ({ courseParts }: ContentProps) => {
    return (
        <ul style={{ listStyle: 'none' }}>
            {courseParts.map((part, i) => {
                return (
                    <li key={i}>
                        <Part part={part} />
                    </li>
                );
            })}
        </ul>
    );
};

export default Content;
