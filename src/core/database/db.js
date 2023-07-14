import mongoose from "mongoose";
import config from "../../../config/config.js";
// import { startCronJob } from "../utils";

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // startCronJob();
    // console.log("cron job started");
  })
  .catch((error) => {
    console.log("Failed to connect to DB", error.message);
  });

export default mongoose;
