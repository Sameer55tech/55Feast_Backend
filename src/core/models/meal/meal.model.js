import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    bookedDates: [
      {
        date: {
          type: String,
          required: true,
        },
        mealTaken: {
          type: Boolean,
          default: false,
        },
        bookedBy: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const mealModel = new mongoose.model("Meal", mealSchema);

export default mealModel;
