interface ResultObject {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const parseArguments = (args: Array<unknown>): Array<number> => {
    const numberArray = args
        .map((arg) => Number(arg))
        .filter((arg) => !isNaN(arg));
    if (numberArray.length == 0) {
        throw new Error('Invalid arguments');
    }

    return numberArray;
};

export const calculateExercises = (
    args: Array<number>,
    target = 2
): ResultObject => {
    const numberOfHours = args.reduce((sum, acc) => sum + acc, 0);
    const average = numberOfHours / args.length;
    let rating: number;
    let ratingDescription: string;
    if (average - target < -1) {
        rating = 1;
        ratingDescription = 'Bad result';
    } else if (average - target >= -1 && average - target < 1) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
    } else {
        rating = 3;
        ratingDescription = 'Well done';
    }

    return {
        periodLength: args.length,
        trainingDays: args.filter((n) => n > 0).length,
        success: numberOfHours / args.length >= target ? true : false,
        rating,
        ratingDescription,
        target: target,
        average: average,
    };
};

// try {
//     const numberArray = parseArguments(process.argv);
//     console.log(calculateExercises(numberArray));
// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.';
//     if (error instanceof Error) {
//         errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
// }
