import express from "express";
import bookYourMeal from "../../controllers/meal";

const router = express.Router();

router.post("/me", bookYourMeal);

export default router;
