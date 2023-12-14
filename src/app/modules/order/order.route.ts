import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.post("/create-order", orderController.createOrder);
router.get("/", orderController.getOrders);
// router.get("/:id", orderController.getOrderById);
router.get("/user/:id", orderController.getOrderByUserId);
router.delete("/:id", orderController.deleteOrder);
router.patch("/:id", orderController.updateOrder);
router.get("/order-count", orderController.orderCheckoutForDay);




export const orderRoutes = router;
