import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { isNotNumber } from './utils/processArgs';
// import qs from 'qs';

const app = express();
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;
    if (!isNotNumber(height) && !isNotNumber(weight)) {
      res.json({
        weight: Number(weight),
        height: Number(height),
        bmi: calculateBMI(Number(height), Number(weight)),
      });
    } else {
        res.status(400).json({error: 'Malformatted parameters: One of weight or height is not a number'})
    }
  } catch (exc) {
    console.error(exc);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
