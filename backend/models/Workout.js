import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    exercise: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    calories: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;