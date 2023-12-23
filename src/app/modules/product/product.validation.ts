import { z } from "zod";

const createProduct = z.object({
  
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string().optional(), 
    image: z.string().optional(),
    price: z.number({
      required_error: "Price is required",
    }),
    categoryId: z.string().optional(), 
    stock: z.boolean(), 
    quantity: z.number(), 
    saleCount: z.number(), 

});

const updateProduct = z.object({
  body: z.object({
    name: z.string().optional(), 
    description: z.string().optional(), 
    image: z.string().optional(), 
    price: z.number().optional(), 
    categoryId: z.string().optional(), 
    stock: z.boolean().optional(),
    quantity: z.number().optional(), 
    saleCount: z.number().optional(),
  }),
});

export const ProductValidation = {
  createProduct,
  updateProduct,
};
