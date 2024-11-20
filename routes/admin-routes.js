import express from "express";
import {
  addAdmin,
  adminLogin,
  getAdminById,
  getAdminMovies,
  getAdmins,
} from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.get("/", getAdmins);
adminRouter.get("/:id", getAdminById);
adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", adminLogin);
adminRouter.get("/movies/:id", getAdminMovies);

export default adminRouter;
