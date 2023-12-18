// import express from "express";
// import validateRequest from "../../middleware/validateRequest";
// import { BrandController } from "./brand.controller";
// import { BrandValidation } from "./brand.validation";


// const router = express.Router();

// router.post(
//   "/create-brand",
//   validateRequest(BrandValidation.createBrand),
//   BrandController.insertIntoDB
// );
// router.get("/", BrandController.getAllFromDb);
// router.get("/:id", BrandController.getUserById);
// router.delete("/:id", BrandController.deleteFromDB);
// router.patch(
//   "/:id",
//   validateRequest(BrandValidation.updateBrand),
//   BrandController.updateIntoDB
// );

// export const brandRoutes = router;
