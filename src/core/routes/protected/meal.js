import express from "express";
import mealController from "../../controllers/meal";

const router = express.Router();

router.post("/me", mealController.bookYourMeal);
router.post("/multiple", mealController.bookMultipleMeals);
router.delete("/me/delete", mealController.cancelMeal);
router.get("/me/counts", mealController.getCountsOfUser);
router.post("/date/count", mealController.getAllCountOfDate);
router.get("/week/count", mealController.getLastFiveCounts);

export default router;
