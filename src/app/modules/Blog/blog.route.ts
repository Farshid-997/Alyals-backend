import express from "express";
import { blogsController } from "./blog.controller";

const router = express.Router();

router.post("/create-blogs", blogsController.insertIntoDB);
router.get("/", blogsController.getblogs);
router.get("/:id", blogsController.getblogsById);

router.delete("/blogs/:id", blogsController.deleteFromDB);

router.patch(
  "/:id",
  // auth(ENUM_USER_ROLE.ADMIN),
  blogsController.updateIntoDB
);

export const blogsRoutes = router;
