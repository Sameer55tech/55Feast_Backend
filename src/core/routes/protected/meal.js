import express from "express";
import { mealController } from "../../controllers";
import { isAdmin } from "../../utils";

const router = express.Router();

router.post("/me", mealController.bookYourMeal);
router.post("/multiple", mealController.bookMultipleMeals);
router.delete("/me/delete", mealController.cancelMeal);
router.get("/me/counts", isAdmin(mealController.getCountsOfUser));
router.post("/date/count", isAdmin(mealController.getAllCountOfDate));
router.get("/week/count", isAdmin(mealController.getLastFiveCounts));

export default router;
