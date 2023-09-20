import mongoose from "mongoose";

const missedCountSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    users: [
      {
        email: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const missedCount = new mongoose.model("MissedCount", missedCountSchema);

export default missedCount;
