// Add validation for the Category model using zod
import { z } from "zod";

const createCategory = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string().optional(), // Updated: Changed to string validation and made it optional.
  }),
});

const updateCategory = z.object({
  body: z.object({
    name: z.string().optional(), // Updated: Made the "name" field optional for updates.
    description: z.string().optional(), // Updated: Changed to string validation and made it optional.
  }),
});

export const CategoryValidation = {
  createCategory,
  updateCategory,
};
