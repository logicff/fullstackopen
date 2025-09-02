import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const heightStr = req.query.height;
  const weightStr = req.query.weight;
  if (!heightStr || !weightStr || isNaN(Number(heightStr)) || isNaN(Number(weightStr))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const height = Number(heightStr);
  const weight = Number(weightStr);
  const bmi = calculateBmi(height, weight);
  return res.status(200).json({ height, weight, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }
  if (typeof target !== 'number' || !Array.isArray(daily_exercises) || daily_exercises.some(hour => typeof hour !== 'number')) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return res.status(200).json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});