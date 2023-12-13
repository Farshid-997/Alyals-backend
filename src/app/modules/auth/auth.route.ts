import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { authController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post("/signup", authController.createUser);
router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  authController.loginUser
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  authController.getRefreshToken
);

export const authRoutes = router;
