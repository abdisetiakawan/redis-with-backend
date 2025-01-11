import express, { type Request } from "express";
import { initalizeRedisClient } from "../helper/redis";
import {
  cuisineKey,
  cuisinesKey,
  restaurantCuisinesKeyById,
  restaurantKeyById,
} from "../helper/keys";
import { successResponse } from "../helper/response";
const CuisineRouter = express.Router();

CuisineRouter.get("/", async (req, res, next) => {
  try {
    const client = await initalizeRedisClient();
    const cuisines = await client.sMembers(cuisinesKey);
    successResponse(res, cuisines, "Cuisine fetched successfully");
  } catch (error) {
    next(error);
  }
});

CuisineRouter.get("/:cuisine", async (req, res, next) => {
  const { cuisine } = req.params;
  try {
    const client = await initalizeRedisClient();
    const restaurantIds = await client.sMembers(cuisineKey(cuisine));
    const restaurants = await Promise.all(
      restaurantIds.map((id) => client.hGet(restaurantKeyById(id), "name"))
    );
    successResponse(
      res,
      restaurants,
      "successfully fetched cuisine restaurant"
    );
  } catch (error) {
    next(error);
  }
});

export default CuisineRouter;
