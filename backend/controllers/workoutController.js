import Workout from "../models/Workout.js";

export const addWorkout = async (req, res) => {
  try {
    const {
      exercise,
      duration,
      calories,
      date,
    } = req.body;

    const workout = await Workout.create({
      userId: req.user.id,
      exercise,
      duration,
      calories,
      date,
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({
      userId: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateWorkout = async (
  req,
  res
) => {
  try {
    const workout =
      await Workout.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.user.id,
        },
        req.body,
        {
          new: true,
        }
      );

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteWorkout = async (
  req,
  res
) => {
  try {
    const workout =
      await Workout.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.status(200).json({
      message: "Workout deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};