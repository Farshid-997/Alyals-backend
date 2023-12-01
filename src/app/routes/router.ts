import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { blogsRoutes } from "../modules/blogs/blog.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { categoryRoutes } from "../modules/category/category.route";
import { orderRoutes } from "../modules/order/order.route";
import { productRoutes } from "../modules/product/product.route";
import { reviewsRoutes } from "../modules/reviews/reviews.route";
import { serviceRoutes } from "../modules/services/service.route";
import { userRoutes } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: authRoutes,
  },
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: categoryRoutes,
  },
  {
    path: "/",
    route: blogsRoutes,
  },
  {
    path: "/",
    route: serviceRoutes,
  },
  {
    path: "/",
    route: productRoutes,
  },
  {
    path: "/",
    route: reviewsRoutes,
  },
  {
    path: "/",
    route: BookingRoutes,
  },
  {
    path: "/",
    route: orderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route?.route));
export default router;
