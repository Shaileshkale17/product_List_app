import Category from "../model/category.js";

export const createCatgory = async (req, res) => {
  const { name } = req.body;
  const category = Category.create({ name });
  res.redirect("/category");
};

export const allCatgory = async (req, res) => {
  const categories = await Category.find();

  res.render("category/index", { categories });
};

export const Add_Category = async (req, res) => {
  res.render("category/form", { category: {} });
};

export const Edit_Category = async (req, res) => {
  const { id } = req.params;
  console.log(`Edit category ${id}`);
  const category = (await Category.findById(id)) || {};
  res.render("category/form", { category });
};

// Update Category

export const Update_Category = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await Category.findByIdAndUpdate(id, { name }, { new: true });
  res.redirect("/category");
};

export const deleted_category = async (req, res) => {
  const { id } = req.params;
  console.log(`deleted category ${id}`);
  await Category.findByIdAndDelete(id);
  res.redirect("/category");
};
