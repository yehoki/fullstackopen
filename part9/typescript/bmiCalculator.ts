// import { parseArgumentsBmi } from './utils/processArgs';

export const calculateBMI = (height: number, weight: number): string => {
  if (height <= 0) throw new Error('Height must be greater than 0.');
  if (weight <= 0) throw new Error('Weight must be greater than 0.');
  const BMI = weight / (height / 100) ** 2;
  if (BMI < 18.5) {
    return 'Underweight';
  } else if (BMI >= 18.5 && BMI < 25) {
    return 'Normal (healthy weight)';
  } else if (BMI >= 25 && BMI < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

// try {
//   const { value1, value2 } = parseArgumentsBmi(process.argv);
//   console.log(calculateBMI(value1, value2));
// } catch (error: unknown) {
//   let errorMessage = 'Something went wrong:';
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }
