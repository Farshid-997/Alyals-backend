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
    // Include related models if needed
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
  });
  return result;
};



export const getOrderCheckoutsForDay = async (): Promise<
  { createdAt: Date; count: number }[]
> => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .toDate();

  const ordersWithCount = await prisma?.order.aggregate({
    where: { createdAt: { gte: previousMonth } },
    _count: { createdAt: true },
  });

  console.log("ordersWithCount", ordersWithCount);

  const result = [
    {
      createdAt: new Date(),
      count: ordersWithCount._count.createdAt,
    },
  ];

  console.log("result", result);

  return result;
};


export const getOrderCheckoutsForWeek = async (): Promise<
  { createdAt: Date; count: number }[]
> => {
  const previousWeekStart = moment()
    .subtract(1, "weeks")
    .startOf("week")
    .toDate();
  const previousWeekEnd = moment().subtract(1, "weeks").endOf("week").toDate();

  console.log("Previous Week Start:", previousWeekStart);
  console.log("Previous Week End:", previousWeekEnd);

  const currentWeekStart = moment().startOf("week").toDate();
  const currentWeekEnd = moment().endOf("week").toDate();

  console.log("Current Week Start:", currentWeekStart);
  console.log("Current Week End:", currentWeekEnd);

  const ordersWithCount = await prisma?.order.aggregate({
    where: {
      createdAt: {
        gte: previousWeekStart,
        lt: previousWeekEnd,
      },
    },
    _count: { createdAt: true },
  });

  console.log("Orders with Count for Previous Week:", ordersWithCount);

  const result: { createdAt: Date; count: number }[] = [];

  if (ordersWithCount) {
    result.push({
      createdAt: previousWeekStart,
      count: ordersWithCount._count.createdAt,
    });
  } else {
    result.push({
      createdAt: previousWeekStart,
      count: 0,
    });
  }

  const currentWeekOrdersWithCount = await prisma?.order.aggregate({
    where: {
      createdAt: {
        gte: currentWeekStart,
        lt: currentWeekEnd,
      },
    },
    _count: { createdAt: true },
  });

  console.log(
    "Orders with Count for Current Week:",
    currentWeekOrdersWithCount
  );

  if (currentWeekOrdersWithCount) {
    result.push({
      createdAt: currentWeekStart,
      count: currentWeekOrdersWithCount._count.createdAt,
    });
  } else {
    result.push({
      createdAt: currentWeekStart,
      count: 0,
    });
  }

  console.log("Week Result:", result);

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
  getOrderCheckoutsForWeek,
};
