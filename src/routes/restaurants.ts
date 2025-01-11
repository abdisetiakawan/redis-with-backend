import express from "express";
import { validate } from "../middleware/validate";
import { type Restaurant, RestaurantSchema } from "../schemas/restaurant";
const RestaurantRouter = express.Router();

RestaurantRouter.post("/", validate(RestaurantSchema), async (req, res) => {
  const data = req.body as Restaurant;
  res.send("hello world");
});

export default RestaurantRouter;
