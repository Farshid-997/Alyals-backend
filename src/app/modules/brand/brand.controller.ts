// import { Request, Response } from "express";
// import httpStatus from "http-status";
// import catchAsync from "../../../utils/catchAsync";
// import sendResponse from "../../../utils/sendResponse";
// import { BrandService } from "./brand.service";


// const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

//   const result = await BrandService.insertIntoDB(req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Brand created successfully",
//     data: result,
//   });
// });

// const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
//   const result = await BrandService.getAllFromDb();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Brand fetched successfully",
//     data: result,
//   });
// });

// const getUserById = catchAsync(async (req: Request, res: Response) => {
//   const result = await BrandService.getBrandById(req.params.id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Brand fetched successfully",
//     data: result,
//   });
// });

// const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
//   const result = await BrandService.deleteFromDB(req.params.id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Brand deleted successfully",
//     data: result,
//   });
// });

// const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
//   const result = await BrandService.updateIntoDB(req.params.id, req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Brand updated successfully",
//     data: result,
//   });
// });

// export const BrandController = {
//   insertIntoDB,
//   getAllFromDb,
//   getUserById,
//   updateIntoDB,
//   deleteFromDB,
// };
