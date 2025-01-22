import Category from "../model/category.js";
import Product from "../model/product.js";

export const test = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const skip = (page - 1) * pageSize;

  const allProducts = await Product.find()
    .skip(skip)
    .limit(pageSize)
    .populate("categoryId", "name");
  res.status(200).json(allProducts);
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    await Product.create({ name, categoryId });

    res.redirect("/product");
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Error creating product");
  }
};

// List products with pagination
export const listProducts = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const skip = (page - 1) * pageSize;

  try {
    // console.table({ page, pageSize, skip });
    const products = await Product.find()
      .skip(skip)
      .limit(pageSize)
      .populate("categoryId", "name");
    const total = await Product.countDocuments();
    res.render("product/index", {
      products,
      currentPage: page,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("Error listing products:", error);
    res.status(500).send("Internal Server Error");
  }
};
// Render product creation form
export const form = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("product/form", { product: {}, categories });
  } catch (error) {
    console.error("Error rendering product form:", error);
    res.status(500).send("Error loading form");
  }
};

// Render product edit form
export const editForm = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    const categories = await Category.find();
    res.render("product/form", { product, categories });
  } catch (error) {
    console.error("Error rendering edit form:", error);
    res.status(500).send("Error loading edit form");
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId } = req.body;
    console.table({ id, name, categoryId });
    await Product.findByIdAndUpdate(id, { name, categoryId }, { new: true });
    res.redirect("/product");
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Error updating product");
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/product");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Error deleting product");
  }
};
