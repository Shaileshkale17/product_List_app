import express from "express";
import {
  Add_Category,
  Edit_Category,
  Update_Category,
  allCatgory,
  createCatgory,
  deleted_category,
} from "../controllers/category.js";
const routers = express.Router();

routers.post("/", createCatgory);
routers.get("/", allCatgory);
routers.get("/add", Add_Category);
routers.get("/edit/:id", Edit_Category);
routers.post("/:id", Update_Category);
routers.get("/delete/:id", deleted_category);

export default routers;
