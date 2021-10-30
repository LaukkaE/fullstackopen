import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, parseArguments } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
    res.send('pong');
});
app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if (!height || !weight) {
        res.send({ error: 'malformatted parameters' });
    } else {
        res.send({
            weight,
            height,
            bmi: calculateBmi(height, weight),
        });
    }
});
app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {
        daily_exercises,
        target,
    }: { daily_exercises: Array<number>; target: number } = req.body;
    if (!daily_exercises || !target) {
        res.status(400);
        res.send({ error: 'parameters missing' });
    } else if (
        isNaN(target) ||
        daily_exercises.filter((n) => !isNaN(n)).length === 0
    ) {
        res.status(400);
        res.send({ error: 'malformatted parameters' });
    } else {
        const result = calculateExercises(
            parseArguments(daily_exercises),
            Number(target)
        );
        res.send(result);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
