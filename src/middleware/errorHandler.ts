import { errorResponse } from "../helper/response";
import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  errorResponse(res, 500, err);
}
