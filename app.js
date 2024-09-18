import express from "express";
import dotenv from "dotenv";

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

const { PORT } = process.env;

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
