import React from 'react';

interface TotalExercisesProps {
    courseParts: Array<CourseObject>;
}
interface CourseObject {
    name: string;
    exerciseCount: number;
}

const TotalExercises = (props: TotalExercisesProps) => {
    return (
        <div>
            <p>
                Number of exercises{' '}
                {props.courseParts.reduce(
                    (carry, part) => carry + part.exerciseCount,
                    0
                )}
            </p>
        </div>
    );
};

export default TotalExercises;
