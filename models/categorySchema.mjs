import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  isDefault: { type: Boolean, default: false }, // For predefined categories
});

const Category = mongoose.model("category", CategorySchema);

export default Category;