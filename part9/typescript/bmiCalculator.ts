export const calculateBmi = (height: number, mass: number) => {
    const squareOfHeight = Math.pow(0.01 * height, 2);
    const bmi = mass / squareOfHeight;
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi <= 22.9) return 'Normal (healthy weight)';
    if (bmi >= 23 && bmi <= 27.4) return 'Overweight';
    if (bmi >= 27.5) return 'Obese';
    throw new Error('Provided values were not numbers!');
};

// const height: number = Number(process.argv[2]);
// const mass: number = Number(process.argv[3]);

// try {
//     console.log(calculateBmi(height, mass));
// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.';
//     if (error instanceof Error) {
//         errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
// }
