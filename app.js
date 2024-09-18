import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes.js";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);

  console.log("Request received:", req.method, req.url);

  next();
});

app.use("/user", userRouter);

const { PORT, MONGODB_PASSWORD } = process.env;

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
