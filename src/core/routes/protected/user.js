import express from "express";
import userController from "../../controllers/user";

const router = express.Router();

router.get("/all", userController.getAllUsers);
router.get("/location/all", userController.getUserByLocation);
router.get("/", userController.getUser);
router.get("/joined", userController.getJoinedUsers);
router.post("/insert", userController.insertUser);
router.patch("/update", userController.updateUserPool);
router.delete("/delete", userController.deleteUser);

export default router;
