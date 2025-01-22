import express from "express";
import {
  listProducts,
  createProduct,
  deleteProduct,
  editForm,
  form,
  updateProduct,
  test,
} from "../controllers/product.js";
const routers = express.Router();

routers.post("/", createProduct);
routers.get("/test", test);
routers.get("/", listProducts);
routers.get("/add", form);
// updating the product
routers.post("/:id", updateProduct);
routers.get("/edit/:id", editForm);
routers.get("/delete/:id", deleteProduct);

export default routers;
