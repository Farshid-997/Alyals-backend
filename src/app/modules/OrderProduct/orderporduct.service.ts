import { OrderProduct } from "@prisma/client";

import prisma from "../../../utils/prisma";



// const getsProductCount = async (): Promise<
//   { productId: number; productName: string; count: number }[]
// > => {
//   const previousMonth = moment()
//     .subtract(1, "month")
//     .startOf("month")
//     .format("YYYY-MM-DD");

//   const ordersWithCounts = await prisma.$queryRaw<OrderProduct[]>`
//     SELECT
//       o."productId",
//       p."productName",
//       DATE(o."createdAt") as "createdAt",
//       COUNT(*) as "count"
//     FROM "order" o
//     JOIN "product" p ON o."productId" = p."productId"
//     WHERE o."createdAt"::timestamp >= ${previousMonth}::timestamp
//     GROUP BY o."productId", p."productName", DATE(o."createdAt")
//   `;

//   const result = ordersWithCounts.map((group) => ({
//     productId: group.productId,
  
//     createdAt: new Date(group.createdAt),
//     count: Number(group.count),
//   }));

//   // Update productState for products with more than 150 sales
//   const productsToUpdate = result.filter((item) => item.count > 150);
//   await Promise.all(
//     productsToUpdate.map(async (product) => {
//       await prisma.product.update({
//         where: { productId: product.productId },
//         data: { productState: "best" },
//       });
//     })
//   );

//   return result;
// };


const deleteOrderProduct = async (id: string): Promise<OrderProduct> => {
  const result = await prisma.orderProduct.delete({
    where: {
      id,
    },
    include: {
      order: true,
    },
  });
  return result;
};


export const orderProductService = {
  deleteOrderProduct,
};
