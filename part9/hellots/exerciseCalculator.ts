interface ExerciseValues {
  target: number;
  dailyHours: number[];
}

interface ExerciseCalculateObject {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const parseArgumentsForExercise = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map(hour => Number(hour));

  if (!isNaN(target) && !dailyHours.some(isNaN)) {
    return {
      target,
      dailyHours,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (daily_exercise_hours: number[], target_amount: number): ExerciseCalculateObject => {
  const periodLength = daily_exercise_hours.length;
  const trainingDays = daily_exercise_hours.filter(hour => hour > 0).length;
  const target = target_amount;
  const total = daily_exercise_hours.reduce((sum, hour) => sum + hour, 0);
  const average = total / periodLength;
  const success = average < target ? false : true;
  let rating = 0;
  let ratingDescription = '';
  if (average < target / 2) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (average < target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'good';
  }
  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

try {
  const { target, dailyHours } = parseArgumentsForExercise(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}