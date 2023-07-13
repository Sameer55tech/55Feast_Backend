import cron from "node-cron";
import mealController from "../controllers/meal";
import moment from "moment-timezone";

const startCronJob = () => {
  const istTimeZone = "Asia/Kolkata";
  const scheduledTime = moment
    .tz("19:00", "HH:mm", istTimeZone)
    .format("m H * * *");

  cron.schedule(scheduledTime, async () => {
    console.log("executing cron job");
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    await mealController.cancelAllMealsOfDate(formattedDate);
    console.log("executed successfully");
  });
};

export default startCronJob;
