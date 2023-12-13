import express from "express";
import { reviewsController } from "./reviews.controller";

const router = express.Router();

router.post("/create-reviews", reviewsController.insertIntoDB);
router.get("/", reviewsController.getreviews);
router.get("/:id", reviewsController.getreviewsById);

router.delete("/:id", reviewsController.deleteFromDB);

router.patch("/:id", reviewsController.updateIntoDB);

export const reviewsRoutes = router;
