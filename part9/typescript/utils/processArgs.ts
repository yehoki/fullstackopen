interface BMIValues {
  value1: number;
  value2: number;
}

interface ExerciseValues {
  value1: number;
  value2: number[];
}

export const isNotNumber = (argument: string): boolean => isNaN(Number(argument));

export const parseArgumentsBmi = (args: string[]): BMIValues => {
  // BMI mode
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Can only accept numbers for height and weight!');
  }
};

export const parseArgumentsExercise = (args: string[]): ExerciseValues => {
  // exerciseCalculator mode
  if (args.length < 4) throw new Error('Not enough arguments');
  const exerciseArray: number[] = [];
  for (let i = 2; i < args.length; i++) {
    if (isNotNumber(args[i])) {
      throw new Error('Only accept numbers as arguments');
    }
    if (i > 2) {
      exerciseArray.push(Number(args[i]));
    }
  }
  return {
    value1: Number(args[2]),
    value2: exerciseArray,
  };
};
