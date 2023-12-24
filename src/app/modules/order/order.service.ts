import { Order, Prisma } from "@prisma/client";
import moment from "moment";
import { IGenericResponse } from "../../../interface/common";
import { IPaginationOptions } from "../../../interface/pagination";
import { paginationHelpers } from "../../../utils/paginationHelper";
import prisma from "../../../utils/prisma";
import {
  IOrderFilterRequest,
  orderRelationalFields,
  orderRelationalFieldsMapper,
  orderSearchableFields,
} from "./order.constants";
import { OrderCount } from "./order.interface";

const createOrder = async (data: Order): Promise<Order> => {
  const {
    userId,
    totalAmount,
    status,
    firstName,
    lastName,
    address,
    city,
    postcode,
    note,
    phone,
    //@ts-ignore
    orderProduct,
  } = data;

  try {
    // Begin a transaction
    const order = await prisma.$transaction(async (prisma) => {
     
      const orderProductData = orderProduct.map((product: any) => ({
        productId: product.productId,
        quantity: product.quantity, // Include the quantity field
      }));

      // Create the order and associated order products within the transaction
      const createdOrder = await prisma.order.create({
        data: {
          userId,
          totalAmount,
          status,
          firstName,
          lastName,
          address,
          city,
          postcode,
          note,
          phone,
          orderProduct: {
            create: orderProductData,
          },
        },
      });

      // Commit the transaction
      return createdOrder;
    });

    return order;
  } catch (error) {
    // Handle any errors here
    throw error;
  }
};

const getAllOrders = async (
  filters: IOrderFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Order[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: orderSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (orderRelationalFields.includes(key)) {
          return {
            [orderRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.OrderWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.order.findMany({
   
    where: whereConditions,
    include: {
      orderProduct: {
        include: {
          product: true,
        },
      },
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.order.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getAllOrdersByUserId = async (userId: string): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      orderProduct: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getOrderById = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      orderProduct: {
        include: {
          product: true, // Include the product information
        },
      },
    },
  });
  return result;
};

const updateOrder = async (
  id: string,
  payload: Partial<Order>
): Promise<Order> => {
  const result = await prisma.order.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteOrder = async (id: string): Promise<Order> => {
  const result = await prisma.order.delete({
    where: {
      id,
    },
    include: {
      User:true
    },
  });
  return result;
};

const getOrderCheckoutsForDay = async (): Promise<
  { createdAt: Date; count: number }[]
> => {
  const previousMonth = moment()
    .subtract(1, "month")
    .startOf("month")
    .format("YYYY-MM-DD");

  const ordersWithCounts = await prisma.$queryRaw<OrderCount[]>`
    SELECT DATE("createdAt") as "createdAt", COUNT(*) as "count"
  FROM "order"
  WHERE "createdAt"::timestamp >= ${previousMonth}::timestamp
  GROUP BY DATE("createdAt")
  `;

 

  const result = ordersWithCounts.map((group) => ({
    createdAt: new Date(group.createdAt),
    count: Number(group.count),
  }));

  console.log("result", result);

  return result;
};


export const orderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  getAllOrdersByUserId,
  updateOrder,
  deleteOrder,
  getOrderCheckoutsForDay,
  
 
};
