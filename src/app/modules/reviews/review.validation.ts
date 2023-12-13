// Add validation for the UserReview model using zod
import { z } from "zod";

const createUserReview = z.object({
  body: z.object({
    rating: z.number({
      required_error: "Rating is required",
    }),
    content: z.string().optional(), 
    serviceId: z.string(), 
    productId: z.string(), 
  }),
});

const updateUserReview = z.object({
  body: z.object({
    rating: z.number().optional(), 
    content: z.string().optional(), 
    serviceId: z.string().optional(), 
    productId: z.string().optional(), 
    userId: z.string().optional(), 
  }),
});

export const UserReviewValidation = {
  createUserReview,
  updateUserReview,
};
