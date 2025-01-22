import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Reference to Category model
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
