import express from "express";

import { orderProductController } from "./orderproduct.controller";

const router = express.Router();


router.delete("/:id", orderProductController.deleteOrder);


export const orderProductRoutes = router;
