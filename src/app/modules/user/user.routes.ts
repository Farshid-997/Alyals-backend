import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUser);
router.get("/profile", userController.getProfile);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteFromDB);
router.patch("/:id", userController.updateIntoDB);
router.patch("/admin/:id", userController.updateRoleToAdmin);

export const userRoutes = router;
