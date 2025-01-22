import express from "express";
import { dbconnections } from "./DataBase/index.js";
import categoryRoutes from "./routers/category.routes.js";
import productRoutes from "./routers/product.routes.js";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Path setup for EJS views
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// app.set("views", path.join(__dirname, "views"));

// Route setup
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);

// Database connection and server start
dbconnections()
  .then(() => {
    app.listen(8080, () => {
      console.log("Server running at http://localhost:8080");
    });
  })
  .catch((err) => {
    console.error(err);
  });
