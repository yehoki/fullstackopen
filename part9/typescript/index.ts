import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const PORT = 3002;

const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
      res.json({
        weight: Number(weight),
        height: Number(height),
        bmi: calculateBMI(Number(height), Number(weight)),
      });
    } else {
      res.status(400).json({
        error:
          'Malformatted parameters: One of weight or height is not a number',
      });
    }
  } catch (exc) {
    console.error(exc);
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  try {
    if (!daily_exercises || !target)
      res.status(400).send({ error: 'Parameters missing!' });
    if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
      res.status(400).send({
        error:
          'Malformatted parameters: target has to be a number and daily_exercises has to be an array of numbers',
      });
    }
    for (let i = 0; i < daily_exercises.length; i++) {
      if (
        isNaN(Number(daily_exercises[i])) ||
        !Number.isInteger(daily_exercises[i])
      ) {
        res.status(400).send({
          error:
            'Malformatted parameters: target has to be a number and daily_exercises has to be an array of numbers',
        });
      }
    }
    res.json(calculateExercises(daily_exercises, target));
  } catch (exc) {}
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
