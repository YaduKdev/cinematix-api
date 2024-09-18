import express from "express";
import {
  addAdmin,
  adminLogin,
  getAdmins,
} from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.get("/", getAdmins);
adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", adminLogin);

export default adminRouter;
