import express from "express";
import "dotenv/config";
import RestaurantRouter from "./routes/restaurants";
import CuisineRouter from "./routes/cuisines";
import { errorHandler } from "./middleware/errorHandler";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/restaurant", RestaurantRouter);
app.use("/cuisine", CuisineRouter);
app.use(errorHandler);

app
  .listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
