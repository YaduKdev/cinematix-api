import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingRouter from "./routes/booking-routes.js";

dotenv.config();

const app = express();

const { PORT, MONGODB_PASSWORD, URL } = process.env;

//middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${URL}`);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);

  console.log("Request received:", req.method, req.url);

  next();
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);

//DB Connection
mongoose
  .connect(
    `mongodb+srv://admin:${MONGODB_PASSWORD}@cluster0.g7oq6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(`DB is connected and app is running on port ${PORT}`)
    )
  )
  .catch((e) => console.log(e));
