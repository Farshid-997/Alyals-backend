import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { orderProductService } from "./orderporduct.service";


const deleteOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await orderProductService.deleteOrderProduct(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order Product deleted successfully",
      data: result,
    });
  }
);



export const orderProductController = {
 
  deleteOrder,
 
};
