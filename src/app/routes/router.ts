import express from "express";
import { authRoutes } from "../modules/auth/auth.route";


import { categoryRoutes } from "../modules/category/category.route";
import { orderRoutes } from "../modules/order/order.route";
import { productRoutes } from "../modules/product/product.route";
import { reviewsRoutes } from "../modules/reviews/reviews.route";

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
    route: productRoutes,
  },
  {
    path: "/",
    route: reviewsRoutes,
  },

  {
    path: "/",
    route: orderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route?.route));
export default router;
