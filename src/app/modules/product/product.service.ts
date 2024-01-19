import { Prisma, Product } from "@prisma/client";
import { IGenericResponse } from "../../../interface/common";
import { IPaginationOptions } from "../../../interface/pagination";
import { paginationHelpers } from "../../../utils/paginationHelper";
import prisma from "../../../utils/prisma";
import {
  IProductFilterRequest,
  productRelationalFields,
  productRelationalFieldsMapper,
  productSearchableFields
} from "./product.constants";

const insertIntoDB = async (data: Product): Promise<Product> => {
  const result = await prisma.product.create({
    data,
  });
  return result;
};



const getAllProducts = async (
  filters: IProductFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Product[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, brand,category,...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: productSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (brand) {
    andConditions.push({
      Brand: {
        name: {
          equals: brand,
        },
      },
    });
  }

  if (category) {
    andConditions.push({
      Category: {
        name: {
          equals: category,
        },
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions: any[] = Object.keys(filterData).map((key) => {
      if (productRelationalFields.includes(key)) {
        const mappedField = productRelationalFieldsMapper[key];
        if (mappedField) {
          return {
            [mappedField]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          throw new Error(`Mapping not found for field: ${key}`);
        }
      } else if (key === "minPrice" || key === "maxPrice") {
        const priceCondition: Record<string, any> = {
          price: {},
        };

        if (key === "minPrice") {
          priceCondition.price.gte = parseFloat((filterData as any)[key]);
        } else if (key === "maxPrice") {
          const maxPrice = parseFloat((filterData as any)[key]);
          // Check if maxPrice is a valid number before adding the condition
          if (!isNaN(maxPrice)) {
            priceCondition.price.lte = maxPrice;
          }
        }

        // Only add the priceCondition if it has valid conditions
        if (Object.keys(priceCondition.price).length > 0) {
          return priceCondition;
        }
      } else if (key === "inStock" && (filterData as any)[key]) {
        return {
          stock: {
            equals: "in-stock",
          },
        };
      } else if (key === "outOfStock" && (filterData as any)[key]) {
        return {
          stock: {
            equals: "out-stock",
          },
        };
      } 
      
      
      else {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }
    });

    // Filter out undefined values from filterConditions array
    const validFilterConditions = filterConditions.filter(Boolean);

    andConditions.push(...validFilterConditions);
  }

  const whereConditions: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.product.findMany({
    include: {
      Category: true,
      Brand:true
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.product.count({
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







const getProductsbyCategoryService = async (
  id: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Product[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const andConditions = [];

  if (id) {
    andConditions.push({
      categoryId: id,
     
    });
  }

  const whereConditions: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.product.findMany({
    include: {
      Category: true,
    },
    skip,
    take: Number(limit),

    where: whereConditions,
  });

  const total = await prisma.product.count({
    where: whereConditions,
  });
  const totalPages = Math.ceil(total / Number(limit));
  return {
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
    data: result,
  };
};


const getProductsbyBrandService = async (
  id: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Product[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const andConditions = [];

  if (id) {
    andConditions.push({
      brandId: id,
    });
  }

  const whereConditions: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.product.findMany({
    include: {
      Brand: true,

    },
    skip,
    take: Number(limit),

    where: whereConditions,
  });

  const total = await prisma.product.count({
    where: whereConditions,
  });
  const totalPages = Math.ceil(total / Number(limit));
  return {
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
    data: result,
  };
};

const getProductById = async (id: string): Promise<Product | null> => {
  const result = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      Category: true,
      Brand:true
      
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Product>
): Promise<Product> => {
  const result = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
    include: {
      Category: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Product> => {
  const result = await prisma.product.delete({
    where: {
      id,
    },
    include: {
      Category: true,
    },
  });
  return result;
};

export const productService = {
  insertIntoDB,
  getProductById,
  updateIntoDB,
  deleteFromDB,
  getAllProducts,
 getProductsbyBrandService,
  getProductsbyCategoryService,
};
