import User from "../models/User.js";
import Workout from "../models/Workout.js";

export const getDashboard = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user.id
    );

    const workouts = await Workout.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    const workoutCount =
      workouts.length;

    const totalCalories =
      workouts.reduce(
        (sum, workout) =>
          sum + workout.calories,
        0
      );

    let bmi = 0;

    if (
      user.height &&
      user.weight
    ) {
      const heightInMeters =
        user.height / 100;

      bmi = (
        user.weight /
        (heightInMeters *
          heightInMeters)
      ).toFixed(1);
    }

    res.status(200).json({
      name: user.name,
      workouts: workoutCount,
      calories: totalCalories,
      bmi,
      water: 6,
      goalProgress: 65,
      recentWorkouts:
        workouts.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};