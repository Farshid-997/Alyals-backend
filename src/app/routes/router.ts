import express from "express";
import { authRoutes } from "../modules/auth/auth.route";


import { categoryRoutes } from "../modules/category/category.route";
import { orderRoutes } from "../modules/order/order.route";
import { productRoutes } from "../modules/product/product.route";
import { reviewsRoutes } from "../modules/reviews/reviews.route";

import { orderProductRoutes } from "../modules/OrderProduct/OrderProduct.route";
import { brandRoutes } from "../modules/brand/brand.route";
import { notificationRoutes } from "../modules/notifications/notification.route";
import { userRoutes } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/categories",
    route: categoryRoutes,
  },
  {
    path: "/brands",
    route: brandRoutes,
  },

  {
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/reviews",
    route: reviewsRoutes,
  },

  {
    path: "/orders",
    route: orderRoutes,
  },

  {
    path: "/orderProduct",
    route: orderProductRoutes,
  },

  {
    path: "/notifications",
    route: notificationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route?.route));
export default router;
