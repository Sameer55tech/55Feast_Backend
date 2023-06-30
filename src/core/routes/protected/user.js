import express from "express";
import userController from "../../controllers/user";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/location/all", userController.getUserByLocation);

export default router;
