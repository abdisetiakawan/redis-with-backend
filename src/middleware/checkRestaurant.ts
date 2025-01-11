import { NextFunction, Request, Response } from "express";
import { initalizeRedisClient } from "../helper/redis";
import { restaurantKeyById } from "../helper/keys";
import { errorResponse } from "../helper/response";

export const checkIfRestaurantExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { restaurantId } = req.params;
  const clientKey = restaurantKeyById(restaurantId);
  const client = await initalizeRedisClient();
  const exist = await client.exists(clientKey);

  if (!exist) {
    errorResponse(res, 404, "Restaurant ID is not found");
    return;
  }

  next();
};
