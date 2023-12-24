import { OrderProduct } from "@prisma/client";

import prisma from "../../../utils/prisma";

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
