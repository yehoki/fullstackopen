// import { parseArgumentsExercise } from './utils/processArgs';

interface Report {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
export const calculateExercises = (trainingDays: number[], target: number): Report => {
  const trainDays = trainingDays.filter((num) => num !== 0).length;
  const totalHours = trainingDays.reduce((sum, counter) => sum + counter);
  const average = totalHours / trainingDays.length;
  const success = average > target;
  const rating = (target: number, average: number): number => {
    if (average >= target) return 3;
    else if (average < target && average + 0.5 >= target) return 2;
    else return 1;
  };
  const ratingDescription = (rating: number): string => {
    if (rating === 1)
      return 'You were a fair bit from the goal, keep getting at it!';
    else if (rating === 2)
      return 'You were really close to the goal, being consistent adds up!';
    else return 'Well done, you reached your target!';
  };
  return {
    periodLength: trainingDays.length,
    trainingDays: trainDays,
    success: success,
    rating: rating(target, average),
    ratingDescription: ratingDescription(rating(target, average)),
    target: target,
    average: average,
  };
};

// try {
//   const { value1, value2 } = parseArgumentsExercise(process.argv);
//   console.log(calculateExercises(value2, value1));
// } catch (error: unknown) {
//   let errorMessage = 'Something went wrong...';
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }
