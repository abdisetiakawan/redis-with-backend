import express, { Request } from "express";
import { validate } from "../middleware/validate";
import { type Restaurant, RestaurantSchema } from "../schemas/restaurant";
import { initalizeRedisClient } from "../helper/redis";
import { v4 as uuidv4 } from "uuid";
import { restaurantKeyById } from "../helper/keys";
import { errorResponse, successResponse } from "../helper/response";
import { checkIfRestaurantExist } from "../middleware/checkRestaurant";
const RestaurantRouter = express.Router();

RestaurantRouter.post(
  "/",
  validate(RestaurantSchema),
  async (req, res, next) => {
    const data = req.body as Restaurant;
    try {
      const client = await initalizeRedisClient();
      const id = uuidv4();
      const restaurantKey = restaurantKeyById(id);
      const hashData = {
        id,
        name: data.name,
        location: data.location,
      };

      await client.hSet(restaurantKey, hashData);
      successResponse(res, hashData, "Added New Restaurant");
    } catch (error) {
      next(error);
    }
  }
);

RestaurantRouter.get(
  "/:restaurantId",
  checkIfRestaurantExist,
  async (req: Request<{ restaurantId: string }>, res, next) => {
    const { restaurantId } = req.params;
    try {
      const client = await initalizeRedisClient();
      const restaurantKey = restaurantKeyById(restaurantId);
      const [viewcount, result] = await Promise.all([
        client.hIncrBy(restaurantKey, "viewCount", 1),
        client.hGetAll(restaurantKey),
      ]);
      successResponse(res, result, "Successfully received the Restaurant Data");
    } catch (error) {
      next(error);
    }
  }
);

export default RestaurantRouter;
