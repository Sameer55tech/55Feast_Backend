import mongoose from "mongoose";
import config from "../../../config/config.js";

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to DB", error);
  });

export default mongoose;
