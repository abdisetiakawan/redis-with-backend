import express, { Request } from "express";
import { validate } from "../middleware/validate";
import { type Restaurant, RestaurantSchema } from "../schemas/restaurant";
import { type Review, ReviewSchema } from "../schemas/review";
import { initalizeRedisClient } from "../helper/redis";
import { v4 as uuidv4 } from "uuid";
import {
  restaurantKeyById,
  reviewDetailById,
  reviewKeyById,
} from "../helper/keys";
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

RestaurantRouter.post(
  "/:restaurantId/review",
  checkIfRestaurantExist,
  validate(ReviewSchema),
  async (req: Request<{ restaurantId: string }>, res, next) => {
    const { restaurantId } = req.params;
    const data = req.body as Review;
    try {
      const client = await initalizeRedisClient();
      const reviewId = uuidv4();
      const reviewKey = reviewKeyById(restaurantId);
      const reviewDetailKey = reviewDetailById(reviewId);
      const reviewData = {
        id: reviewId,
        ...data,
        timestamp: Date.now(),
        restaurantId,
      };

      await Promise.all([
        client.lPush(reviewKey, reviewId),
        client.hSet(reviewDetailKey, reviewData),
      ]);

      successResponse(res, reviewData, "Review added successfully");
    } catch (error) {
      next(error);
    }
  }
);

RestaurantRouter.get(
  "/:restaurantId/review",
  checkIfRestaurantExist,
  async (req: Request<{ restaurantId: string }>, res, next) => {
    const { restaurantId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const start = (Number(page) - 1) * Number(limit);
    const end = start + Number(limit) - 1;

    try {
      const client = await initalizeRedisClient();
      const reviewRestaurantKey = reviewKeyById(restaurantId);
      const reviewIds = await client.lRange(reviewRestaurantKey, start, end);
      const result = await Promise.all(
        reviewIds.map((id) => client.hGetAll(reviewDetailById(id)))
      );

      successResponse(res, result, "Review fetched successfully");
    } catch (error) {
      next(error);
    }
  }
);

RestaurantRouter.delete(
  "/:restaurantId/review/:reviewId",
  checkIfRestaurantExist,
  async (
    req: Request<{ restaurantId: string; reviewId: string }>,
    res,
    next
  ) => {
    const { restaurantId, reviewId } = req.params;
    try {
      const reviewKey = reviewKeyById(restaurantId);
      const reviewDetailKey = reviewDetailById(reviewId);
      const client = await initalizeRedisClient();
      const [removeResult, deleteResult] = await Promise.all([
        client.lRem(reviewKey, 0, reviewId),
        client.del(reviewDetailKey),
      ]);
      if (removeResult === 0 && deleteResult === 0) {
        errorResponse(res, 404, "Review Not FOund");
        return;
      }
      successResponse(res, reviewId, "Review Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
);

export default RestaurantRouter;
