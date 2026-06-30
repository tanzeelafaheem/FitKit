import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password"
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, age, height, weight, goal } =
      req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        age,
        height,
        weight,
        goal,
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Calculate BMI and save to user
export const calculateBMI = async (req, res) => {
  try {
    const { height, weight } = req.body;

    if (!height || !weight) {
      return res.status(400).json({
        success: false,
        message: "Height and weight are required",
      });
    }

    const bmi = Number(
      (weight / ((height / 100) ** 2)).toFixed(2)
    );

    const user = await User.findById(req.user.id);

    user.height = height;
    user.weight = weight;

    user.bmiHistory.push({
      height,
      weight,
      bmi,
    });

    await user.save();

    res.status(200).json({
      success: true,
      bmi,
      bmiHistory: user.bmiHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get BMI history
export const getBMIHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      bmiHistory: user.bmiHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};