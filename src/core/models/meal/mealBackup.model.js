import mongoose from "mongoose";

const mealBackupSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    bookedDates: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const mealBackupModel = new mongoose.model("MealBackup", mealBackupSchema);

export default mealBackupModel;
